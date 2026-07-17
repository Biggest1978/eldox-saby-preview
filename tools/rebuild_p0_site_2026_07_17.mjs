import { mkdirSync, writeFileSync } from "node:fs";

const siteRoot = new URL("../v2/", import.meta.url);

const directions = [
  {
    slug: "edo",
    label: "ЭДО",
    short: "Документы с контрагентами",
    card: "Для обмена УПД, актами, счетами и другими документами без почты, сканов и бумажных оригиналов.",
    hero: "Подключим ЭДО в Saby, чтобы документы не терялись в почте и бумаге",
    lead: "Поможем понять, какие документы переводить в электронный вид, кто будет подписывать, где смотреть статус и как объяснить новый порядок сотрудникам и контрагентам.",
    situationsTitle: "ЭДО нужно, если документы уже мешают нормальной работе",
    situations: [
      ["Контрагент просит электронные документы", "Вам нужно отправлять УПД, акты или счета через электронный обмен, но пока непонятно, что подключить и кто должен подписывать."],
      ["Документы теряются между почтой и папками", "Один файл лежит в письме, второй в скане, третий ждут на бумаге. Из-за этого сложно быстро понять, что уже подписано."],
      ["Руководитель не видит статус", "Чтобы узнать, где документ застрял, приходится спрашивать бухгалтера, менеджера или контрагента вручную."],
      ["ЭДО уже есть, но команда работает по старому", "Лицензия подключена, но сотрудники продолжают отправлять сканы и просить бумажные оригиналы."]
    ],
    included: ["подбор комплекта Saby под документы и регион", "настройка пользователей, ролей и прав подписи", "подключение контрагентов и проверка первого обмена", "короткая инструкция для команды"],
    factors: ["регион подключения", "количество организаций и пользователей", "объем документов", "права подписи и обучение"],
    caseTitle: "Мини-кейс: документы перестали зависеть от одного сотрудника",
    caseText: "Компания обменивалась актами через почту, а статус подписания знала только бухгалтерия. После настройки ЭДО документы стали проходить через Saby: ответственный видит отправку, подпись, статус и следующий шаг.",
    faq: [
      ["Можно начать с одного контрагента?", "Да. Часто ЭДО запускают с одного крупного контрагента, проверяют порядок и потом расширяют обмен."],
      ["Что делать, если сотрудники не работали с ЭДО?", "Мы показываем не теорию, а ежедневные действия: где открыть документ, как подписать и где посмотреть статус."]
    ]
  },
  {
    slug: "reporting",
    label: "Отчетность",
    short: "Отчеты, требования и сроки",
    card: "Для отправки отчетов, работы с требованиями, уведомлениями и сроками без ручного контроля одного человека.",
    hero: "Настроим отчетность Saby, чтобы сроки, требования и статусы не держались вручную",
    lead: "Поможем собрать отправку отчетов, требования, уведомления и сверки в понятный порядок, чтобы бухгалтерия видела ближайшие действия заранее.",
    situationsTitle: "Отчетность нужна, если сроки держатся на внимательности одного человека",
    situations: [
      ["Вы боитесь пропустить срок", "Календарь, письма и требования приходится проверять отдельно, поэтому важный статус легко увидеть слишком поздно."],
      ["Требования приходят неожиданно", "Ответы ведомствам появляются в разных местах, а контроль зависит от того, кто сегодня открыл почту."],
      ["Руководителю нужен спокойный контроль", "Нужно понимать, что отчет отправлен и принят, без ежедневных уточнений у бухгалтера."],
      ["Организаций стало больше", "Когда компаний или филиалов несколько, ручной контроль быстро превращается в риск."]
    ],
    included: ["подбор Saby под отчетность и регион", "настройка организаций и сотрудников", "уведомления по срокам и требованиям", "проверка первой отправки"],
    factors: ["количество организаций", "регион", "виды отчетов и ведомства", "пользователи и поддержка"],
    caseTitle: "Мини-кейс: требования перестали быть внезапностью",
    caseText: "Бухгалтер узнавал о требованиях из разных каналов и держал сроки в таблице. После настройки Saby уведомления и статусы стали видны заранее, а руководитель получил понятный контроль без лишних вопросов.",
    faq: [
      ["Можно подключить только отчетность?", "Да. Если задача сейчас только в отчетах и требованиях, не нужно покупать лишний набор возможностей."],
      ["Почему цена зависит от региона?", "Условия подключения и состав лицензии могут отличаться, поэтому сначала считаем ориентир, а затем подтверждаем точную смету."]
    ]
  },
  {
    slug: "accounting",
    label: "Бухгалтерия и учет",
    short: "Счета, первичка и сверки",
    card: "Для ежедневных документов, счетов, сверок и согласований внутри компании, когда нужно навести порядок без лишней покупки.",
    hero: "Поможем бухгалтерии понять, какие возможности Saby нужны сейчас, а что можно не покупать",
    lead: "Разберем ежедневные документы, счета, первичку, сверки и согласования. Сначала отделяем срочную задачу от того, что можно подключить позже.",
    situationsTitle: "Бухгалтерии нужен Saby, когда документы расходятся по разным местам",
    situations: [
      ["Первичка собирается вручную", "Счета, акты и накладные приходят разными способами, а бухгалтерия тратит время на поиск и сверку."],
      ["Согласования идут в переписке", "Документ вроде бы отправлен, но непонятно, кто должен подтвердить и где находится последняя версия."],
      ["Сверки зависят от таблиц", "Часть информации в учетной системе, часть в Excel, часть в письмах, и ошибка обнаруживается слишком поздно."],
      ["Непонятно, что покупать", "Вы видите много модулей Saby, но не хотите платить за то, что команда пока не будет использовать."]
    ],
    included: ["разбор текущих документов", "подбор нужного набора Saby", "настройка ролей и согласований", "проверка на реальных документах"],
    factors: ["количество организаций", "пользователи бухгалтерии", "виды документов", "нужны ли согласования и обучение"],
    caseTitle: "Мини-кейс: бухгалтерия перестала искать документы по чатам",
    caseText: "Счета и акты приходили в почту, мессенджеры и папки. После настройки Saby команда договорилась, где появляется документ, кто его проверяет и где виден статус.",
    faq: [
      ["Это то же самое, что ЭДО?", "Нет. ЭДО отвечает за обмен с контрагентами, а бухгалтерский блок помогает упорядочить ежедневную работу с документами и согласованиями."],
      ["Можно не переносить все сразу?", "Да. Лучше начать с документов, которые чаще всего теряются или задерживают работу."]
    ]
  },
  {
    slug: "hr",
    label: "Кадры и зарплата",
    short: "КЭДО, заявления и подписи",
    card: "Для заявлений, приказов, подписей, КЭДО и личного кабинета сотрудника без бумажного хвоста.",
    hero: "Настроим кадровые документы в Saby, чтобы заявления, приказы и подписи не ходили по бумаге",
    lead: "Поможем запустить КЭДО, личный кабинет сотрудника и понятный порядок работы для HR, руководителей и сотрудников.",
    situationsTitle: "Кадровое направление нужно, когда HR больше напоминает, чем оформляет",
    situations: [
      ["Заявления собираются на бумаге", "Сотрудник пишет заявление, HR передает его дальше, руководитель подписывает позже, а статус приходится уточнять."],
      ["Приказы и ознакомления теряются", "Нужно подтвердить, что сотрудник видел документ, но подтверждение лежит в бумаге или переписке."],
      ["Удаленным сотрудникам неудобно", "Документы приходится пересылать, печатать или ждать личной встречи."],
      ["HR тратит время на напоминания", "Система должна помогать собрать подписи и статусы, а не превращать кадровика в диспетчера."]
    ],
    included: ["подбор Saby под кадровые документы", "настройка сотрудников, руководителей и HR", "проверка заявления или приказа", "обучение короткими действиями"],
    factors: ["количество сотрудников", "структура подразделений", "виды кадровых документов", "нужен ли личный кабинет"],
    caseTitle: "Мини-кейс: заявление перестало ходить по кабинетам",
    caseText: "Сотрудник отправлял заявление HR, руководитель подписывал позже, а статус спрашивали вручную. После настройки Saby заявление проходит электронно, а участники видят свой шаг.",
    faq: [
      ["Что такое КЭДО простыми словами?", "Это кадровые документы в электронном виде: заявления, приказы, ознакомления и подписи без бумажного обмена."],
      ["Можно начать с одного подразделения?", "Да. Это хороший способ проверить порядок и спокойно расширить его на всю компанию."]
    ]
  },
  {
    slug: "trade",
    label: "Торговля и склад",
    short: "Кассы, склад и точки продаж",
    card: "Для точек продаж, касс, склада, УПД и сотрудников на местах, чтобы продажи, остатки и документы сходились.",
    hero: "Настроим Saby для торговли и склада, чтобы продажи, остатки и документы не жили отдельно",
    lead: "Разберем, как товар проходит через компанию: закупка, склад, касса, продажа, документы и сотрудники. После этого подберем Saby под реальную работу.",
    situationsTitle: "Торговле нужен Saby, когда касса, склад и документы показывают разные картины",
    situations: [
      ["Касса и склад живут отдельно", "Продажа прошла, а остаток приходится проверять вручную."],
      ["Документы приходят с задержкой", "Бухгалтерия получает первичку позже, чем нужно, а руководитель не видит полную картину."],
      ["Точки работают по-разному", "На одной точке делают так, на другой иначе. Из-за этого сложно понять, где появилась ошибка."],
      ["Маркировка добавляет риск", "Если товар связан с Честным знаком, ЕГАИС или Меркурием, важно не ошибиться при приемке и продаже."]
    ],
    included: ["разбор точек продаж, склада и оборудования", "подбор Saby под торговую схему", "настройка пользователей, касс и документов", "проверка на реальной продаже или поступлении"],
    factors: ["точки продаж", "оборудование", "складская схема", "маркировка и обучение"],
    caseTitle: "Мини-кейс: остатки перестали проверять вручную",
    caseText: "Продажи, поступления и документы жили отдельно. После настройки Saby команда стала видеть товарный путь от поступления до продажи и быстрее находить расхождения.",
    faq: [
      ["Можно подключить только одну точку?", "Да. Это хороший способ проверить порядок и потом перенести его на остальные точки."],
      ["Что если уже есть учетная система?", "Сначала смотрим текущую схему и только потом предлагаем, что переносить в Saby, а что лучше оставить как есть."]
    ]
  },
  {
    slug: "marking",
    label: "Маркировка",
    short: "Честный знак, ЕГАИС, Меркурий",
    card: "Для товаров, связанных с Честным знаком, ЕГАИС, Меркурием, складом и документами.",
    hero: "Поможем настроить Saby для маркировки, чтобы товар, документы и госсистемы сходились без ручной путаницы",
    lead: "Подходит компаниям, которым нужно работать с маркированным товаром, документами, складом и точками продаж. Поможем понять, какие связи нужны именно вам.",
    situationsTitle: "Маркировка требует аккуратного запуска, потому что ошибка быстро становится дорогой",
    situations: [
      ["Появились требования по маркировке", "Нужно понять, что подключить, какие документы настроить и как избежать ошибок при приемке или продаже."],
      ["Госсистемы работают отдельно", "Честный знак, ЕГАИС, Меркурий и документы живут по разным правилам, а команда не видит общей картины."],
      ["Товар проходит через склад и точки", "Важно, чтобы приемка, остатки, продажа и документы не расходились между собой."],
      ["Сотрудники боятся ошибиться", "Команда знает, что маркировка важна, но не всегда понимает, где проверить статус и что делать при ошибке."]
    ],
    included: ["разбор товара, госсистем и текущего порядка", "подбор Saby под маркировку и документы", "настройка ролей, оборудования и первых операций", "проверка на реальном товарном сценарии"],
    factors: ["вид товара", "склад и точки продаж", "госсистемы", "оборудование и обучение"],
    caseTitle: "Мини-кейс: товарный путь стал понятным",
    caseText: "Марки, документы и остатки сверяли вручную. После настройки Saby сотрудники понимают, как принять товар, оформить документы, продать и проверить статус без лишних ручных сверок.",
    faq: [
      ["Можно сначала проверить, что именно нужно?", "Да. Для маркировки это особенно важно: лишняя покупка не решает проблему, если не понятен товарный путь."],
      ["Вы помогаете с Честным знаком, ЕГАИС и Меркурием?", "Мы помогаем понять, какие связки нужны именно вам, и настроить Saby вокруг реальной работы компании."]
    ]
  }
];

const articles = [
  ["Saby", "Почему цена Saby зависит от региона и состава задачи", "Разбираем, почему один и тот же продукт может стоить по-разному и какие данные подготовить перед расчетом.", "article-saby.svg", "saby-region-price"],
  ["ЭДО", "Как понять, что компании пора переходить на ЭДО", "Простые признаки: контрагенты просят электронные документы, бумага теряется, статусы не видны.", "article-saby.svg", "edo-start"],
  ["Отчетность", "Saby для отчетности: что проверить перед подключением", "Организации, пользователи, сроки, требования и то, кто будет отвечать за отправку.", "article-saby.svg", "reporting-check"],
  ["Сайты", "Как сайт теряет заявки: 7 мест, где ломается путь клиента", "Показываем, что проверить в форме, тексте, аналитике и передаче обращения менеджеру.", "article-site.svg", "site-loses-leads"],
  ["CRM", "CRM есть, но команда не обходит: что проверить первым", "Разбираем статусы, роли, напоминания и причины, по которым заявки остаются без движения.", "article-crm.svg", "crm-not-working"]
];

function pagePath(path) {
  return new URL(path, siteRoot);
}

function writePage(path, html) {
  const url = pagePath(path);
  mkdirSync(new URL("./", url), { recursive: true });
  writeFileSync(url, html, "utf8");
}

function nav(root = ".", active = "") {
  const current = (name) => active === name ? "is-current" : "";
  return `<header class="topbar" aria-label="Навигация">
    <a class="brand" href="${root}/index.html" aria-label="Элдокс"><img class="brand-logo" src="${root}/assets/eldoks_logo_header.png" alt="Элдокс" /></a>
    <nav>
      <a class="${current("home")}" href="${root}/index.html">Главная</a>
      <div class="nav-group ${active === "saby" ? "is-current" : ""}">
        <a href="${root}/saby-directions/index.html">Направления Saby</a>
        <div class="nav-menu" aria-label="Направления Saby">
          ${directions.map((item) => `<a href="${root}/saby-directions/${item.slug}/index.html">${item.label}<span>${item.short}</span></a>`).join("")}
        </div>
      </div>
      <a class="${current("sites")}" href="${root}/sites/index.html">Сайты и боты</a>
      <a class="${current("knowledge")}" href="${root}/knowledge/index.html">База знаний</a>
      <a class="${current("about")}" href="${root}/about/index.html">О нас</a>
    </nav>
    <a class="topbar-cta" href="${root}/index.html#request">Оставить задачу</a>
  </header>`;
}

function layout({ title, description, root = ".", active = "", bodyClass = "", content }) {
  return `<!doctype html>
<html lang="ru">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${title}</title>
  <meta name="description" content="${description}" />
  <link rel="stylesheet" href="${root}/styles.css" />
</head>
<body class="${bodyClass}">
${nav(root, active)}
<main>${content}</main>
<footer>
  <strong>Элдокс</strong>
  <span>Saby, документы, отчетность, сайты, CRM и заявки: начинаем с вашей задачи и доводим до рабочего запуска.</span>
</footer>
<script src="${root}/script.js"></script>
</body>
</html>`;
}

function button(href, label, secondary = false) {
  return `<a class="button ${secondary ? "secondary" : ""}" href="${href}">${label}</a>`;
}

const directionPrompts = {
  edo: "Контрагент просит электронные документы?",
  reporting: "Сроки отчетов держатся вручную?",
  accounting: "Первичка и сверки разъехались?",
  hr: "Кадровые документы ходят по чатам?",
  trade: "Касса, склад и документы не сходятся?",
  marking: "Маркировка и госсистемы путают команду?"
};

function directionCard(item, href) {
  return `<a class="saby-card product-card product-card-${item.slug}" href="${href}">
    <span class="direction-mark direction-mark-${item.slug}" aria-hidden="true"></span>
    <small>${directionPrompts[item.slug]}</small>
    <strong>${item.label}</strong>
    <span>${item.card}</span>
    <em>Смотреть решение →</em>
  </a>`;
}

function directionCardGrid(root = ".") {
  return directions.map((item) => directionCard(item, `${root}/${item.slug}/index.html`)).join("");
}

function homeDiagnosticCards() {
  const cards = [
    ["edo", "Документы", "Вы впервые переходите на электронные документы", "Контрагент просит отправлять УПД, акты или счета через электронный обмен. Покажем, что подключить и где смотреть статус.", "./saby-directions/edo/index.html"],
    ["reporting", "Отчетность", "Вы держите отчеты и требования вручную", "Сроки, уведомления и ответы держатся на внимательности одного сотрудника. Saby помогает видеть ближайшие действия заранее.", "./saby-directions/reporting/index.html"],
    ["hr", "Кадры", "Кадровые документы копятся в бумаге", "Заявления, приказы и подписи ходят по кабинетам и чатам. КЭДО помогает сделать этот путь понятнее для HR и сотрудников.", "./saby-directions/hr/index.html"],
    ["trade", "Торговля", "Склад, касса и документы не сходятся", "Продажи, остатки, УПД и маркировка требуют единого порядка, чтобы ошибки не всплывали слишком поздно.", "./saby-directions/trade/index.html"]
  ];

  return `<div class="diagnostic-board">
    <div class="diagnostic-board-visual" aria-hidden="true">
      <div class="diagnostic-map">
        <span class="map-card map-card-main">Задача бизнеса</span>
        <span class="map-card map-card-edo">Документы</span>
        <span class="map-card map-card-reporting">Отчетность</span>
        <span class="map-card map-card-hr">Кадры</span>
        <span class="map-card map-card-trade">Торговля</span>
        <i class="map-line map-line-a"></i>
        <i class="map-line map-line-b"></i>
        <i class="map-line map-line-c"></i>
        <i class="map-line map-line-d"></i>
      </div>
      <div class="diagnostic-status">
        <span><b>01</b> Находим задачу</span>
        <span><b>02</b> Подбираем продукт</span>
        <span><b>03</b> Считаем запуск</span>
      </div>
      <p>Сначала определяем, где в работе теряется время или контроль. Потом выбираем нужный продукт Saby и состав запуска.</p>
    </div>
    <div class="diagnostic-list">
      ${cards.map(([slug, tag, title, text, href], index) => `<a class="diagnostic-row diagnostic-row-${slug}" href="${href}">
        <span class="diagnostic-row-number">0${index + 1}</span>
        <span class="diagnostic-row-body">
          <small>${tag}</small>
          <strong>${title}</strong>
          <em>${text}</em>
        </span>
        <b>Смотреть решение →</b>
      </a>`).join("")}
    </div>
  </div>`;
}

function launchTimeline(item) {
  const labels = ["Уточняем задачу", "Подбираем Saby", "Настраиваем", "Проверяем на работе"];
  return `<div class="launch-timeline">
    ${item.included.map((text, index) => `<article>
      <span>0${index + 1}</span>
      <h3>${labels[index] || "Передаем команде"}</h3>
      <p>${text}</p>
    </article>`).join("")}
  </div>`;
}

function priceFormula(item) {
  return `<div class="price-formula">
    <div class="formula-result">
      <span>Предварительный расчет</span>
      <strong>регион + лицензия + пользователи + запуск</strong>
      <p>Собираем эти параметры до сметы, чтобы не закладывать лишнее и не пропустить важную настройку.</p>
    </div>
    <div class="formula-factors">
      ${item.factors.map((factor, index) => `<article>
        <span>0${index + 1}</span>
        <strong>${factor}</strong>
      </article>`).join("")}
    </div>
  </div>`;
}

function articleCards(root = ".", linked = false) {
  return articles.map(([tag, title, text, img, slug]) => {
    const open = linked ? `<a class="article-card" href="${root}/knowledge/${slug}/index.html">` : `<article class="article-card">`;
    const close = linked ? `</a>` : `</article>`;
    return `${open}
    <img src="${root}/assets/${img}" alt="" />
    <span>${tag}</span>
    <h3>${title}</h3>
    <p>${text}</p>
    <small>${linked ? "Читать материал" : "Открыть разбор"}</small>
  ${close}`;
  }).join("");
}

function homeArticleShelf(root = ".") {
  const [mainTag, mainTitle, mainText, mainImg, mainSlug] = articles[0];
  const supporting = articles.slice(1, 4);

  return `<div class="editorial-shelf">
    <a class="editorial-main" href="${root}/knowledge/${mainSlug}/index.html">
      <div class="editorial-art editorial-art-saby" aria-hidden="true">
        <span>Регион</span>
        <span>Лицензия</span>
        <span>Запуск</span>
      </div>
      <div class="editorial-copy">
        <span>${mainTag}</span>
        <h3>${mainTitle}</h3>
        <p>${mainText}</p>
        <small>Открыть разбор →</small>
      </div>
    </a>
    <div class="editorial-side">
      ${supporting.map(([tag, title, text, img, slug], index) => `<a class="editorial-mini" href="${root}/knowledge/${slug}/index.html">
        <div class="mini-mark mini-mark-${index + 1}" aria-hidden="true"></div>
        <div>
          <span>${tag}</span>
          <h3>${title}</h3>
          <p>${text}</p>
          <small>Подробнее →</small>
        </div>
      </a>`).join("")}
    </div>
  </div>`;
}

function requestSection(root = ".") {
  return `<section class="section section-dark" id="request">
    <div class="request">
      <div class="request-copy">
        <p class="section-kicker">Заявка на расчет</p>
        <h2>Опишите задачу простыми словами</h2>
        <p>Напишите, что нужно запустить: Saby, ЭДО, отчетность, кадры, торговлю, маркировку, сайт, CRM или бот. Мы уточним регион, состав работ и вернемся с понятным следующим шагом.</p>
      </div>
      <form class="request-form">
        <label>Ваше имя<input type="text" name="name" placeholder="Как к вам обращаться" /></label>
        <label>Телефон или мессенджер<input type="text" name="contact" placeholder="+7..." /></label>
        <label>Что нужно сделать<textarea name="message" rows="5" placeholder="Например: подключить ЭДО с контрагентами в Москве, 2 организации, 5 пользователей"></textarea></label>
        <button class="button" type="submit">Отправить задачу</button>
        <p class="form-status">Форма пока работает как прототип: на следующем шаге подключим CRM и уведомления.</p>
      </form>
    </div>
  </section>`;
}

function renderHome() {
  const content = `
  <section class="hero">
    <img class="hero-bg" src="./assets/hero.jpg" alt="" />
    <div class="hero-shade"></div>
    <div class="hero-content">
      <p class="eyebrow">Элдокс: запуск и сопровождение Saby</p>
      <h1>Запустим Saby под вашу задачу: документы, отчетность, кадры, торговлю или маркировку</h1>
      <p class="hero-lead">Поможем понять, какой Saby нужен именно вам, от чего зависит стоимость и как запустить сервис так, чтобы команда действительно начала им пользоваться.</p>
      <div class="hero-actions">${button("#request", "Подобрать Saby")}${button("./saby-directions/index.html", "Смотреть направления", true)}</div>
    </div>
    <div class="hero-map" aria-hidden="true"><span>Saby</span><span>Регион</span><span>Пользователи</span><span>Запуск</span></div>
  </section>

  <section class="section">
    <div class="section-heading split">
      <div>
        <p class="section-kicker">С чего обычно начинается задача</p>
        <h2>Saby помогает решать конкретные проблемы бизнеса</h2>
      </div>
      <p>Вы впервые столкнулись с электронными документами? Устали держать отчетность на памяти одного человека? Видите, что склад, касса и документы живут отдельно? Мы начинаем с вашей конкретной задачи, а уже потом подбираем Saby.</p>
    </div>
    ${homeDiagnosticCards()}
  </section>

  <section class="section section-muted" id="directions">
    <div class="section-heading split">
      <div>
        <p class="section-kicker">Направления Saby</p>
        <h2>Выберите задачу, а не название лицензии</h2>
      </div>
      <p>Если вы не знаете, какой продукт Saby нужен, начните с ситуации. На детальных страницах объясняем человеческим языком, зачем нужен каждый блок и что влияет на расчет.</p>
    </div>
    <div class="saby-grid product-grid">${directions.map((item) => directionCard(item, `./saby-directions/${item.slug}/index.html`)).join("")}</div>
  </section>

  <section class="section calculator" id="calculator">
    <div class="calc-shell">
      <div>
        <p class="section-kicker">Ориентир по стоимости</p>
        <h2>Расчет зависит от региона, продукта и состава запуска</h2>
        <p>Здесь человек должен быстро прикинуть порядок бюджета, а не читать универсальный прайс. Точный расчет появится после уточнения региона, пользователей и работ по настройке.</p>
        <div class="calc-note-list">
          <span>1. Выберите направление</span>
          <span>2. Укажите регион и масштаб</span>
          <span>3. Оставьте задачу на точный расчет</span>
        </div>
      </div>
      <div class="calc-card calc-estimator">
        <div class="tabs"><button class="tab is-active">Saby</button><button class="tab">Сайты</button><button class="tab">CRM</button><button class="tab">Боты</button></div>
        <div class="calc-estimator-body">
          <div class="calc-inputs">
            <label>Что нужно запустить
              <select><option>ЭДО и документы</option><option>Отчетность</option><option>Кадры и КЭДО</option><option>Торговля, склад или маркировка</option></select>
            </label>
            <label>Регион подключения
              <select><option>Москва и область</option><option>Санкт-Петербург</option><option>Владивосток</option><option>Другой регион</option></select>
            </label>
            <label>Пользователи и организации
              <input type="range" min="1" max="50" value="8" />
            </label>
          </div>
          <div class="calc-preview">
            <span>Предварительный ориентир</span>
            <strong>Смета после уточнения</strong>
            <div class="calc-meter" aria-hidden="true"><i style="width: 64%"></i></div>
            <ul>
              <li>лицензия и региональные условия;</li>
              <li>пользователи, организации и роли;</li>
              <li>настройка, обучение и первый рабочий запуск.</li>
            </ul>
            ${button("#request", "Отправить параметры")}
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="section-heading split">
      <div>
        <p class="section-kicker">Полезные разборы</p>
        <h2>Помогаем понять, что проверить до покупки или настройки сервиса</h2>
      </div>
      <p>Этот блок не про “новости ради новостей”. Здесь будут короткие материалы для руководителя, бухгалтера или ответственного сотрудника: что изменилось, где может быть риск и с какого шага начать.</p>
    </div>
    <div class="article-showcase editorial-block">
      <div class="article-showcase-lead">
        <p class="section-kicker">Зачем читать</p>
        <h3>Чтобы не покупать сервис вслепую</h3>
        <p>Перед заявкой полезно понять, что именно болит: документы, отчетность, сайт, заявки или учет клиентов. В разборах показываем простые признаки и объясняем, с чего лучше начать.</p>
        ${button("./knowledge/index.html", "Смотреть все разборы", true)}
      </div>
      ${homeArticleShelf(".")}
    </div>
  </section>

  <section class="section section-soft">
    <div class="section-heading split">
      <div>
        <p class="section-kicker">Не только Saby</p>
        <h2>Когда задача шире, подключаем сайты, CRM и ботов</h2>
      </div>
      <p>Saby закрывает документы и учетные задачи. Но если проблема в заявках, продажах, повторных обращениях или ручной передаче между сотрудниками, рядом нужен сайт, CRM, бот или связка инструментов.</p>
    </div>
    <div class="solution-grid">
      <article class="solution-card"><span>Сайты</span><h3>Чтобы клиент быстро понял предложение и оставил заявку</h3><p>Собираем страницы, где понятны услуги, доверие, следующий шаг и путь обращения.</p></article>
      <article class="solution-card"><span>CRM</span><h3>Чтобы заявки не терялись после отправки формы</h3><p>Настраиваем статусы, ответственных и напоминания, чтобы каждый запрос дошел до решения.</p></article>
      <article class="solution-card"><span>Боты</span><h3>Чтобы повторяющиеся вопросы не забирали время команды</h3><p>Помогаем собрать простые сценарии: первичный сбор данных, ответы и передача заявки менеджеру.</p></article>
    </div>
  </section>

  <section class="section section-muted">
    <div class="section-heading">
      <p class="section-kicker">Доказательный блок</p>
      <h2>Смотрим не на красивое название сервиса, а на то, что изменится в работе</h2>
    </div>
    <div class="before-after">
      <article><span>До</span><p>Документы, сроки, заявки и ответственные живут в переписке, таблицах и памяти сотрудников.</p></article>
      <article><span>После</span><p>Команда понимает, где появляется задача, кто отвечает за следующий шаг и где проверить статус.</p></article>
    </div>
  </section>

  <section class="section">
    <div class="section-heading"><p class="section-kicker">Вопросы и ответы</p><h2>Коротко о том, что обычно важно перед стартом</h2></div>
    <div class="faq">
      <details><summary>Можно начать только с одного направления Saby?</summary><p>Да. Часто разумнее запустить ЭДО, отчетность или кадры отдельно, проверить порядок и потом расширять систему.</p></details>
      <details><summary>Почему нельзя сразу назвать точную цену?</summary><p>Цена зависит от региона, состава лицензии, пользователей и работ по настройке. Мы сначала даем ориентир, затем уточняем смету.</p></details>
      <details><summary>Что если мы не понимаем, какой Saby нужен?</summary><p>Начните с описания проблемы. Мы переведем ее в понятный набор вариантов и объясним, с чего лучше стартовать.</p></details>
    </div>
  </section>
  ${requestSection(".")}`;

  writePage("index.html", layout({
    title: "Элдокс — запуск Saby для бизнеса",
    description: "Подбор, настройка и сопровождение Saby под документы, отчетность, кадры, торговлю и маркировку.",
    root: ".",
    active: "home",
    content
  }));
}

function renderCatalog() {
  const content = `
  <section class="section page-hero page-hero-light saby-catalog-hero">
    <div>
      <p class="eyebrow">Каталог направлений Saby</p>
      <h1>Выберите не лицензию, а задачу, которую нужно решить</h1>
      <p class="hero-lead dark-lead">Saby закрывает много задач: электронные документы, отчетность, бухгалтерию, кадры, торговлю, склад и маркировку. Если вы не знаете, с чего начать, выберите ситуацию, которая больше всего похожа на вашу.</p>
      <div class="hero-actions">${button("#situations", "Найти свою ситуацию")}${button("../index.html#request", "Оставить задачу", true)}</div>
    </div>
    <aside class="hero-summary hero-summary-light">
      <strong>Как пользоваться каталогом</strong>
      <ul><li>выберите знакомую ситуацию;</li><li>посмотрите, что входит;</li><li>проверьте, что влияет на цену;</li><li>оставьте задачу на расчет.</li></ul>
    </aside>
  </section>
  <section class="section" id="situations">
    <div class="section-heading"><p class="section-kicker">Быстрый выбор</p><h2>Сначала найдите свою задачу</h2></div>
    <div class="saby-grid product-grid">${directionCardGrid(".")}</div>
  </section>
  <section class="section section-muted">
    <div class="section-heading split">
      <div><p class="section-kicker">Основные продукты</p><h2>Что обычно входит в запуск</h2></div>
      <p>На каждой странице есть ситуации, состав работ, факторы цены, мини-кейс и ответы на вопросы. Это помогает не покупать лишнее и не запускать сервис вслепую.</p>
    </div>
    <div class="launch-timeline">
      <article><span>01</span><h3>Понимаем задачу</h3><p>Сначала фиксируем, что именно мешает работе: документы, сроки, сотрудники, склад, маркировка или учет.</p></article>
      <article><span>02</span><h3>Выбираем направление</h3><p>Подбираем Saby не по названию лицензии, а по тому, какую ежедневную задачу нужно закрыть.</p></article>
      <article><span>03</span><h3>Считаем запуск</h3><p>Уточняем регион, пользователей, организации и работы по настройке, чтобы подготовить понятную смету.</p></article>
      <article><span>04</span><h3>Запускаем в работе</h3><p>Помогаем команде пройти первый рабочий сценарий и понять, где смотреть статус.</p></article>
    </div>
  </section>
  <section class="section section-dark">
    <div class="section-heading"><p class="section-kicker">Если сомневаетесь</p><h2>Можно не знать название продукта</h2><p>Достаточно описать, что сейчас неудобно: документы, сроки, сотрудники, склад, маркировка или заявки. Мы предложим стартовый вариант и объясним, почему именно он.</p></div>
    ${button("../index.html#request", "Описать задачу")}
  </section>`;

  writePage("saby-directions/index.html", layout({
    title: "Направления Saby — каталог задач",
    description: "Каталог направлений Saby: ЭДО, отчетность, бухгалтерия, кадры, торговля, склад и маркировка.",
    root: "..",
    active: "saby",
    bodyClass: "saby-directions-page",
    content
  }));
}

function renderDirection(item) {
  const root = "../..";
  const content = `
  <section class="section page-hero page-hero-light saby-product-hero">
    <div>
      <p class="eyebrow">Saby: ${item.label}</p>
      <h1>${item.hero}</h1>
      <p class="hero-lead dark-lead">${item.lead}</p>
      <div class="hero-actions">${button("../../index.html#request", "Рассчитать запуск")}${button("../index.html", "Все направления", true)}</div>
    </div>
    <aside class="hero-summary hero-summary-light">
      <strong>Что уточним перед расчетом</strong>
      <ul>${item.factors.map((factor) => `<li>${factor}</li>`).join("")}</ul>
    </aside>
  </section>
  <section class="section">
    <div class="section-heading"><p class="section-kicker">Когда это нужно</p><h2>${item.situationsTitle}</h2></div>
    <div class="scenario-flow scenario-flow-${item.slug}">
      ${item.situations.map(([title, text], index) => `<article>
        <span>0${index + 1}</span>
        <h3>${title}</h3>
        <p>${text}</p>
      </article>`).join("")}
    </div>
  </section>
  <section class="section section-muted">
    <div class="section-heading split">
      <div><p class="section-kicker">Что входит</p><h2>Собираем запуск вокруг вашей реальной задачи</h2></div>
      <p>Не начинаем с универсального прайса. Сначала уточняем, как сейчас работает компания, и только потом предлагаем состав Saby, настройки и поддержку.</p>
    </div>
    ${launchTimeline(item)}
  </section>
  <section class="section">
    <div class="case-panel">
      <div><p class="section-kicker">Пример результата</p><h2>${item.caseTitle}</h2></div>
      <p>${item.caseText}</p>
    </div>
  </section>
  <section class="section section-dark">
    <div class="section-heading split">
      <div><p class="section-kicker">Стоимость</p><h2>От чего зависит расчет</h2></div>
      <p>Точную стоимость подтверждаем после уточнения региона и состава работ. Ниже — факторы, которые чаще всего меняют расчет.</p>
    </div>
    ${priceFormula(item)}
  </section>
  <section class="section">
    <div class="section-heading"><p class="section-kicker">FAQ</p><h2>Частые вопросы по направлению</h2></div>
    <div class="faq">${item.faq.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join("")}</div>
  </section>
  ${requestSection(root)}`;

  writePage(`saby-directions/${item.slug}/index.html`, layout({
    title: `${item.label} в Saby — запуск и настройка`,
    description: `${item.label}: что входит в запуск Saby, когда это нужно и что влияет на расчет.`,
    root,
    active: "saby",
    bodyClass: "saby-directions-page",
    content
  }));
}

function renderSites() {
  const content = `
  <section class="section page-hero page-hero-light">
    <div>
      <p class="eyebrow">Сайты, формы, CRM и боты</p>
      <h1>Собираем цифровые точки входа, где клиент понимает предложение и оставляет полезную заявку</h1>
      <p class="hero-lead dark-lead">Если задача выходит за рамки Saby, помогаем собрать сайт, форму, CRM или бота так, чтобы обращение не терялось после первого клика.</p>
      <div class="hero-actions">${button("../index.html#request", "Обсудить сайт")}${button("../knowledge/index.html", "Посмотреть разборы", true)}</div>
    </div>
    <aside class="hero-summary hero-summary-light">
      <strong>Что связываем</strong>
      <ul><li>понятное предложение;</li><li>форму заявки;</li><li>ответственного;</li><li>уведомление и статус;</li><li>аналитику источников.</li></ul>
    </aside>
  </section>
  <section class="section">
    <div class="section-heading split">
      <div><p class="section-kicker">Когда это нужно</p><h2>Сайт должен не просто выглядеть современно, а помогать клиенту сделать следующий шаг</h2></div>
      <p>Мы смотрим на страницу глазами человека, который впервые пришел с вопросом. Ему нужно быстро понять, что вы делаете, почему вам можно доверять и что написать в заявке.</p>
    </div>
    <div class="equal-card-grid four">
      <article><span>01</span><h3>На сайт заходят, но не оставляют заявки</h3><p>Проверяем первый экран, оффер, форму, доверие и понятность следующего шага.</p></article>
      <article><span>02</span><h3>Заявки приходят неполными</h3><p>Добавляем вопросы, которые помогают менеджеру сразу понять задачу, регион, объем и срочность.</p></article>
      <article><span>03</span><h3>Команда не видит источник обращения</h3><p>Настраиваем передачу заявки так, чтобы было понятно, откуда пришел клиент и кто отвечает.</p></article>
      <article><span>04</span><h3>Повторяющиеся вопросы забирают время</h3><p>Часть первичного сбора данных можно передать форме или боту, не теряя человеческий контакт.</p></article>
    </div>
  </section>
  <section class="section section-muted">
    <div class="section-heading"><p class="section-kicker">Что можно собрать</p><h2>Формат выбираем по задаче, а не по шаблону</h2></div>
    <div class="solution-grid">
      <article class="solution-card"><span>Сайт</span><h3>Страница услуги или витрина направлений</h3><p>Подходит, когда нужно объяснить предложение, собрать доверие и привести к заявке.</p></article>
      <article class="solution-card"><span>CRM</span><h3>Учет заявок и следующий шаг</h3><p>Подходит, когда обращения есть, но непонятно, кто их ведет и где они застревают.</p></article>
      <article class="solution-card"><span>Бот</span><h3>Первичный сбор данных</h3><p>Подходит для типовых вопросов, записи, уточнения параметров и передачи заявки человеку.</p></article>
    </div>
  </section>
  ${requestSection("..")}`;

  writePage("sites/index.html", layout({
    title: "Сайты, CRM и боты для бизнеса — Элдокс",
    description: "Сайты, формы, CRM и боты, которые помогают клиенту понять предложение и оставить полезную заявку.",
    root: "..",
    active: "sites",
    content
  }));
}

function renderKnowledge() {
  const content = `
  <section class="section page-hero page-hero-light">
    <div>
      <p class="eyebrow">База знаний</p>
      <h1>Разбираем Saby, ЭДО, отчетность, сайты и CRM простым языком</h1>
      <p class="hero-lead dark-lead">Пишем не новости ради новостей, а практические разборы: что изменилось, кого касается, что проверить и с какого шага начать.</p>
      <div class="hero-actions">${button("#articles", "Смотреть публикации")}${button("../index.html#request", "Предложить тему", true)}</div>
    </div>
    <aside class="hero-summary hero-summary-light">
      <strong>Рубрики</strong>
      <ul><li>Saby и ЭДО;</li><li>отчетность и требования;</li><li>кадры и документы;</li><li>сайты, CRM и заявки;</li><li>боты и интеграции.</li></ul>
    </aside>
  </section>
  <section class="section section-muted" id="articles">
    <div class="section-heading split">
      <div><p class="section-kicker">Публикации</p><h2>Витрина материалов для практических решений</h2></div>
      <p>Каждый материал отвечает на простой вопрос: что происходит, почему это важно для бизнеса и что проверить у себя до покупки или настройки сервиса.</p>
    </div>
    <div class="article-grid">${articleCards("..", true)}</div>
  </section>
  ${requestSection("..")}`;

  writePage("knowledge/index.html", layout({
    title: "База знаний Элдокс",
    description: "Практические материалы про Saby, ЭДО, отчетность, сайты, CRM и заявки.",
    root: "..",
    active: "knowledge",
    content
  }));
}

function renderAbout() {
  const content = `
  <section class="section page-hero page-hero-light">
    <div>
      <p class="eyebrow">Элдокс и Purrfect Apps</p>
      <h1>Одна точка входа для Saby и цифровых решений вокруг заявок, документов и продаж</h1>
      <p class="hero-lead dark-lead">Элдокс ведет клиентскую задачу и помогает с Saby. Purrfect Apps подключается там, где нужны сайт, CRM, бот или связка инструментов. Для клиента это один понятный путь от вопроса до запуска.</p>
      <div class="hero-actions">${button("../index.html#request", "Обсудить задачу")}${button("../sites/index.html", "Сайты и боты", true)}</div>
    </div>
    <aside class="hero-summary hero-summary-light">
      <strong>Кто за что отвечает</strong>
      <ul><li>Элдокс: Saby, задача, коммуникация;</li><li>Purrfect Apps: сайт, CRM, бот, интеграции;</li><li>вместе: понятный запуск без лишней координации.</li></ul>
    </aside>
  </section>
  <section class="section">
    <div class="section-heading"><p class="section-kicker">Как работаем</p><h2>Сначала понимаем задачу, потом подбираем инструмент</h2></div>
    <div class="equal-card-grid three">
      <article><span>01</span><h3>Разбираем, что болит сейчас</h3><p>Документы, отчетность, заявки, продажи, склад, кадры или сайт: называем задачу человеческими словами.</p></article>
      <article><span>02</span><h3>Выбираем рабочее решение</h3><p>Это может быть Saby, сайт, CRM, бот или несколько инструментов, если задача шире одного сервиса.</p></article>
      <article><span>03</span><h3>Доводим до понятного запуска</h3><p>Показываем команде, где появляется задача, кто отвечает и как проверить следующий шаг.</p></article>
    </div>
  </section>
  ${requestSection("..")}`;

  writePage("about/index.html", layout({
    title: "О нас — Элдокс и Purrfect Apps",
    description: "Элдокс помогает с Saby и задачей клиента, Purrfect Apps подключает сайты, CRM, ботов и интеграции.",
    root: "..",
    active: "about",
    content
  }));
}

function renderArticlePages() {
  for (const [tag, title, summary, img, slug] of articles) {
    const content = `
    <article class="section article-page">
      <p class="section-kicker">${tag}</p>
      <h1>${title}</h1>
      <p class="hero-lead dark-lead">${summary}</p>
      <img class="article-hero-image" src="../../assets/${img}" alt="" />
      <section class="article-brief"><h2>Коротко</h2><p>Материал помогает быстро понять, почему тема важна для бизнеса и что проверить у себя перед покупкой, настройкой или разговором со специалистом.</p></section>
      <section class="article-checklist">
        <div><h2>Что проверить</h2><p>Если хотя бы два пункта похожи на вашу ситуацию, лучше сначала разобрать задачу, а не покупать сервис по названию.</p></div>
        <ul><li>какая задача мешает работе сейчас;</li><li>кто отвечает за следующий шаг;</li><li>какие данные нужны для расчета;</li><li>что можно запустить первым без лишнего объема.</li></ul>
      </section>
      <section class="article-callout">
        <span>Следующий шаг</span>
        <h2>Когда стоит обратиться</h2>
        <p>Если вы узнаете свою ситуацию и хотите понять, с чего начать, опишите задачу. Мы подскажем направление и состав первого шага.</p>
      </section>
    </article>
    ${requestSection("../..")}`;
    writePage(`knowledge/${slug}/index.html`, layout({
      title: `${title} — Элдокс`,
      description: summary,
      root: "../..",
      active: "knowledge",
      content
    }));
  }
}

renderHome();
renderCatalog();
directions.forEach(renderDirection);
renderSites();
renderKnowledge();
renderAbout();
renderArticlePages();

console.log(`P0 site rebuilt: ${directions.length + articles.length + 5} pages`);
