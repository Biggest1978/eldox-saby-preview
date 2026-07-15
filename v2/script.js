const tabs = document.querySelectorAll("[data-calc-tab]");
const scenario = document.querySelector("#scenario");
const region = document.querySelector("#region");
const scale = document.querySelector("#scale");
const support = document.querySelector("#support");
const scaleOut = document.querySelector("#scaleOut");
const price = document.querySelector("#price");
const priceNote = document.querySelector("#priceNote");
const requestForm = document.querySelector("#requestForm");
const formStatus = document.querySelector("#formStatus");
const articleLists = document.querySelectorAll("[data-articles-list]");

let activeTab = document.querySelector("[data-calc-tab].is-active")?.dataset.calcTab || "saby";

const calculator = {
  saby: {
    label: "Saby",
    scaleLabel: "пользователей",
    base: 36000,
    options: [
      ["edo", "ЭДО и документы", 1],
      ["reporting", "Отчетность и учет", 0.95],
      ["hr", "Кадры и зарплата", 1.12],
      ["trade", "Торговля, склад, маркировка", 1.28],
      ["complex", "Комплексный запуск Saby", 1.75],
    ],
  },
  site: {
    label: "сайта",
    scaleLabel: "страниц",
    base: 52000,
    options: [
      ["landing", "Лендинг под заявку", 1],
      ["service", "Сайт услуг", 1.35],
      ["seo", "SEO-структура и база знаний", 1.65],
      ["integrated", "Сайт с формами и интеграциями", 1.9],
    ],
  },
  crm: {
    label: "CRM",
    scaleLabel: "пользователей",
    base: 48000,
    options: [
      ["basic", "Одна воронка продаж", 1],
      ["multi", "Несколько направлений и статусов", 1.35],
      ["analytics", "Отчеты и контроль руководителя", 1.55],
      ["sources", "CRM + источники заявок", 1.75],
    ],
  },
  bot: {
    label: "бота",
    scaleLabel: "сценариев",
    base: 42000,
    options: [
      ["lead", "Сбор первичных заявок", 1],
      ["notify", "Уведомления и напоминания", 1.2],
      ["quiz", "Опрос и квалификация клиента", 1.45],
      ["integration", "Бот с интеграцией в CRM", 1.8],
    ],
  },
  complex: {
    label: "комплексного запуска",
    scaleLabel: "участников процесса",
    base: 98000,
    options: [
      ["saby-site", "Saby + сайт", 1],
      ["site-crm", "Сайт + CRM", 1.25],
      ["crm-bot", "CRM + бот", 1.35],
      ["full", "Saby + сайт + CRM + бот", 1.9],
    ],
  },
};

const regionFactors = {
  msk: 1.28,
  spb: 1.18,
  vdk: 0.9,
  region: 1,
};

function formatRub(value) {
  return new Intl.NumberFormat("ru-RU").format(Math.round(value / 1000) * 1000) + " ₽";
}

function renderScenarioOptions() {
  if (!scenario || !scale) return;
  const current = calculator[activeTab];
  scenario.innerHTML = "";
  current.options.forEach(([value, label]) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = label;
    scenario.appendChild(option);
  });
  const isPagesOrScenarios = activeTab === "site" || activeTab === "bot";
  scale.min = isPagesOrScenarios ? 1 : 3;
  scale.max = isPagesOrScenarios ? 18 : 80;
  scale.value = isPagesOrScenarios ? 5 : 15;
  updateCalculator();
}

function updateCalculator() {
  if (!scenario || !region || !scale || !support || !scaleOut || !price || !priceNote) return;
  const current = calculator[activeTab];
  const option = current.options.find(([value]) => value === scenario.value) || current.options[0];
  const scaleValue = Number(scale.value);
  const supportCost = support.checked ? Math.max(12000, current.base * 0.22) : 0;
  const growth = 1 + Math.max(0, scaleValue - Number(scale.min)) * (activeTab === "site" || activeTab === "bot" ? 0.065 : 0.018);
  const total = (current.base * option[2] * regionFactors[region.value] * growth) + supportCost;

  scaleOut.value = `${scaleValue} ${current.scaleLabel}`;
  price.textContent = formatRub(total);
  priceNote.textContent = `Ориентир для ${current.label}: ${option[1].toLowerCase()}, масштаб ${scaleValue}. Точная смета зависит от деталей процесса, интеграций, контента, обучения и сопровождения.`;
}

if (tabs.length) {
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      activeTab = tab.dataset.calcTab;
      tabs.forEach((item) => item.classList.toggle("is-active", item === tab));
      renderScenarioOptions();
    });
  });
}

[scenario, region, scale, support].forEach((control) => {
  if (!control) return;
  control.addEventListener("input", updateCalculator);
  control.addEventListener("change", updateCalculator);
});

renderScenarioOptions();

if (requestForm) {
  requestForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (formStatus) {
      formStatus.textContent = "Спасибо. Заявка пока зафиксирована в демо-режиме: следующий шаг — подключить webhook, CRM или Telegram-уведомление.";
    }
    requestForm.reset();
    renderScenarioOptions();
  });
}

function resolveArticlePath(path) {
  const depth = location.pathname.includes("/knowledge/") ? "../" : "./";
  return path.replace("../", depth);
}

function createArticleCard(article) {
  const link = document.createElement("a");
  link.className = "article-card";
  link.href = resolveArticlePath(article.url);
  link.innerHTML = `
    <img src="${resolveArticlePath(article.image)}" alt="" />
    <span>${article.category}</span>
    <h3>${article.title}</h3>
    <p>${article.excerpt}</p>
    <small>${article.date}</small>
  `;
  return link;
}

async function renderArticles() {
  if (!articleLists.length) return;
  try {
    const dataPath = location.pathname.includes("/knowledge/") ? "../content/articles.json" : "./content/articles.json";
    const response = await fetch(dataPath);
    const articles = await response.json();
    articleLists.forEach((list) => {
      const limit = Number(list.dataset.limit || articles.length);
      list.innerHTML = "";
      articles.slice(0, limit).forEach((article) => list.appendChild(createArticleCard(article)));
    });
  } catch (error) {
    articleLists.forEach((list) => {
      list.innerHTML = '<p class="article-error">Публикации временно не загрузились. Обновите страницу позже.</p>';
    });
  }
}

renderArticles();
