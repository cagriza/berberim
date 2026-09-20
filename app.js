const seedApplications = [
  {
    id: "seed-mert",
    name: "Mert A.",
    phone: "demo-mert-a",
    intent: "Düzenli saç ve sakal bakımı",
    status: "Davet kodlu",
  },
  {
    id: "seed-emre",
    name: "Emre K.",
    phone: "demo-emre-k",
    intent: "Manikür ve pedikür bakımı",
    status: "İnceleme",
  },
  {
    id: "seed-can",
    name: "Can B.",
    phone: "demo-can-b",
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
const capacityText = document.querySelector("#capacityText");
const capacityBar = document.querySelector("#capacityBar");
const capacityNote = document.querySelector("#capacityNote");
const calendarSummary = document.querySelector("#calendarSummary");
const calendarDays = document.querySelector("#calendarDays");
const calendarOpenSlots = document.querySelector("#calendarOpenSlots");
const visitFlow = document.querySelector("#visitFlow");
const exceptionList = document.querySelector("#exceptionList");
const seedExceptionsButton = document.querySelector("#seedExceptionsButton");
const memberQuickList = document.querySelector("#memberQuickList");
const copyInviteButton = document.querySelector("#copyInviteButton");
const demoLoginForm = document.querySelector("#demoLoginForm");
const demoUserSelect = document.querySelector("#demoUserSelect");
const loginSessionState = document.querySelector("#loginSessionState");
const currentAccessRole = document.querySelector("#currentAccessRole");
const currentAccessName = document.querySelector("#currentAccessName");
const currentAccessScope = document.querySelector("#currentAccessScope");
const demoRoleButtons = document.querySelectorAll("[data-demo-role]");
const demoScopedElements = document.querySelectorAll("[data-demo-scope]");
const ownerMetricsForm = document.querySelector("#ownerMetricsForm");
const ownerPricingForm = document.querySelector("#ownerPricingForm");
const specialPriceForm = document.querySelector("#specialPriceForm");
const ownerStaffForm = document.querySelector("#ownerStaffForm");
const checkoutForm = document.querySelector("#checkoutForm");
const stockItemForm = document.querySelector("#stockItemForm");
const stockMovementForm = document.querySelector("#stockMovementForm");
const staffFinanceForm = document.querySelector("#staffFinanceForm");
const editableStaffList = document.querySelector("#editableStaffList");
const teamStatusList = document.querySelector("#teamStatusList");
const editablePriceList = document.querySelector("#editablePriceList");
const editableStockList = document.querySelector("#editableStockList");
const movementStockSelect = document.querySelector("#movementStockSelect");
const stockMovementList = document.querySelector("#stockMovementList");
const financeStaffSelect = document.querySelector("#financeStaffSelect");
const staffFinanceTable = document.querySelector("#staffFinanceTable");
const specialPriceCustomers = document.querySelector("#specialPriceCustomers");
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
const ownerGrossCash = document.querySelector("#ownerGrossCash");
const ownerStaffShares = document.querySelector("#ownerStaffShares");
const ownerStaffDebt = document.querySelector("#ownerStaffDebt");
const ownerNetCash = document.querySelector("#ownerNetCash");
const cashCardTotal = document.querySelector("#cashCardTotal");
const cashCashTotal = document.querySelector("#cashCashTotal");
const cashOnlineTotal = document.querySelector("#cashOnlineTotal");
const cashAverageTicket = document.querySelector("#cashAverageTicket");
const cashLedger = document.querySelector("#cashLedger");
const floorInside = document.querySelector("#floorInside");
const floorWaiting = document.querySelector("#floorWaiting");
const floorCompleted = document.querySelector("#floorCompleted");
const floorOpenPayment = document.querySelector("#floorOpenPayment");
const breakdownHaircut = document.querySelector("#breakdownHaircut");
const breakdownBeard = document.querySelector("#breakdownBeard");
const breakdownManicure = document.querySelector("#breakdownManicure");
const breakdownPedicure = document.querySelector("#breakdownPedicure");
const priceTargets = document.querySelectorAll("[data-price-target]");
const storageKeys = {
  metrics: "berberimClub.metrics.v2",
  prices: "berberimClub.prices",
  demoUsers: "berberimClub.demoUsers.v1",
  activeDemoUser: "berberimClub.activeDemoUser.v1",
  activeSession: "berberimClub.activeSession.v1",
  applications: "berberimClub.applications.v1",
  staff: "berberimClub.staff.v2",
  staffFinance: "berberimClub.staffFinance.v1",
  cashDetails: "berberimClub.cashDetails.v1",
  sessions: "berberimClub.sessions.v1",
  calendar: "berberimClub.calendar.v1",
  capacity: "berberimClub.capacity.v1",
  exceptions: "berberimClub.exceptions.v1",
  floorStatus: "berberimClub.floorStatus.v1",
  memberCards: "berberimClub.memberCards.v1",
  serviceBreakdown: "berberimClub.serviceBreakdown.v1",
  specialPrices: "berberimClub.specialPrices.v1",
  stock: "berberimClub.stock.v1",
  stockMovements: "berberimClub.stockMovements.v1",
};
const apiBase = "";

const seedStaff = [
  { name: "İsmail Gül", role: "Patron + usta", shift: "10:00-21:00", status: "Aktif" },
  { name: "Faruk Usta", role: "Usta", shift: "10:00-19:00", status: "Aktif" },
  { name: "Ali Usta", role: "Usta", shift: "12:00-21:00", status: "Aktif" },
  { name: "Elif Zeren", role: "Bakım uzmanı", shift: "11:00-20:00", status: "Aktif" },
  { name: "Yardımcı 1", role: "Destek", shift: "10:00-18:00", status: "Aktif" },
  { name: "Yardımcı 2", role: "Destek", shift: "11:00-19:00", status: "Aktif" },
  { name: "Yardımcı 3", role: "Destek", shift: "13:00-21:00", status: "Aktif" },
];

const seedDemoUsers = [
  {
    id: "all",
    name: "Sunum görünümü",
    roleName: "Tüm demo",
    roleCode: "all",
    demoRole: "all",
    accessNote: "Bütün ekranlar karşılaştırmalı olarak açık.",
  },
  {
    id: "owner-demo",
    name: "İsmail Gül",
    roleName: "Patron",
    roleCode: "owner",
    demoRole: "owner",
    accessNote: "Tüm kasa, personel hesabı ve mahrem müşteri bilgileri açık.",
  },
  {
    id: "admin-demo",
    name: "Salon Admini",
    roleName: "Admin",
    roleCode: "admin",
    demoRole: "admin",
    accessNote: "Operasyon, üyelik ve ayar ekranları açık; patron net kasası kapalı.",
  },
  {
    id: "master-demo",
    name: "Faruk Usta",
    roleName: "Usta",
    roleCode: "master",
    demoRole: "master",
    accessNote: "Kendi seansı, ödeme kapatma ve kendi hak ediş özeti açık.",
  },
  {
    id: "customer-demo",
    name: "Mehmet A.",
    roleName: "Müşteri",
    roleCode: "customer",
    demoRole: "customer",
    accessNote: "Sadece kendi üyelik, bakım ve seans bilgileri açık.",
  },
];

const seedStaffFinance = [
  {
    id: 2,
    name: "Faruk Usta",
    role: "Usta",
    salaryAmount: 38000,
    earnedAmount: 12450,
    advanceDebt: 3000,
    paidAmount: 0,
    remainingAmount: 9450,
  },
  {
    id: 3,
    name: "Ali Usta",
    role: "Usta",
    salaryAmount: 35000,
    earnedAmount: 8750,
    advanceDebt: 0,
    paidAmount: 0,
    remainingAmount: 8750,
  },
  {
    id: 4,
    name: "Elif Zeren",
    role: "Bakım uzmanı",
    salaryAmount: 32000,
    earnedAmount: 6200,
    advanceDebt: 1500,
    paidAmount: 0,
    remainingAmount: 4700,
  },
];

const seedSpecialPrices = [
  { customerName: "Mehmet A.", serviceName: "Saç + sakal", amount: 1750, note: "Sadık üye özel fiyatı" },
  { customerName: "Çağrı Z.", serviceName: "Saç + manikür + pedikür", amount: 2350, note: "Atelier kombin indirimi" },
];

const seedStock = [
  { name: "Tek kullanımlık havlu", quantity: 42, unit: "adet", status: "Güvenli" },
  { name: "Manikür seti", quantity: 9, unit: "paket", status: "Azalıyor" },
  { name: "Pedikür hijyen kiti", quantity: 5, unit: "paket", status: "Kritik" },
  { name: "Sakal bakım yağı", quantity: 18, unit: "şişe", status: "Güvenli" },
];

const seedStockMovements = [
  { name: "Tek kullanımlık havlu", type: "out", quantity: 18, note: "Bugünkü kullanım" },
  { name: "Manikür seti", type: "out", quantity: 4, note: "Manikür seansları" },
  { name: "Pedikür hijyen kiti", type: "in", quantity: 6, note: "Yeni alım" },
];

const seedSessions = [
  { startsAt: "2026-09-25 19:30:00", customerName: "Çağrı Z.", serviceSummary: "Saç + manikür + pedikür" },
  { startsAt: "2026-09-25 20:15:00", customerName: "Mert A.", serviceSummary: "Saç + sakal" },
  { startsAt: "2026-09-25 21:00:00", customerName: "Private blok", serviceSummary: "Korunan saat" },
];

const seedCalendar = {
  summary: { plannedSessions: 5, privateBlocks: 2, openSlots: 3 },
  days: [
    {
      label: "Pzt",
      date: "21 Eyl",
      items: [
        { time: "10:30", title: "Faruk Usta", subtitle: "Saç + sakal", meta: "Mert A. · Usta", kind: "session" },
        { time: "16:00", title: "Private blok", subtitle: "İsmail Gül", meta: "Müşteriye kapalı", kind: "private" },
      ],
    },
    {
      label: "Sal",
      date: "22 Eyl",
      items: [{ time: "14:00", title: "Açılabilir slot", subtitle: "El-ayak bakımı", meta: "Elif Zeren uygun", kind: "open" }],
    },
    { label: "Çar", date: "23 Eyl", items: [] },
    {
      label: "Per",
      date: "24 Eyl",
      items: [{ time: "18:30", title: "Ali Usta", subtitle: "Sakal tasarım", meta: "Onaylı üye", kind: "session" }],
    },
    {
      label: "Cum",
      date: "25 Eyl",
      items: [{ time: "19:30", title: "Çağrı Z.", subtitle: "Saç + manikür + pedikür", meta: "1 usta + 1 bakım uzmanı", kind: "session" }],
    },
    { label: "Cmt", date: "26 Eyl", items: [{ time: "11:00", title: "Açılabilir slot", subtitle: "Pedikür kontrolü", meta: "Müşteriye seçili açılır", kind: "open" }] },
    { label: "Paz", date: "27 Eyl", items: [{ time: "Kapalı", title: "Korunan saat", subtitle: "Private üyeler", meta: "Genel görünmez", kind: "private" }] },
  ],
  openSlots: [
    { label: "Salı", time: "14:00", service: "El ve ayak bakımı", note: "Bakım uzmanı uygun" },
    { label: "Cuma", time: "19:30", service: "Saç + manikür + pedikür", note: "Atelier üyeye açıldı" },
    { label: "Cumartesi", time: "11:00", service: "Pedikür kontrolü", note: "Onay bekliyor" },
  ],
};

const seedCapacity = {
  usedSessions: 5,
  maxSessions: 8,
  reservedBlocks: 2,
  percent: 62,
  note: "Private üyeler için 2 kapalı saat korunuyor.",
};

const seedExceptions = {
  cancelled: 1,
  noShow: 0,
  reschedule: 2,
};

const seedFloorStatus = {
  inside: 3,
  waiting: 2,
  completed: 18,
  openPayment: 1,
};

const seedServiceBreakdown = {
  haircut: 9,
  beard: 7,
  manicure: 4,
  pedicure: 2,
};

const seedMemberCards = [
  {
    customerName: "Çağrı Z.",
    membershipLevel: "Atelier",
    status: "içeride",
    serviceSummary: "saç + manikür + pedikür",
    note: "Son not: el bakımında mat bitiş",
  },
  {
    customerName: "Mert A.",
    membershipLevel: "Essential",
    status: "bekliyor",
    serviceSummary: "saç + sakal",
    note: "Son not: sakal kontürü keskin",
  },
  {
    customerName: "Emre K.",
    membershipLevel: "Private",
    status: "tamamlandı",
    serviceSummary: "tam bakım",
    note: "Tahsilat: kart ile kapandı",
  },
];

const seedCashDetails = {
  grossAmount: 24850,
  paymentCount: 18,
  averageTicket: 1380,
  staffShares: 9625,
  staffDebt: 6750,
  netAmount: 15225,
  totals: {
    card: 16900,
    cash: 5250,
    online: 2700,
  },
  movements: [
    {
      paidAt: "2026-09-19 19:20:00",
      customerName: "Mehmet A.",
      serviceName: "Saç + sakal",
      paymentType: "Kredi kartı",
      staffShare: 875,
      businessShare: 875,
    },
    {
      paidAt: "2026-09-19 18:40:00",
      customerName: "Çağrı Z.",
      serviceName: "Saç + manikür + pedikür",
      paymentType: "EFT/Havale",
      staffShare: 940,
      businessShare: 1410,
    },
  ],
};

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

function removeJson(key) {
  try {
    window.localStorage.removeItem(key);
  } catch {
    // Demo storage can be unavailable in strict browser modes.
  }
}

async function apiRequest(path, options = {}) {
  const response = await fetch(`${apiBase}${path}`, {
    headers: {
      "content-type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: "İşlem tamamlanamadı." }));
    throw new Error(error.error || "İşlem tamamlanamadı.");
  }

  return response.status === 204 ? null : response.json();
}

function stockStatusLabel(status) {
  const labels = {
    safe: "Güvenli",
    low: "Azalıyor",
    critical: "Kritik",
    Güvenli: "Güvenli",
    Azalıyor: "Azalıyor",
    Kritik: "Kritik",
  };
  return labels[status] || status || "Güvenli";
}

function movementTypeLabel(type) {
  return type === "in" ? "Giriş" : "Çıkış";
}

function normalizeStockItem(item) {
  return {
    id: item.id,
    name: item.name,
    quantity: Number(item.quantity || 0),
    unit: item.unit || "adet",
    status: stockStatusLabel(item.status),
    minimumQuantity: Number(item.minimumQuantity || item.minimum_quantity || 0),
  };
}

function normalizeStockMovement(movement) {
  return {
    id: movement.id,
    name: movement.name,
    type: movement.type || movement.movementType || "out",
    quantity: Number(movement.quantity || 0),
    note: movement.note || "",
  };
}

async function refreshStockFromApi({ silent = false } = {}) {
  try {
    const [stockData, movementData] = await Promise.all([
      apiRequest("/api/stock"),
      apiRequest("/api/stock-movements"),
    ]);
    const stock = stockData.map(normalizeStockItem);
    const movements = movementData.map(normalizeStockMovement);
    saveJson(storageKeys.stock, stock);
    saveJson(storageKeys.stockMovements, movements);
    renderStock(stock);
    renderStockMovements(movements);
    if (!silent) showToast("Stok verileri veritabanından güncellendi.");
    return true;
  } catch {
    const fallbackStock = readJson(storageKeys.stock) || [...seedStock];
    const fallbackMovements = readJson(storageKeys.stockMovements) || [...seedStockMovements];
    renderStock(fallbackStock);
    renderStockMovements(fallbackMovements);
    if (!silent) showToast("API kapalı olduğu için demo stok hafızası kullanılıyor.");
    return false;
  }
}

function normalizeSpecialPrice(price) {
  return {
    id: price.id,
    customerName: price.customerName,
    serviceName: price.serviceName,
    amount: Number(price.amount || 0),
    note: price.note || "",
  };
}

async function refreshSpecialPricesFromApi({ silent = false } = {}) {
  try {
    const prices = (await apiRequest("/api/special-prices")).map(normalizeSpecialPrice);
    saveJson(storageKeys.specialPrices, prices);
    renderSpecialPrices(prices);
    if (!silent) showToast("Özel fiyatlar veritabanından güncellendi.");
    return true;
  } catch {
    const fallbackPrices = readJson(storageKeys.specialPrices) || [...seedSpecialPrices];
    renderSpecialPrices(fallbackPrices);
    if (!silent) showToast("API kapalı olduğu için demo özel fiyat hafızası kullanılıyor.");
    return false;
  }
}

function normalizeStaff(person) {
  return {
    id: person.id,
    name: person.name,
    role: person.role,
    shift: person.shift,
    status: person.status || "Aktif",
  };
}

async function refreshStaffFromApi({ silent = false } = {}) {
  try {
    const staff = (await apiRequest("/api/staff")).map(normalizeStaff);
    saveJson(storageKeys.staff, staff);
    renderEditableStaff(staff);
    if (!silent) showToast("Çalışan listesi veritabanından güncellendi.");
    return true;
  } catch {
    const fallbackStaff = readJson(storageKeys.staff) || [...seedStaff];
    renderEditableStaff(fallbackStaff);
    if (!silent) showToast("API kapalı olduğu için demo çalışan hafızası kullanılıyor.");
    return false;
  }
}

function normalizeStaffFinance(row) {
  return {
    id: row.id,
    name: row.name,
    role: row.role,
    salaryAmount: Number(row.salaryAmount || 0),
    earnedAmount: Number(row.earnedAmount || 0),
    advanceDebt: Number(row.advanceDebt || 0),
    paidAmount: Number(row.paidAmount || 0),
    remainingAmount: Number(row.remainingAmount || 0),
  };
}

function renderStaffFinance(financeRows) {
  staffFinanceTable.innerHTML = `
    <div class="ledger-head">
      <span>Personel</span>
      <span>Rol</span>
      <span>Maaş</span>
      <span>Hak ediş</span>
      <span>Avans/Borç</span>
      <span>İçeride kalan</span>
    </div>
  `;

  financeStaffSelect.innerHTML = "";

  financeRows.forEach((row) => {
    const ledgerRow = document.createElement("div");
    ledgerRow.innerHTML = `
      <strong>${escapeHtml(row.name)}</strong>
      <span>${escapeHtml(row.role)}</span>
      <span>${formatCurrency(row.salaryAmount)}</span>
      <span>${formatCurrency(row.earnedAmount)}</span>
      <span>${formatCurrency(row.advanceDebt)}</span>
      <span>${formatCurrency(row.remainingAmount)}</span>
    `;
    staffFinanceTable.append(ledgerRow);

    const option = document.createElement("option");
    option.value = String(row.id || "");
    option.textContent = row.name;
    financeStaffSelect.append(option);
  });
}

async function refreshStaffFinanceFromApi({ silent = false } = {}) {
  try {
    const financeRows = (await apiRequest("/api/staff-finance")).map(normalizeStaffFinance);
    saveJson(storageKeys.staffFinance, financeRows);
    renderStaffFinance(financeRows);
    if (!silent) showToast("Personel hesapları veritabanından güncellendi.");
    return true;
  } catch {
    const fallbackFinance = readJson(storageKeys.staffFinance) || [...seedStaffFinance];
    renderStaffFinance(fallbackFinance);
    if (!silent) showToast("API kapalı olduğu için demo personel hesabı kullanılıyor.");
    return false;
  }
}

function normalizeDemoUser(user) {
  return {
    id: String(user.id),
    name: user.name,
    roleName: user.roleName,
    roleCode: user.roleCode,
    demoRole: user.demoRole || "customer",
    accessNote: user.accessNote || "Rolüne uygun ekranlar açık.",
  };
}

function renderDemoUsers(users) {
  demoUserSelect.innerHTML = "";

  users.forEach((user) => {
    const option = document.createElement("option");
    option.value = user.id;
    option.textContent = `${user.name} · ${user.roleName}`;
    demoUserSelect.append(option);
  });
}

function updateAccessCard(user) {
  currentAccessRole.textContent = user.roleName;
  currentAccessName.textContent = user.name;
  currentAccessScope.textContent = user.accessNote;
}

function updateLoginSessionState(message) {
  if (loginSessionState) loginSessionState.textContent = message;
}

function applyDemoUser(user, shouldNotify = true) {
  if (!user) return;

  demoUserSelect.value = user.id;
  updateAccessCard(user);
  saveJson(storageKeys.activeDemoUser, user);
  applyDemoRole(user.demoRole, shouldNotify);
}

async function refreshDemoUsersFromApi({ silent = false } = {}) {
  try {
    const users = [
      seedDemoUsers[0],
      ...(await apiRequest("/api/demo-users")).map(normalizeDemoUser),
    ];
    saveJson(storageKeys.demoUsers, users);
    renderDemoUsers(users);
    if (!silent) showToast("Demo kullanıcıları veritabanından güncellendi.");
    return users;
  } catch {
    const fallbackUsers = readJson(storageKeys.demoUsers) || [...seedDemoUsers];
    renderDemoUsers(fallbackUsers);
    if (!silent) showToast("API kapalı olduğu için demo kullanıcı listesi kullanılıyor.");
    return fallbackUsers;
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

function syncDemoUserWithRole(role) {
  const users = readJson(storageKeys.demoUsers) || [...seedDemoUsers];
  const user = users.find((candidate) => candidate.demoRole === role) || seedDemoUsers[0];
  updateAccessCard(user);
  demoUserSelect.value = user.id;
  saveJson(storageKeys.activeDemoUser, user);
}

async function signInDemoUser(user) {
  if (!user || user.id === "all") {
    removeJson(storageKeys.activeSession);
    applyDemoUser(seedDemoUsers[0]);
    updateLoginSessionState("Sunum görünümü açık; belirli bir kullanıcı oturumu seçilmedi.");
    return;
  }

  try {
    const session = await apiRequest("/api/auth/demo-login", {
      method: "POST",
      body: JSON.stringify({ userId: user.id }),
    });
    const signedUser = normalizeDemoUser(session.user);
    saveJson(storageKeys.activeSession, session);
    applyDemoUser(signedUser);
    updateLoginSessionState(`${signedUser.name} için canlı oturum doğrulandı.`);
  } catch {
    removeJson(storageKeys.activeSession);
    applyDemoUser(user);
    updateLoginSessionState("API kapalı olduğu için demo görünümü yerel olarak açıldı.");
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

function normalizePrices(prices) {
  return {
    haircut: Number(prices.haircut || 0),
    beard: Number(prices.beard || 0),
    manicure: Number(prices.manicure || 0),
    pedicure: Number(prices.pedicure || 0),
    atelier: Number(prices.atelier || 0),
    handsFeet: Number(prices.handsFeet || 0),
    privateDay: Number(prices.privateDay || 0),
  };
}

async function refreshPricesFromApi({ silent = false } = {}) {
  try {
    const prices = normalizePrices(await apiRequest("/api/service-prices"));
    saveJson(storageKeys.prices, prices);
    applyPrices(prices, true);
    if (!silent) showToast("Hizmet fiyatları veritabanından güncellendi.");
    return true;
  } catch {
    const fallbackPrices = readJson(storageKeys.prices);
    if (fallbackPrices) applyPrices(fallbackPrices, true);
    if (!silent) showToast("API kapalı olduğu için demo fiyat hafızası kullanılıyor.");
    return false;
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
      <button class="icon-button" type="button" data-remove-staff="${index}" data-staff-id="${person.id || ""}" title="Çalışanı kaldır">×</button>
    `;
    editableStaffList.append(item);
  });

  summarizeStaff(staff);
  renderTeamStatus(staff);
}

function renderTeamStatus(staff) {
  teamStatusList.innerHTML = "";
  const supportCount = staff.filter((person) => person.role === "Destek" && person.status !== "İzinli").length;
  const visibleStaff = staff.filter((person) => person.role !== "Destek").slice(0, 5);

  visibleStaff.forEach((person) => {
    const item = document.createElement("div");
    item.innerHTML = `
      <strong>${escapeHtml(person.name)}</strong>
      <span>${escapeHtml(person.role)} · ${escapeHtml(person.shift)} · ${escapeHtml(person.status)}</span>
    `;
    teamStatusList.append(item);
  });

  if (supportCount) {
    const item = document.createElement("div");
    item.innerHTML = `
      <strong>Yardımcı ekip</strong>
      <span>${supportCount} kişi · hazırlık, karşılama, temizlik · Aktif</span>
    `;
    teamStatusList.append(item);
  }
}

function renderSpecialPrices(prices) {
  editablePriceList.innerHTML = "";
  specialPriceCustomers.innerHTML = "";

  prices.forEach((price, index) => {
    const item = document.createElement("div");
    item.className = "editable-price-item";
    item.innerHTML = `
      <div>
        <strong>${escapeHtml(price.customerName)}</strong>
        <span>${escapeHtml(price.serviceName)} · ${formatCurrency(Number(price.amount))} · ${escapeHtml(price.note || "Not yok")}</span>
      </div>
      <button class="icon-button" type="button" data-remove-special-price="${index}" data-special-price-id="${price.id || ""}" title="Özel fiyatı kaldır">×</button>
    `;
    editablePriceList.append(item);

    const option = document.createElement("option");
    option.value = price.customerName;
    specialPriceCustomers.append(option);
  });
}

function renderStock(stock) {
  editableStockList.innerHTML = "";
  movementStockSelect.innerHTML = "";

  stock.forEach((item, index) => {
    const stockItem = document.createElement("div");
    stockItem.innerHTML = `
      <span>${escapeHtml(item.name)}</span>
      <strong>${Number(item.quantity)} ${escapeHtml(item.unit)}</strong>
      <small>${escapeHtml(stockStatusLabel(item.status))}</small>
      <button class="icon-button" type="button" data-remove-stock="${index}" data-stock-id="${item.id || ""}" title="Malzemeyi kaldır">×</button>
    `;
    editableStockList.append(stockItem);

    const option = document.createElement("option");
    option.value = item.name;
    option.textContent = item.name;
    movementStockSelect.append(option);
  });
}

function renderStockMovements(movements) {
  stockMovementList.innerHTML = "";

  movements.slice(0, 5).forEach((movement) => {
    const item = document.createElement("div");
    const typeText = movementTypeLabel(movement.type);
    item.innerHTML = `
      <strong>${escapeHtml(typeText)} · ${Number(movement.quantity)}</strong>
      <span>${escapeHtml(movement.name)} · ${escapeHtml(movement.note || "Not yok")}</span>
    `;
    stockMovementList.append(item);
  });
}

function formatTime(value) {
  if (!value) return "--:--";
  const date = new Date(String(value).replace(" ", "T"));
  if (Number.isNaN(date.getTime())) return String(value).slice(11, 16) || "--:--";
  return new Intl.DateTimeFormat("tr-TR", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function normalizeCashDetails(details) {
  return {
    grossAmount: Number(details.grossAmount || 0),
    paymentCount: Number(details.paymentCount || 0),
    averageTicket: Number(details.averageTicket || 0),
    staffShares: Number(details.staffShares || 0),
    staffDebt: Number(details.staffDebt || 0),
    netAmount: Number(details.netAmount || 0),
    totals: {
      card: Number(details.totals?.card || 0),
      cash: Number(details.totals?.cash || 0),
      online: Number(details.totals?.online || 0),
    },
    movements: Array.isArray(details.movements) ? details.movements : [],
  };
}

function renderCashDetails(details) {
  const cash = normalizeCashDetails(details);
  ownerGrossCash.textContent = formatCurrency(cash.grossAmount);
  ownerStaffShares.textContent = formatCurrency(cash.staffShares);
  ownerStaffDebt.textContent = formatCurrency(cash.staffDebt);
  ownerNetCash.textContent = formatCurrency(cash.netAmount);
  cashCardTotal.textContent = formatCurrency(cash.totals.card);
  cashCashTotal.textContent = formatCurrency(cash.totals.cash);
  cashOnlineTotal.textContent = formatCurrency(cash.totals.online);
  cashAverageTicket.textContent = formatCurrency(cash.averageTicket);

  cashLedger.innerHTML = `
    <div class="cash-ledger-head">
      <span>Saat</span>
      <span>Müşteri</span>
      <span>Hizmet</span>
      <span>Ödeme</span>
      <span>Usta payı</span>
      <span>İşletme payı</span>
    </div>
  `;

  cash.movements.slice(0, 8).forEach((movement) => {
    const row = document.createElement("div");
    row.innerHTML = `
      <span>${escapeHtml(formatTime(movement.paidAt))}</span>
      <strong>${escapeHtml(String(movement.customerName || "Müşteri"))}</strong>
      <span>${escapeHtml(String(movement.serviceName || "Hizmet"))}</span>
      <span>${escapeHtml(String(movement.paymentType || "Ödeme"))}</span>
      <span>${formatCurrency(Number(movement.staffShare || 0))}</span>
      <span>${formatCurrency(Number(movement.businessShare || 0))}</span>
    `;
    cashLedger.append(row);
  });
}

async function refreshCashDetailsFromApi({ silent = false } = {}) {
  try {
    const details = normalizeCashDetails(await apiRequest("/api/cash/details"));
    saveJson(storageKeys.cashDetails, details);
    renderCashDetails(details);
    if (!silent) showToast("Kasa detayları veritabanından güncellendi.");
    return true;
  } catch {
    const fallbackDetails = readJson(storageKeys.cashDetails) || seedCashDetails;
    renderCashDetails(fallbackDetails);
    if (!silent) showToast("API kapalı olduğu için demo kasa detayları kullanılıyor.");
    return false;
  }
}

function normalizeSession(session) {
  return {
    id: session.id,
    startsAt: session.startsAt,
    customerName: session.customerName || "Üye",
    serviceSummary: session.serviceSummary || "Bakım seansı",
    status: session.status || "open",
  };
}

function renderSessions(sessions) {
  visitFlow.innerHTML = "";

  sessions.slice(0, 5).forEach((session) => {
    const item = document.createElement("div");
    item.innerHTML = `
      <span>${escapeHtml(formatTime(session.startsAt))}</span>
      <strong>${escapeHtml(session.customerName)}</strong>
      <small>${escapeHtml(session.serviceSummary)}</small>
    `;
    visitFlow.append(item);
  });
}

async function refreshSessionsFromApi({ silent = false } = {}) {
  try {
    const sessions = (await apiRequest("/api/sessions/upcoming")).map(normalizeSession);
    const visibleSessions = sessions.length ? sessions : [...seedSessions];
    saveJson(storageKeys.sessions, visibleSessions);
    renderSessions(visibleSessions);
    if (!silent) showToast("Gün akışı veritabanından güncellendi.");
    return true;
  } catch {
    const fallbackSessions = readJson(storageKeys.sessions) || [...seedSessions];
    renderSessions(fallbackSessions);
    if (!silent) showToast("API kapalı olduğu için demo gün akışı kullanılıyor.");
    return false;
  }
}

function normalizeCalendar(calendar) {
  return {
    summary: {
      plannedSessions: Number(calendar?.summary?.plannedSessions || 0),
      privateBlocks: Number(calendar?.summary?.privateBlocks || 0),
      openSlots: Number(calendar?.summary?.openSlots || 0),
    },
    days: Array.isArray(calendar?.days) ? calendar.days : [],
    openSlots: Array.isArray(calendar?.openSlots) ? calendar.openSlots : [],
  };
}

function renderCalendar(calendar) {
  const normalized = normalizeCalendar(calendar);
  calendarSummary.innerHTML = `
    <div><strong>${normalized.summary.plannedSessions}</strong><span>Planlı seans</span></div>
    <div><strong>${normalized.summary.privateBlocks}</strong><span>Korunan saat</span></div>
    <div><strong>${normalized.summary.openSlots}</strong><span>Açılabilir slot</span></div>
  `;

  calendarDays.innerHTML = "";
  normalized.days.forEach((day) => {
    const dayCard = document.createElement("section");
    dayCard.className = "calendar-day";
    const items = Array.isArray(day.items) ? day.items : [];
    dayCard.innerHTML = `
      <header>
        <strong>${escapeHtml(day.label || "Gün")}</strong>
        <time>${escapeHtml(day.date || "")}</time>
      </header>
      ${
        items.length
          ? items
              .map(
                (item) => `
                  <article class="calendar-item" data-kind="${escapeHtml(item.kind || "session")}">
                    <span>${escapeHtml(item.time || "")}</span>
                    <strong>${escapeHtml(item.title || "Seans")}</strong>
                    <small>${escapeHtml(item.subtitle || "")}</small>
                    <small>${escapeHtml(item.meta || "")}</small>
                  </article>
                `
              )
              .join("")
          : '<article class="calendar-item" data-kind="open"><strong>Sakin gün</strong><small>Uygunluk işletme tarafından açılır.</small></article>'
      }
    `;
    calendarDays.append(dayCard);
  });

  calendarOpenSlots.innerHTML = "";
  normalized.openSlots.forEach((slot) => {
    const button = document.createElement("button");
    button.className = "slot";
    button.type = "button";
    button.innerHTML = `
      <span>${escapeHtml(slot.label || "Gün")}</span>
      <strong>${escapeHtml(slot.time || "")}</strong>
      <small>${escapeHtml(slot.service || "Seçili bakım")}</small>
      <small>${escapeHtml(slot.note || "Onaylı üyeye açılır")}</small>
    `;
    calendarOpenSlots.append(button);
  });
}

async function refreshCalendarFromApi({ silent = false } = {}) {
  try {
    const calendar = normalizeCalendar(await apiRequest("/api/calendar/week"));
    saveJson(storageKeys.calendar, calendar);
    renderCalendar(calendar);
    if (!silent) showToast("Takvim canlı veriden güncellendi.");
    return true;
  } catch {
    const fallbackCalendar = readJson(storageKeys.calendar) || seedCalendar;
    renderCalendar(fallbackCalendar);
    if (!silent) showToast("API kapalı olduğu için demo takvim kullanılıyor.");
    return false;
  }
}

function normalizeCapacity(capacity) {
  const maxSessions = Number(capacity.maxSessions || 8);
  const usedSessions = Number(capacity.usedSessions || 0);
  return {
    usedSessions,
    maxSessions,
    reservedBlocks: Number(capacity.reservedBlocks || 0),
    percent: Number(capacity.percent || Math.min(Math.round((usedSessions / maxSessions) * 100), 100)),
    note: capacity.note || "Private üyeler için korunan saat bulunuyor.",
  };
}

function renderCapacity(capacity) {
  const normalized = normalizeCapacity(capacity);
  capacityText.textContent = `${normalized.usedSessions} / ${normalized.maxSessions} seans`;
  capacityBar.style.width = `${Math.min(normalized.percent, 100)}%`;
  capacityNote.textContent = normalized.note;
}

async function refreshCapacityFromApi({ silent = false } = {}) {
  try {
    const capacity = normalizeCapacity(await apiRequest("/api/capacity/today"));
    saveJson(storageKeys.capacity, capacity);
    renderCapacity(capacity);
    if (!silent) showToast("Gün kapasitesi veritabanından güncellendi.");
    return true;
  } catch {
    const fallbackCapacity = readJson(storageKeys.capacity) || seedCapacity;
    renderCapacity(fallbackCapacity);
    if (!silent) showToast("API kapalı olduğu için demo kapasite bilgisi kullanılıyor.");
    return false;
  }
}

function normalizeExceptions(summary) {
  return {
    cancelled: Number(summary.cancelled || 0),
    noShow: Number(summary.noShow || 0),
    reschedule: Number(summary.reschedule || 0),
  };
}

function renderExceptions(summary) {
  const exceptions = normalizeExceptions(summary);
  exceptionList.innerHTML = `
    <div><strong>${exceptions.cancelled}</strong><span>Son dakika iptal</span></div>
    <div><strong>${exceptions.noShow}</strong><span>Gelmedi</span></div>
    <div><strong>${exceptions.reschedule}</strong><span>Yeniden planlanacak</span></div>
  `;
}

async function refreshExceptionsFromApi({ silent = false } = {}) {
  try {
    const exceptions = normalizeExceptions(await apiRequest("/api/sessions/exceptions"));
    saveJson(storageKeys.exceptions, exceptions);
    renderExceptions(exceptions);
    if (!silent) showToast("İptal ve gelmedi özeti veritabanından güncellendi.");
    return true;
  } catch {
    const fallbackExceptions = readJson(storageKeys.exceptions) || seedExceptions;
    renderExceptions(fallbackExceptions);
    if (!silent) showToast("API kapalı olduğu için demo takip özeti kullanılıyor.");
    return false;
  }
}

function normalizeFloorStatus(status) {
  return {
    inside: Number(status.inside || 0),
    waiting: Number(status.waiting || 0),
    completed: Number(status.completed || 0),
    openPayment: Number(status.openPayment || 0),
  };
}

function renderFloorStatus(status) {
  const floor = normalizeFloorStatus(status);
  floorInside.textContent = String(floor.inside);
  floorWaiting.textContent = String(floor.waiting);
  floorCompleted.textContent = String(floor.completed);
  floorOpenPayment.textContent = String(floor.openPayment);
}

async function refreshFloorStatusFromApi({ silent = false } = {}) {
  try {
    const status = normalizeFloorStatus(await apiRequest("/api/floor/status"));
    saveJson(storageKeys.floorStatus, status);
    renderFloorStatus(status);
    if (!silent) showToast("Dükkân akışı veritabanından güncellendi.");
    return true;
  } catch {
    const fallbackStatus = readJson(storageKeys.floorStatus) || seedFloorStatus;
    renderFloorStatus(fallbackStatus);
    if (!silent) showToast("API kapalı olduğu için demo dükkân akışı kullanılıyor.");
    return false;
  }
}

function normalizeMemberCard(card) {
  return {
    id: card.id,
    customerName: card.customerName || "Üye",
    membershipLevel: card.membershipLevel || "atelier",
    status: card.status || "takipte",
    serviceSummary: card.serviceSummary || "Bakım seansı",
    note: card.note || "Özel not yok",
  };
}

function renderMemberCards(cards) {
  memberQuickList.innerHTML = "";

  cards.slice(0, 5).forEach((card) => {
    const item = document.createElement("div");
    item.innerHTML = `
      <strong>${escapeHtml(card.customerName)}</strong>
      <span>${escapeHtml(card.membershipLevel)} · ${escapeHtml(card.status)} · ${escapeHtml(card.serviceSummary)}</span>
      <small>${escapeHtml(card.note)}</small>
    `;
    memberQuickList.append(item);
  });
}

async function refreshMemberCardsFromApi({ silent = false } = {}) {
  try {
    const cards = (await apiRequest("/api/member-cards/today")).map(normalizeMemberCard);
    const visibleCards = cards.length ? cards : [...seedMemberCards];
    saveJson(storageKeys.memberCards, visibleCards);
    renderMemberCards(visibleCards);
    if (!silent) showToast("Bugünkü üye kartları veritabanından güncellendi.");
    return true;
  } catch {
    const fallbackCards = readJson(storageKeys.memberCards) || [...seedMemberCards];
    renderMemberCards(fallbackCards);
    if (!silent) showToast("API kapalı olduğu için demo üye kartları kullanılıyor.");
    return false;
  }
}

function normalizeServiceBreakdown(breakdown) {
  return {
    haircut: Number(breakdown.haircut || 0),
    beard: Number(breakdown.beard || 0),
    manicure: Number(breakdown.manicure || 0),
    pedicure: Number(breakdown.pedicure || 0),
  };
}

function renderServiceBreakdown(breakdown) {
  const summary = normalizeServiceBreakdown(breakdown);
  breakdownHaircut.textContent = String(summary.haircut);
  breakdownBeard.textContent = String(summary.beard);
  breakdownManicure.textContent = String(summary.manicure);
  breakdownPedicure.textContent = String(summary.pedicure);
}

async function refreshServiceBreakdownFromApi({ silent = false } = {}) {
  try {
    const breakdown = normalizeServiceBreakdown(await apiRequest("/api/services/breakdown"));
    saveJson(storageKeys.serviceBreakdown, breakdown);
    renderServiceBreakdown(breakdown);
    if (!silent) showToast("Hizmet kırılımı veritabanından güncellendi.");
    return true;
  } catch {
    const fallbackBreakdown = readJson(storageKeys.serviceBreakdown) || seedServiceBreakdown;
    renderServiceBreakdown(fallbackBreakdown);
    if (!silent) showToast("API kapalı olduğu için demo hizmet kırılımı kullanılıyor.");
    return false;
  }
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

function findSpecialPrice(customerName, serviceName) {
  const prices = readJson(storageKeys.specialPrices) || [...seedSpecialPrices];
  const normalizedCustomer = customerName.trim().toLocaleLowerCase("tr-TR");
  const normalizedService = serviceName.trim().toLocaleLowerCase("tr-TR");

  return prices.find((price) => {
    return (
      price.customerName.toLocaleLowerCase("tr-TR") === normalizedCustomer &&
      price.serviceName.toLocaleLowerCase("tr-TR") === normalizedService
    );
  });
}

function applySpecialPriceAmount() {
  const customerInput = checkoutForm.elements.namedItem("checkoutCustomer");
  const serviceInput = checkoutForm.elements.namedItem("checkoutService");
  const amountInput = checkoutForm.elements.namedItem("amount");
  const specialPrice = findSpecialPrice(String(customerInput.value || ""), String(serviceInput.value || ""));

  if (specialPrice && amountInput) {
    amountInput.value = specialPrice.amount;
    renderSplitPreview();
    checkoutFeedback.textContent = `${specialPrice.customerName} için kayıtlı özel fiyat uygulandı.`;
  }
}

function normalizeApplication(application) {
  return {
    id: application.id,
    name: application.name,
    phone: application.phone || "",
    intent: application.intent || "Bakım başvurusu",
    note: application.note || "",
    code: application.code || "",
    statusCode: application.statusCode || "",
    status: application.status || "Ön inceleme",
  };
}

async function refreshApplicationsFromApi({ silent = false } = {}) {
  try {
    state.applications = (await apiRequest("/api/applications")).map(normalizeApplication);
    saveJson(storageKeys.applications, state.applications);
    renderQueue();
    if (!silent) showToast("Başvuru kuyruğu veritabanından güncellendi.");
    return true;
  } catch {
    state.applications = readJson(storageKeys.applications) || [...seedApplications];
    renderQueue();
    if (!silent) showToast("API kapalı olduğu için demo başvuru kuyruğu kullanılıyor.");
    return false;
  }
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
        <button class="icon-button" type="button" data-action="approve" data-index="${index}" data-application-id="${application.id || ""}" title="Onayla">✓</button>
        <button class="icon-button" type="button" data-action="hold" data-index="${index}" data-application-id="${application.id || ""}" title="Beklet">…</button>
      </div>
    `;
    queue.append(item);
  });
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const name = String(data.get("name") || "").trim();
  const phone = String(data.get("phone") || "").trim();
  const intent = String(data.get("intent") || "Bakım başvurusu");
  const sets = data.getAll("sets").map((value) => String(value));
  const code = String(data.get("code") || "").trim();
  const note = String(data.get("note") || "").trim();
  const combinedIntent = sets.length ? `${intent} + ${sets.join(" + ")}` : intent;
  const application = {
    name,
    phone,
    intent: combinedIntent,
    code,
    note,
  };

  try {
    await apiRequest("/api/applications", {
      method: "POST",
      body: JSON.stringify(application),
    });
    await refreshApplicationsFromApi({ silent: true });
    form.reset();
    showToast("Başvuru veritabanına kaydedildi. Üyelik onayı işletme panelinden verilecek.");
    return;
  } catch {
    showToast("API kapalı. Başvuru demo hafızasına kaydediliyor.");
  }

  state.applications.unshift({
    id: `local-${Date.now()}`,
    name,
    phone,
    intent: combinedIntent,
    code,
    note,
    status: code ? "Davet kodlu" : "Ön inceleme",
  });

  form.reset();
  saveJson(storageKeys.applications, state.applications);
  renderQueue();
  showToast("Başvuru kaydedildi. Üyelik onayı işletme panelinden verilecek.");
});

queue.addEventListener("click", async (event) => {
  const button = event.target.closest("button");
  if (!button) return;

  const index = Number(button.dataset.index);
  const applicationId = Number(button.dataset.applicationId || 0);
  const application = state.applications[index];
  if (!application) return;
  const nextStatus = button.dataset.action === "approve" ? "active" : "hold";

  if (applicationId) {
    try {
      await apiRequest(`/api/applications/${applicationId}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status: nextStatus }),
      });
      await refreshApplicationsFromApi({ silent: true });
      showToast(
        nextStatus === "active"
          ? `${application.name} üyeliği veritabanında onaylandı.`
          : `${application.name} veritabanında beklemeye alındı.`
      );
      return;
    } catch {
      showToast("API kapalı. Başvuru durumu demo hafızasında güncelleniyor.");
    }
  }

  if (button.dataset.action === "approve") {
    application.status = "Onaylandı";
    application.statusCode = "active";
    showToast(`${application.name} üyeliği onaylandı. Seans erişimi artık seçili açılabilir.`);
  } else {
    application.status = "Beklemeye alındı";
    application.statusCode = "hold";
    showToast(`${application.name} bekleme listesine alındı.`);
  }

  saveJson(storageKeys.applications, state.applications);
  renderQueue();
});

openSlotButton.addEventListener("click", async () => {
  try {
    const session = normalizeSession(
      await apiRequest("/api/sessions/open-demo", {
        method: "POST",
        body: JSON.stringify({ startsAt: "2026-09-25 19:30:00" }),
      })
    );
    await refreshSessionsFromApi({ silent: true });
    await refreshFloorStatusFromApi({ silent: true });
    await refreshMemberCardsFromApi({ silent: true });
    await refreshServiceBreakdownFromApi({ silent: true });
    await refreshCapacityFromApi({ silent: true });
    await refreshCalendarFromApi({ silent: true });
    slotFeedback.textContent = `${session.customerName} için ${session.serviceSummary} seansı veritabanına açıldı.`;
    showToast("Kontrollü seans veritabanına açıldı.");
    return;
  } catch {
    showToast("API kapalı. Seans demo gün akışına ekleniyor.");
  }

  const sessions = readJson(storageKeys.sessions) || [...seedSessions];
  sessions.unshift({
    startsAt: "2026-09-25 19:30:00",
    customerName: "Çağrı Z.",
    serviceSummary: "Saç + manikür + pedikür",
    status: "open",
  });
  saveJson(storageKeys.sessions, sessions);
  renderSessions(sessions);
  const memberCards = readJson(storageKeys.memberCards) || [...seedMemberCards];
  memberCards.unshift({
    customerName: "Çağrı Z.",
    membershipLevel: "Atelier",
    status: "içeride",
    serviceSummary: "Saç + manikür + pedikür",
    note: "Son not: el bakımında mat bitiş",
  });
  saveJson(storageKeys.memberCards, memberCards);
  renderMemberCards(memberCards);
  const serviceBreakdown = normalizeServiceBreakdown(readJson(storageKeys.serviceBreakdown) || seedServiceBreakdown);
  serviceBreakdown.haircut += 1;
  serviceBreakdown.manicure += 1;
  serviceBreakdown.pedicure += 1;
  saveJson(storageKeys.serviceBreakdown, serviceBreakdown);
  renderServiceBreakdown(serviceBreakdown);
  const capacity = normalizeCapacity(readJson(storageKeys.capacity) || seedCapacity);
  capacity.usedSessions = Math.min(capacity.usedSessions + 1, capacity.maxSessions);
  capacity.percent = Math.min(Math.round((capacity.usedSessions / capacity.maxSessions) * 100), 100);
  saveJson(storageKeys.capacity, capacity);
  renderCapacity(capacity);
  const floorStatus = normalizeFloorStatus(readJson(storageKeys.floorStatus) || seedFloorStatus);
  floorStatus.inside += 1;
  saveJson(storageKeys.floorStatus, floorStatus);
  renderFloorStatus(floorStatus);
  const calendar = normalizeCalendar(readJson(storageKeys.calendar) || seedCalendar);
  calendar.summary.plannedSessions += 1;
  if (calendar.days[4]?.items) {
    calendar.days[4].items.unshift({
      time: "19:30",
      title: "Çağrı Z.",
      subtitle: "Saç + manikür + pedikür",
      meta: "Demo hafızasında açıldı",
      kind: "session",
    });
  }
  saveJson(storageKeys.calendar, calendar);
  renderCalendar(calendar);
  slotFeedback.textContent =
    "Cuma 19:30 saç, manikür ve pedikür seansı Atelier üyelerine açıldı. Sistem 115 dk ve 2 uzman ihtiyacıyla planladı.";
  showToast("Kontrollü seans erişimi güncellendi.");
});

seedExceptionsButton.addEventListener("click", async () => {
  try {
    const exceptions = normalizeExceptions(
      await apiRequest("/api/sessions/exceptions/demo", {
        method: "POST",
        body: JSON.stringify({}),
      })
    );
    saveJson(storageKeys.exceptions, exceptions);
    renderExceptions(exceptions);
    await refreshFloorStatusFromApi({ silent: true });
    await refreshMemberCardsFromApi({ silent: true });
    showToast("İptal ve gelmedi takip kayıtları veritabanına işlendi.");
    return;
  } catch {
    showToast("API kapalı. Takip kayıtları demo hafızasına işlendi.");
  }

  const exceptions = normalizeExceptions(readJson(storageKeys.exceptions) || seedExceptions);
  exceptions.cancelled += 1;
  exceptions.noShow += 1;
  exceptions.reschedule += 1;
  saveJson(storageKeys.exceptions, exceptions);
  renderExceptions(exceptions);
  const floorStatus = normalizeFloorStatus(readJson(storageKeys.floorStatus) || seedFloorStatus);
  floorStatus.waiting = Math.max(floorStatus.waiting - 1, 0);
  saveJson(storageKeys.floorStatus, floorStatus);
  renderFloorStatus(floorStatus);
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
    const role = button.dataset.demoRole || "all";
    applyDemoRole(role);
    syncDemoUserWithRole(role);
    document.querySelector("#roles")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

demoLoginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const users = readJson(storageKeys.demoUsers) || [...seedDemoUsers];
  const selectedUser = users.find((user) => user.id === demoUserSelect.value) || seedDemoUsers[0];
  await signInDemoUser(selectedUser);
  document.querySelector("#roles")?.scrollIntoView({ behavior: "smooth", block: "start" });
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

ownerPricingForm.addEventListener("submit", async (event) => {
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

  try {
    const updatedPrices = normalizePrices(
      await apiRequest("/api/service-prices", {
        method: "PUT",
        body: JSON.stringify(prices),
      })
    );
    applyPrices(updatedPrices, true);
    saveJson(storageKeys.prices, updatedPrices);
    showToast("Hizmet ve paket fiyatları veritabanına kaydedildi.");
    return;
  } catch {
    showToast("API kapalı. Fiyatlar demo hafızasına kaydediliyor.");
  }

  applyPrices(prices);
  saveJson(storageKeys.prices, prices);
  showToast("Hizmet ve paket fiyatları güncellendi.");
});

specialPriceForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = new FormData(specialPriceForm);
  const price = {
    customerName: String(data.get("customerName") || "").trim(),
    serviceName: String(data.get("serviceName") || "").trim(),
    amount: numberFromForm(data, "specialAmount"),
    note: String(data.get("specialNote") || "").trim(),
  };

  try {
    await apiRequest("/api/special-prices", {
      method: "POST",
      body: JSON.stringify(price),
    });
    await refreshSpecialPricesFromApi({ silent: true });
    specialPriceForm.reset();
    showToast("Müşteriye özel fiyat veritabanına kaydedildi.");
    return;
  } catch {
    showToast("API kapalı. Özel fiyat demo hafızasına kaydediliyor.");
  }

  const prices = readJson(storageKeys.specialPrices) || [...seedSpecialPrices];
  prices.unshift(price);

  saveJson(storageKeys.specialPrices, prices);
  renderSpecialPrices(prices);
  specialPriceForm.reset();
  showToast("Müşteriye özel fiyat kaydedildi.");
});

ownerStaffForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = new FormData(ownerStaffForm);
  const person = {
    name: String(data.get("staffName") || "").trim(),
    role: String(data.get("staffRole") || "Usta"),
    shift: String(data.get("staffShift") || "").trim(),
    status: String(data.get("staffStatus") || "Aktif"),
  };

  try {
    await apiRequest("/api/staff", {
      method: "POST",
      body: JSON.stringify(person),
    });
    await refreshStaffFromApi({ silent: true });
    ownerStaffForm.reset();
    showToast("Çalışan veritabanına eklendi.");
    return;
  } catch {
    showToast("API kapalı. Çalışan demo hafızasına ekleniyor.");
  }

  const staff = readJson(storageKeys.staff) || [...seedStaff];
  staff.push(person);

  saveJson(storageKeys.staff, staff);
  renderEditableStaff(staff);
  ownerStaffForm.reset();
  showToast("Çalışan ve vardiya listesi güncellendi.");
});

staffFinanceForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = new FormData(staffFinanceForm);
  const staffId = Number(data.get("financeStaff") || 0);
  const movementType = String(data.get("financeType") || "advance");
  const amount = numberFromForm(data, "financeAmount");
  const note = String(data.get("financeNote") || "").trim();

  try {
    await apiRequest(`/api/staff/${staffId}/account-movements`, {
      method: "POST",
      body: JSON.stringify({ movementType, amount, note }),
    });
    await refreshStaffFinanceFromApi({ silent: true });
    staffFinanceForm.reset();
    showToast("Personel hesap hareketi veritabanına işlendi.");
    return;
  } catch {
    showToast("API kapalı. Personel hesap hareketi demo hafızasında gösteriliyor.");
  }

  const financeRows = readJson(storageKeys.staffFinance) || [...seedStaffFinance];
  const financeRow = financeRows.find((row) => Number(row.id) === staffId);
  if (financeRow) {
    if (movementType === "payment") {
      financeRow.paidAmount = Number(financeRow.paidAmount || 0) + amount;
      financeRow.remainingAmount = Number(financeRow.remainingAmount || 0) - amount;
    } else if (movementType === "bonus" || movementType === "salary_adjustment") {
      financeRow.earnedAmount = Number(financeRow.earnedAmount || 0) + amount;
      financeRow.remainingAmount = Number(financeRow.remainingAmount || 0) + amount;
    } else {
      financeRow.advanceDebt = Number(financeRow.advanceDebt || 0) + amount;
      financeRow.remainingAmount = Number(financeRow.remainingAmount || 0) - amount;
    }
  }

  saveJson(storageKeys.staffFinance, financeRows);
  renderStaffFinance(financeRows);
  staffFinanceForm.reset();
});

checkoutForm.addEventListener("input", renderSplitPreview);
checkoutForm.elements.namedItem("checkoutCustomer").addEventListener("change", applySpecialPriceAmount);
checkoutForm.elements.namedItem("checkoutService").addEventListener("change", applySpecialPriceAmount);

checkoutForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = new FormData(checkoutForm);
  const customerName = String(data.get("checkoutCustomer") || "").trim();
  const serviceName = String(data.get("checkoutService") || "").trim();
  const paymentType = String(data.get("paymentType") || "Ödeme");
  const masterType = String(data.get("master") || "employee");
  const amount = numberFromForm(data, "amount");
  const specialPrice = findSpecialPrice(customerName, serviceName);
  renderSplitPreview();

  try {
    const result = await apiRequest("/api/payments/checkout", {
      method: "POST",
      body: JSON.stringify({
        customerName,
        serviceName,
        paymentType,
        masterType,
        amount,
      }),
    });
    showToast(
      `${formatCurrency(result.amount)} ${paymentType.toLocaleLowerCase("tr-TR")} ile kasaya geçti. Usta payı ${formatCurrency(result.staffShare)}.`
    );
    await refreshStaffFinanceFromApi({ silent: true });
    await refreshCashDetailsFromApi({ silent: true });
    await refreshFloorStatusFromApi({ silent: true });
    await refreshMemberCardsFromApi({ silent: true });
    await refreshServiceBreakdownFromApi({ silent: true });
    return;
  } catch {
    showToast("API kapalı. Ödeme demo akışında gösteriliyor.");
  }

  const split = calculateSplit(masterType, amount);
  const cashDetails = normalizeCashDetails(readJson(storageKeys.cashDetails) || seedCashDetails);
  cashDetails.grossAmount += amount;
  cashDetails.paymentCount += 1;
  cashDetails.averageTicket = Math.round(cashDetails.grossAmount / cashDetails.paymentCount);
  cashDetails.staffShares += split.masterShare;
  cashDetails.netAmount += split.houseShare;
  if (paymentType.toLocaleLowerCase("tr-TR").includes("kart")) cashDetails.totals.card += amount;
  else if (paymentType.toLocaleLowerCase("tr-TR").includes("nakit")) cashDetails.totals.cash += amount;
  else cashDetails.totals.online += amount;
  cashDetails.movements.unshift({
    paidAt: new Date().toISOString(),
    customerName,
    serviceName,
    paymentType,
    staffShare: split.masterShare,
    businessShare: split.houseShare,
  });
  saveJson(storageKeys.cashDetails, cashDetails);
  renderCashDetails(cashDetails);
  const serviceBreakdown = normalizeServiceBreakdown(readJson(storageKeys.serviceBreakdown) || seedServiceBreakdown);
  const normalizedServiceName = serviceName.toLocaleLowerCase("tr-TR");
  if (normalizedServiceName.includes("saç")) serviceBreakdown.haircut += 1;
  if (normalizedServiceName.includes("sakal")) serviceBreakdown.beard += 1;
  if (normalizedServiceName.includes("manikür")) serviceBreakdown.manicure += 1;
  if (normalizedServiceName.includes("pedikür")) serviceBreakdown.pedicure += 1;
  saveJson(storageKeys.serviceBreakdown, serviceBreakdown);
  renderServiceBreakdown(serviceBreakdown);
  const floorStatus = normalizeFloorStatus(readJson(storageKeys.floorStatus) || seedFloorStatus);
  floorStatus.completed += 1;
  floorStatus.openPayment = Math.max(floorStatus.openPayment - 1, 0);
  saveJson(storageKeys.floorStatus, floorStatus);
  renderFloorStatus(floorStatus);

  const priceNote = specialPrice ? " Özel fiyat kaydıyla eşleşti." : "";
  showToast(`${formatCurrency(amount)} ${paymentType.toLocaleLowerCase("tr-TR")} ile kasaya geçti.${priceNote}`);
});

editableStaffList.addEventListener("click", async (event) => {
  const button = event.target.closest("[data-remove-staff]");
  if (!button) return;

  const index = Number(button.dataset.removeStaff);
  const staffId = Number(button.dataset.staffId || 0);
  const staff = readJson(storageKeys.staff) || [...seedStaff];

  if (staffId) {
    try {
      await apiRequest(`/api/staff/${staffId}`, { method: "DELETE" });
      await refreshStaffFromApi({ silent: true });
      showToast("Çalışan veritabanında pasife alındı.");
      return;
    } catch {
      showToast("API kapalı. Çalışan demo hafızasından kaldırılıyor.");
    }
  }

  staff.splice(index, 1);
  saveJson(storageKeys.staff, staff);
  renderEditableStaff(staff);
  showToast("Çalışan listeden kaldırıldı.");
});

editablePriceList.addEventListener("click", async (event) => {
  const button = event.target.closest("[data-remove-special-price]");
  if (!button) return;

  const index = Number(button.dataset.removeSpecialPrice);
  const specialPriceId = Number(button.dataset.specialPriceId || 0);
  const prices = readJson(storageKeys.specialPrices) || [...seedSpecialPrices];

  if (specialPriceId) {
    try {
      await apiRequest(`/api/special-prices/${specialPriceId}`, { method: "DELETE" });
      await refreshSpecialPricesFromApi({ silent: true });
      showToast("Özel fiyat veritabanında pasife alındı.");
      return;
    } catch {
      showToast("API kapalı. Özel fiyat demo hafızasından kaldırılıyor.");
    }
  }

  prices.splice(index, 1);
  saveJson(storageKeys.specialPrices, prices);
  renderSpecialPrices(prices);
  showToast("Özel fiyat kaldırıldı.");
});

stockItemForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = new FormData(stockItemForm);
  const item = {
    name: String(data.get("stockName") || "").trim(),
    quantity: numberFromForm(data, "stockQuantity"),
    unit: String(data.get("stockUnit") || "adet").trim(),
    minimumQuantity: 5,
    status: String(data.get("stockStatus") || "Güvenli"),
  };

  try {
    await apiRequest("/api/stock", {
      method: "POST",
      body: JSON.stringify(item),
    });
    await refreshStockFromApi({ silent: true });
    showToast("Malzeme veritabanına eklendi.");
  } catch {
    const stock = readJson(storageKeys.stock) || [...seedStock];
    stock.unshift(item);
    saveJson(storageKeys.stock, stock);
    renderStock(stock);
    showToast("API kapalı. Malzeme demo hafızasına eklendi.");
  }

  stockItemForm.reset();
});

stockMovementForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = new FormData(stockMovementForm);
  const stock = readJson(storageKeys.stock) || [...seedStock];
  const movements = readJson(storageKeys.stockMovements) || [...seedStockMovements];
  const name = String(data.get("movementStock") || "");
  const type = String(data.get("movementType") || "out");
  const quantity = numberFromForm(data, "movementQuantity");
  const item = stock.find((stockItem) => stockItem.name === name);
  const note = String(data.get("movementNote") || "").trim();

  if (item?.id) {
    try {
      await apiRequest(`/api/stock/${item.id}/movements`, {
        method: "POST",
        body: JSON.stringify({
          movementType: type,
          quantity,
          note,
        }),
      });
      await refreshStockFromApi({ silent: true });
      stockMovementForm.reset();
      showToast("Stok hareketi veritabanına işlendi.");
      return;
    } catch {
      showToast("API kapalı. Hareket demo hafızasına işleniyor.");
    }
  }

  if (item) {
    item.quantity = type === "in" ? Number(item.quantity) + quantity : Math.max(Number(item.quantity) - quantity, 0);
    if (item.quantity <= 5) item.status = "Kritik";
    else if (item.quantity <= 10) item.status = "Azalıyor";
    else item.status = "Güvenli";
  }

  movements.unshift({
    name,
    type,
    quantity,
    note,
  });

  saveJson(storageKeys.stock, stock);
  saveJson(storageKeys.stockMovements, movements);
  renderStock(stock);
  renderStockMovements(movements);
  stockMovementForm.reset();
  showToast("Stok hareketi işlendi ve malzeme miktarı güncellendi.");
});

editableStockList.addEventListener("click", async (event) => {
  const button = event.target.closest("[data-remove-stock]");
  if (!button) return;

  const index = Number(button.dataset.removeStock);
  const stockId = Number(button.dataset.stockId || 0);
  const stock = readJson(storageKeys.stock) || [...seedStock];

  if (stockId) {
    try {
      await apiRequest(`/api/stock/${stockId}`, { method: "DELETE" });
      await refreshStockFromApi({ silent: true });
      showToast("Malzeme veritabanında pasife alındı.");
      return;
    } catch {
      showToast("API kapalı. Malzeme demo hafızasından kaldırılıyor.");
    }
  }

  stock.splice(index, 1);
  saveJson(storageKeys.stock, stock);
  renderStock(stock);
  showToast("Malzeme stok listesinden kaldırıldı.");
});

const savedMetrics = readJson(storageKeys.metrics);
if (savedMetrics) applyMetrics(savedMetrics, true);

const savedPrices = readJson(storageKeys.prices);
if (savedPrices) applyPrices(savedPrices, true);
refreshPricesFromApi({ silent: true });

const savedStaff = readJson(storageKeys.staff) || [...seedStaff];
renderEditableStaff(savedStaff);
refreshStaffFromApi({ silent: true });

const savedStaffFinance = readJson(storageKeys.staffFinance) || [...seedStaffFinance];
renderStaffFinance(savedStaffFinance);
refreshStaffFinanceFromApi({ silent: true });

const savedDemoUsers = readJson(storageKeys.demoUsers) || [...seedDemoUsers];
renderDemoUsers(savedDemoUsers);
const savedDemoUser = readJson(storageKeys.activeDemoUser) || savedDemoUsers[0];
applyDemoUser(savedDemoUser, false);
const savedSession = readJson(storageKeys.activeSession);
updateLoginSessionState(
  savedSession?.user?.name
    ? `${savedSession.user.name} için canlı oturum açık.`
    : "Canlı API açıksa seçilen kullanıcı sunucudan doğrulanır."
);
refreshDemoUsersFromApi({ silent: true }).then((users) => {
  const activeUser = readJson(storageKeys.activeDemoUser) || users[0];
  const matchingUser = users.find((user) => user.id === activeUser.id) || activeUser;
  applyDemoUser(matchingUser, false);
});

state.applications = readJson(storageKeys.applications) || [...seedApplications];
renderQueue();
refreshApplicationsFromApi({ silent: true });

const savedSpecialPrices = readJson(storageKeys.specialPrices) || [...seedSpecialPrices];
renderSpecialPrices(savedSpecialPrices);
refreshSpecialPricesFromApi({ silent: true });

const savedStock = readJson(storageKeys.stock) || [...seedStock];
renderStock(savedStock);

const savedStockMovements = readJson(storageKeys.stockMovements) || [...seedStockMovements];
renderStockMovements(savedStockMovements);
refreshStockFromApi({ silent: true });

const savedCashDetails = readJson(storageKeys.cashDetails) || seedCashDetails;
renderCashDetails(savedCashDetails);
refreshCashDetailsFromApi({ silent: true });

const savedSessions = readJson(storageKeys.sessions) || [...seedSessions];
renderSessions(savedSessions);
refreshSessionsFromApi({ silent: true });

const savedCalendar = readJson(storageKeys.calendar) || seedCalendar;
renderCalendar(savedCalendar);
refreshCalendarFromApi({ silent: true });

const savedCapacity = readJson(storageKeys.capacity) || seedCapacity;
renderCapacity(savedCapacity);
refreshCapacityFromApi({ silent: true });

const savedExceptions = readJson(storageKeys.exceptions) || seedExceptions;
renderExceptions(savedExceptions);
refreshExceptionsFromApi({ silent: true });

const savedFloorStatus = readJson(storageKeys.floorStatus) || seedFloorStatus;
renderFloorStatus(savedFloorStatus);
refreshFloorStatusFromApi({ silent: true });

const savedMemberCards = readJson(storageKeys.memberCards) || [...seedMemberCards];
renderMemberCards(savedMemberCards);
refreshMemberCardsFromApi({ silent: true });

const savedServiceBreakdown = readJson(storageKeys.serviceBreakdown) || seedServiceBreakdown;
renderServiceBreakdown(savedServiceBreakdown);
refreshServiceBreakdownFromApi({ silent: true });

renderSplitPreview();
