const product = document.querySelector("#product");
const region = document.querySelector("#region");
const users = document.querySelector("#users");
const support = document.querySelector("#support");
const usersOut = document.querySelector("#usersOut");
const price = document.querySelector("#price");
const priceNote = document.querySelector("#priceNote");
const requestForm = document.querySelector("#requestForm");
const formStatus = document.querySelector("#formStatus");

const basePrices = {
  edo: 32000,
  reporting: 28000,
  hr: 36000,
  trade: 42000,
  complex: 68000,
};

const regionFactors = {
  msk: 1.35,
  spb: 1.2,
  vdk: 0.82,
  region: 1,
};

const labels = {
  edo: "ЭДО",
  reporting: "отчетности",
  hr: "кадрового контура",
  trade: "торговли и склада",
  complex: "комплексного запуска",
};

function formatRub(value) {
  return new Intl.NumberFormat("ru-RU").format(Math.round(value / 1000) * 1000) + " ₽";
}

function updateCalculator() {
  const selectedProduct = product.value;
  const selectedRegion = region.value;
  const userCount = Number(users.value);
  const supportCost = support.checked ? 14000 : 0;
  const scale = 1 + Math.max(0, userCount - 5) * 0.018;
  const total = (basePrices[selectedProduct] * regionFactors[selectedRegion] * scale) + supportCost;

  usersOut.value = userCount;
  price.textContent = formatRub(total);
  priceNote.textContent = `Ориентир для ${labels[selectedProduct]} на ${userCount} пользователей. Точная смета зависит от интеграций, обучения и состава работ.`;
}

[product, region, users, support].forEach((control) => {
  control.addEventListener("input", updateCalculator);
  control.addEventListener("change", updateCalculator);
});

updateCalculator();

requestForm.addEventListener("submit", (event) => {
  event.preventDefault();
  formStatus.textContent = "Спасибо. Мы вернемся с расчетом после уточнения деталей.";
  requestForm.reset();
  updateCalculator();
});
