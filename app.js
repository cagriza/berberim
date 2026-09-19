const seedApplications = [
  {
    name: "Mert A.",
    intent: "Düzenli saç ve sakal bakımı",
    status: "Davet kodlu",
  },
  {
    name: "Emre K.",
    intent: "Manikür ve pedikür bakımı",
    status: "İnceleme",
  },
  {
    name: "Can B.",
    intent: "Sakal tasarım ve manikür",
    status: "Bekliyor",
  },
];

const state = {
  applications: [...seedApplications],
};

const form = document.querySelector("#applicationForm");
const queue = document.querySelector("#applicationQueue");
const toast = document.querySelector("#toast");
const slotFeedback = document.querySelector("#slotFeedback");
const openSlotButton = document.querySelector("#openSlotButton");
const copyInviteButton = document.querySelector("#copyInviteButton");
const demoRoleButtons = document.querySelectorAll("[data-demo-role]");
const demoScopedElements = document.querySelectorAll("[data-demo-scope]");
const ownerMetricsForm = document.querySelector("#ownerMetricsForm");
const ownerPricingForm = document.querySelector("#ownerPricingForm");
const ownerStaffForm = document.querySelector("#ownerStaffForm");
const checkoutForm = document.querySelector("#checkoutForm");
const editableStaffList = document.querySelector("#editableStaffList");
const splitPreview = document.querySelector("#splitPreview");
const checkoutFeedback = document.querySelector("#checkoutFeedback");
const metricTransactions = document.querySelector("#metricTransactions");
const metricTransactionDetail = document.querySelector("#metricTransactionDetail");
const metricRevenue = document.querySelector("#metricRevenue");
const metricCareRevenue = document.querySelector("#metricCareRevenue");
const metricStaff = document.querySelector("#metricStaff");
const metricStaffDetail = document.querySelector("#metricStaffDetail");
const metricVisitors = document.querySelector("#metricVisitors");
const metricVisitorDetail = document.querySelector("#metricVisitorDetail");
const priceTargets = document.querySelectorAll("[data-price-target]");
const storageKeys = {
  metrics: "berberimClub.metrics.v2",
  prices: "berberimClub.prices",
  staff: "berberimClub.staff.v2",
};

const seedStaff = [
  { name: "İsmail Gül", role: "Patron + usta", shift: "10:00-21:00", status: "Aktif" },
  { name: "Faruk Usta", role: "Usta", shift: "10:00-19:00", status: "Aktif" },
  { name: "Ali Usta", role: "Usta", shift: "12:00-21:00", status: "Aktif" },
  { name: "Elif Zeren", role: "Bakım uzmanı", shift: "11:00-20:00", status: "Aktif" },
  { name: "Yardımcı 1", role: "Destek", shift: "10:00-18:00", status: "Aktif" },
  { name: "Yardımcı 2", role: "Destek", shift: "11:00-19:00", status: "Aktif" },
  { name: "Yardımcı 3", role: "Destek", shift: "13:00-21:00", status: "Aktif" },
];

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    return entities[character];
  });
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 3200);
}

function formatCurrency(value) {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
  }).format(value);
}

function numberFromForm(data, key) {
  return Number(data.get(key) || 0);
}

function saveJson(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

function readJson(key) {
  try {
    return JSON.parse(window.localStorage.getItem(key) || "null");
  } catch {
    return null;
  }
}

function applyDemoRole(role, shouldNotify = true) {
  document.body.dataset.activeDemoRole = role;

  demoRoleButtons.forEach((button) => {
    const isSelected = button.dataset.demoRole === role;
    button.classList.toggle("selected", isSelected);
    button.setAttribute("aria-pressed", String(isSelected));
  });

  demoScopedElements.forEach((element) => {
    const scope = String(element.dataset.demoScope || "").split(/\s+/);
    const shouldShow = role === "all" || scope.includes(role);
    element.dataset.demoHidden = String(!shouldShow);
  });

  if (shouldNotify) {
    const labels = {
      all: "Tüm demo görünümü açıldı.",
      owner: "Patron ekranı görünümü açıldı.",
      admin: "Admin paneli görünümü açıldı.",
      master: "Usta ekranı görünümü açıldı.",
      customer: "Müşteri ekranı görünümü açıldı.",
    };
    showToast(labels[role] || labels.all);
  }
}

function applyMetrics(metrics, shouldFillForm = false) {
  const transactions = Number(metrics.transactions || 0);
  const revenue = Number(metrics.revenue || 0);
  const careRevenue = Number(metrics.careRevenue || 0);
  const staff = Number(metrics.staff || 0);
  const visitors = Number(metrics.visitors || 0);
  const memberVisitors = Number(metrics.memberVisitors || 0);
  const candidateVisitors = Math.max(visitors - memberVisitors, 0);
  const careTransactions = Math.min(Math.round(transactions * 0.33), transactions);
  const hairTransactions = Math.max(transactions - careTransactions, 0);

  metricTransactions.textContent = String(transactions);
  metricTransactionDetail.textContent = `${hairTransactions} saç/sakal · ${careTransactions} bakım`;
  metricRevenue.textContent = formatCurrency(revenue);
  metricCareRevenue.textContent = `${formatCurrency(careRevenue)} bakım setlerinden`;
  metricStaff.textContent = String(staff);
  metricStaffDetail.textContent = `3 usta · 1 bakım uzmanı · ${Math.max(staff - 4, 0)} destek`;
  metricVisitors.textContent = String(visitors);
  metricVisitorDetail.textContent = `${memberVisitors} üye · ${candidateVisitors} aday/ziyaretçi`;

  if (shouldFillForm) {
    Object.entries(metrics).forEach(([key, value]) => {
      const input = ownerMetricsForm.elements.namedItem(key);
      if (input) input.value = value;
    });
  }
}

function applyPrices(prices, shouldFillForm = false) {
  priceTargets.forEach((target) => {
    const key = target.dataset.priceTarget;
    if (Object.hasOwn(prices, key)) {
      target.textContent = formatCurrency(Number(prices[key]));
    }
  });

  if (shouldFillForm) {
    Object.entries(prices).forEach(([key, value]) => {
      const input = ownerPricingForm.elements.namedItem(key);
      if (input) input.value = value;
    });
  }
}

function summarizeStaff(staff) {
  const activeStaff = staff.filter((person) => person.status !== "İzinli");
  const masters = activeStaff.filter((person) => person.role.toLocaleLowerCase("tr-TR").includes("usta")).length;
  const careExperts = activeStaff.filter((person) => person.role === "Bakım uzmanı").length;
  const support = activeStaff.filter((person) => person.role === "Destek").length;

  metricStaff.textContent = String(activeStaff.length);
  metricStaffDetail.textContent = `${masters} usta · ${careExperts} bakım uzmanı · ${support} destek`;
}

function renderEditableStaff(staff) {
  editableStaffList.innerHTML = "";

  staff.forEach((person, index) => {
    const item = document.createElement("div");
    item.className = "editable-staff-item";
    item.innerHTML = `
      <div>
        <strong>${escapeHtml(person.name)}</strong>
        <span>${escapeHtml(person.role)} · ${escapeHtml(person.shift)} · ${escapeHtml(person.status)}</span>
      </div>
      <button class="icon-button" type="button" data-remove-staff="${index}" title="Çalışanı kaldır">×</button>
    `;
    editableStaffList.append(item);
  });

  summarizeStaff(staff);
}

function calculateSplit(masterType, amount) {
  if (masterType === "owner") {
    return {
      cash: amount,
      masterShare: 0,
      houseShare: amount,
      note: "İşlemi patron yaptığı için tutarın tamamı İsmail Gül tarafında kalır.",
    };
  }

  if (masterType === "care") {
    const masterShare = Math.round(amount * 0.4);
    return {
      cash: amount,
      masterShare,
      houseShare: amount - masterShare,
      note: "Bakım uzmanı işlemlerinde örnek hak ediş yüzde 40 olarak gösterildi.",
    };
  }

  const masterShare = Math.round(amount / 2);
  return {
    cash: amount,
    masterShare,
    houseShare: amount - masterShare,
    note: "Çalışan usta işleminde tutar otomatik yarı yarıya bölünür.",
  };
}

function renderSplitPreview() {
  const data = new FormData(checkoutForm);
  const masterType = String(data.get("master") || "employee");
  const amount = numberFromForm(data, "amount");
  const split = calculateSplit(masterType, amount);

  splitPreview.innerHTML = `
    <div><span>Kasa girişi</span><strong>${formatCurrency(split.cash)}</strong></div>
    <div><span>Usta/uzman payı</span><strong>${formatCurrency(split.masterShare)}</strong></div>
    <div><span>İşletme payı</span><strong>${formatCurrency(split.houseShare)}</strong></div>
  `;
  checkoutFeedback.textContent = split.note;
}

function renderQueue() {
  queue.innerHTML = "";

  state.applications.forEach((application, index) => {
    const item = document.createElement("div");
    item.className = "queue-item";
    const safeName = escapeHtml(application.name);
    const safeIntent = escapeHtml(application.intent);
    const safeStatus = escapeHtml(application.status);
    item.innerHTML = `
      <div>
        <strong>${safeName}</strong>
        <span>${safeIntent} · ${safeStatus}</span>
      </div>
      <div class="queue-actions" aria-label="${safeName} başvuru işlemleri">
        <button class="icon-button" type="button" data-action="approve" data-index="${index}" title="Onayla">✓</button>
        <button class="icon-button" type="button" data-action="hold" data-index="${index}" title="Beklet">…</button>
      </div>
    `;
    queue.append(item);
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const name = String(data.get("name") || "").trim();
  const intent = String(data.get("intent") || "Bakım başvurusu");
  const sets = data.getAll("sets").map((value) => String(value));
  const code = String(data.get("code") || "").trim();
  const combinedIntent = sets.length ? `${intent} + ${sets.join(" + ")}` : intent;

  state.applications.unshift({
    name,
    intent: combinedIntent,
    status: code ? "Davet kodlu" : "Ön inceleme",
  });

  form.reset();
  renderQueue();
  showToast("Başvuru kaydedildi. Üyelik onayı işletme panelinden verilecek.");
});

queue.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;

  const index = Number(button.dataset.index);
  const application = state.applications[index];
  if (!application) return;

  if (button.dataset.action === "approve") {
    application.status = "Onaylandı";
    showToast(`${application.name} üyeliği onaylandı. Seans erişimi artık seçili açılabilir.`);
  } else {
    application.status = "Beklemeye alındı";
    showToast(`${application.name} bekleme listesine alındı.`);
  }

  renderQueue();
});

openSlotButton.addEventListener("click", () => {
  slotFeedback.textContent =
    "Cuma 19:30 saç, manikür ve pedikür seansı Atelier üyelerine açıldı. Sistem 115 dk ve 2 uzman ihtiyacıyla planladı.";
  showToast("Kontrollü seans erişimi güncellendi.");
});

copyInviteButton.addEventListener("click", async () => {
  const inviteCode = "BC-ATELIER-09";

  try {
    await navigator.clipboard.writeText(inviteCode);
    showToast(`${inviteCode} davet kodu kopyalandı.`);
  } catch {
    showToast(`${inviteCode} davet kodu hazır.`);
  }
});

demoRoleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    applyDemoRole(button.dataset.demoRole || "all");
    document.querySelector("#roles")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

ownerMetricsForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(ownerMetricsForm);
  const metrics = {
    transactions: numberFromForm(data, "transactions"),
    revenue: numberFromForm(data, "revenue"),
    careRevenue: numberFromForm(data, "careRevenue"),
    staff: numberFromForm(data, "staff"),
    visitors: numberFromForm(data, "visitors"),
    memberVisitors: numberFromForm(data, "memberVisitors"),
  };

  applyMetrics(metrics);
  saveJson(storageKeys.metrics, metrics);
  showToast("Günlük yönetici özeti güncellendi.");
});

ownerPricingForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(ownerPricingForm);
  const prices = {
    haircut: numberFromForm(data, "haircut"),
    beard: numberFromForm(data, "beard"),
    manicure: numberFromForm(data, "manicure"),
    pedicure: numberFromForm(data, "pedicure"),
    atelier: numberFromForm(data, "atelier"),
    handsFeet: numberFromForm(data, "handsFeet"),
    privateDay: numberFromForm(data, "privateDay"),
  };

  applyPrices(prices);
  saveJson(storageKeys.prices, prices);
  showToast("Hizmet ve paket fiyatları güncellendi.");
});

ownerStaffForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(ownerStaffForm);
  const staff = readJson(storageKeys.staff) || [...seedStaff];
  staff.push({
    name: String(data.get("staffName") || "").trim(),
    role: String(data.get("staffRole") || "Usta"),
    shift: String(data.get("staffShift") || "").trim(),
    status: String(data.get("staffStatus") || "Aktif"),
  });

  saveJson(storageKeys.staff, staff);
  renderEditableStaff(staff);
  ownerStaffForm.reset();
  showToast("Çalışan ve vardiya listesi güncellendi.");
});

checkoutForm.addEventListener("input", renderSplitPreview);

checkoutForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(checkoutForm);
  const paymentType = String(data.get("paymentType") || "Ödeme");
  const amount = numberFromForm(data, "amount");
  renderSplitPreview();
  showToast(`${formatCurrency(amount)} ${paymentType.toLocaleLowerCase("tr-TR")} ile kasaya geçti.`);
});

editableStaffList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-remove-staff]");
  if (!button) return;

  const index = Number(button.dataset.removeStaff);
  const staff = readJson(storageKeys.staff) || [...seedStaff];
  staff.splice(index, 1);
  saveJson(storageKeys.staff, staff);
  renderEditableStaff(staff);
  showToast("Çalışan listeden kaldırıldı.");
});

const savedMetrics = readJson(storageKeys.metrics);
if (savedMetrics) applyMetrics(savedMetrics, true);

const savedPrices = readJson(storageKeys.prices);
if (savedPrices) applyPrices(savedPrices, true);

const savedStaff = readJson(storageKeys.staff) || [...seedStaff];
renderEditableStaff(savedStaff);

applyDemoRole("all", false);
renderSplitPreview();
renderQueue();
