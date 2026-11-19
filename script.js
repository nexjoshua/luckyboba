/* ===== MENU DATA (edit names/descriptions/prices freely) ===== */
const MENU = {
  milktea: [
    { name: "Wintermelon Milk Tea", desc: "With rock salt & cheese foam", drink: "#d9b48a", top: "#fff6e4", tag: "Best Seller" },
    { name: "Belgian Chocolate Milk Tea", desc: "Rich chocolate + cheesecake", drink: "#6b3f2a", top: "#f5e6d3" },
    { name: "Cookies & Cream Milk Tea", desc: "Oreo crumble + cheesecake", drink: "#8d7f78", top: "#ffffff", tag: "Most Ordered" },
    { name: "Okinawa Milk Tea", desc: "Roasted brown sugar notes", drink: "#a8754d", top: "#f3e3cf" },
    { name: "Brown Sugar Boba Milk", desc: "Tiger stripes + cocoa top", drink: "#b07a4c", top: "#fff1d6", tag: "Lucky Pick" },
    { name: "Blueberry Milk Tea", desc: "Fruity & creamy", drink: "#8e7cc3", top: "#efe8ff" }
  ],
  fruit: [
    { name: "Strawberry Fruit Tea", desc: "With popping boba", drink: "#e2475a", top: "#ffd1d6", pearls: 0, tag: "Refreshing" },
    { name: "Cucumber Lemon Tea", desc: "Cool, crisp & zesty", drink: "#f2b33d", top: "#fff3cf", pearls: 0 },
    { name: "Kiwi Green Tea", desc: "Tangy kiwi bits", drink: "#a4c94a", top: "#f2ffd8", pearls: 0 },
    { name: "Mango Fruit Tea", desc: "Sweet tropical mango", drink: "#ffa62b", top: "#ffeccc", pearls: 0 }
  ],
  coffee: [
    { name: "Iced Spanish Latte", desc: "Creamy & sweet", drink: "#c49a6c", top: "#f7ead9", pearls: 0 },
    { name: "Caramel Macchiato", desc: "Caramel drizzle on top", drink: "#a8703f", top: "#ffe7c2", pearls: 0, tag: "New" },
    { name: "Mocha Boba", desc: "Coffee + chocolate + pearls", drink: "#5e3a26", top: "#ead7c3" }
  ],
  bites: [
    { name: "Belgian Waffle", desc: "With cream & berry sauce", emoji: "🧇" },
    { name: "Pepperoni Pizza", desc: "Personal-size & cheesy", emoji: "🍕" },
    { name: "Choco Butternut Donut", desc: "Classic sweet treat", emoji: "🍩" },
    { name: "Chicken Wings", desc: "Perfect with your boba", emoji: "🍗" }
  ]
};

/* ===== STORES (add more branches here) ===== */
const STORES = [
  { name: "Castillo, Padre Garcia", type: "Bubble Tea Café", address: "Brgy. Castillo, Padre Garcia, Batangas", img: "images/castillo.jpg" },
  { name: "Crossroad Park", type: "Food Truck", address: "Ground Floor, Crossroad Park, Tandang Sora, Sangandaan, Quezon City", img: "images/crossroad.jpg" },
  { name: "Pamana Medical Center", type: "Café", address: "Pamana Medical Center", img: "images/pamana.jpg" }
];

/* ===== HELPERS ===== */
const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];

/* ===== HEADER / NAV ===== */
const header = $("#header");
const toTop = $("#toTop");
window.addEventListener("scroll", () => {
  const y = window.scrollY;
  header.classList.toggle("scrolled", y > 40);
  toTop.classList.toggle("show", y > 600);
});

const burger = $("#burger");
const navLinks = $("#navLinks");
burger.addEventListener("click", () => {
  burger.classList.toggle("open");
  navLinks.classList.toggle("open");
});
$$("#navLinks a").forEach(a => a.addEventListener("click", () => {
  burger.classList.remove("open");
  navLinks.classList.remove("open");
}));

/* ===== MENU RENDER ===== */
const menuGrid = $("#menuGrid");
function cupHTML(item, big = false) {
  if (item.emoji) return `<div class="bite">${item.emoji}</div>`;
  return `<div class="cup ${big ? "big" : ""}" style="--drink:${item.drink};--top:${item.top};--pearls:${item.pearls ?? 1}"></div>`;
}
function renderMenu(cat) {
  menuGrid.innerHTML = MENU[cat].map((item, i) => `
    <article class="menu-card" style="animation-delay:${i * 0.07}s">
      ${item.tag ? `<span class="tag">${item.tag}</span>` : ""}
      <div class="cup-wrap">${cupHTML(item)}</div>
      <h4>${item.name}</h4>
      <p>${item.desc}</p>
    </article>`).join("");
}
$$(".tab").forEach(tab => tab.addEventListener("click", () => {
  $$(".tab").forEach(t => t.classList.remove("active"));
  tab.classList.add("active");
  renderMenu(tab.dataset.cat);
}));
renderMenu("milktea");

/* ===== I'M FEELING LUCKY ===== */
const drinks = [...MENU.milktea, ...MENU.fruit, ...MENU.coffee];
const luckyCup = $("#luckyCup");
const luckyName = $("#luckyName");
$("#luckyBtn").addEventListener("click", () => {
  let spins = 0;
  const timer = setInterval(() => {
    const d = drinks[Math.floor(Math.random() * drinks.length)];
    luckyCup.style.setProperty("--drink", d.drink);
    luckyCup.style.setProperty("--top", d.top);
    luckyCup.style.setProperty("--pearls", d.pearls ?? 1);
    luckyName.textContent = d.name;
    if (++spins > 12) {
      clearInterval(timer);
      luckyName.textContent = `🍀 ${d.name}!`;
      luckyCup.classList.remove("shake");
      void luckyCup.offsetWidth;
      luckyCup.classList.add("shake");
    }
  }, 90);
});

/* ===== STORES ===== */
const storeGrid = $("#storeGrid");
const noStore = $("#noStore");
function renderStores(list) {
  storeGrid.innerHTML = list.map(s => `
    <article class="store-card">
      <img src="${s.img}" alt="Lucky Boba ${s.name}" loading="lazy" />
      <div class="store-body">
        <span class="type">${s.type}</span>
        <h4>Lucky Boba – ${s.name}</h4>
        <p>📍 ${s.address}</p>
        <a href="https://www.google.com/maps/search/${encodeURIComponent("Lucky Boba Milk Tea " + s.name)}" target="_blank" rel="noopener">Get directions →</a>
      </div>
    </article>`).join("");
  noStore.style.display = list.length ? "none" : "block";
}
$("#storeSearch").addEventListener("input", e => {
  const q = e.target.value.toLowerCase().trim();
  renderStores(STORES.filter(s => (s.name + s.address + s.type).toLowerCase().includes(q)));
});
renderStores(STORES);

/* ===== FAQ ===== */
$$(".faq-item").forEach(item => {
  $(".faq-q", item).addEventListener("click", () => {
    const open = item.classList.toggle("open");
    const a = $(".faq-a", item);
    a.style.maxHeight = open ? a.scrollHeight + "px" : 0;
  });
});

/* ===== FRANCHISE FORM (opens email app; swap for a backend/Formspree later) ===== */
$("#franchiseForm").addEventListener("submit", e => {
  e.preventDefault();
  const f = new FormData(e.target);
  const body = [
    `Name: ${f.get("name")}`, `Phone: ${f.get("phone")}`, `Email: ${f.get("email")}`,
    `Location: ${f.get("location")}`, `Format: ${f.get("format")}`, ``, f.get("message") || ""
  ].join("\n");
  window.location.href = `mailto:luckybobapurchasing@gmail.com?subject=${encodeURIComponent("Franchise Inquiry – " + f.get("name"))}&body=${encodeURIComponent(body)}`;
  $("#formNote").textContent = "Thanks! Your email app is opening. We'll get back to you soon 🍀";
  e.target.reset();
});

/* ===== SCROLL REVEAL ===== */
const io = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) { en.target.classList.add("visible"); io.unobserve(en.target); }
  });
}, { threshold: 0.15 });
$$(".reveal").forEach(el => io.observe(el));

/* ===== COUNTERS ===== */
const counterIO = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (!en.isIntersecting) return;
    const el = en.target, target = +el.dataset.target;
    let cur = 0;
    const step = Math.max(1, Math.ceil(target / 60));
    const t = setInterval(() => {
      cur = Math.min(target, cur + step);
      el.textContent = cur;
      if (cur === target) clearInterval(t);
    }, 25);
    counterIO.unobserve(el);
  });
});
$$(".count").forEach(c => counterIO.observe(c));

/* ===== YEAR ===== */
$("#year").textContent = new Date().getFullYear();
/* ===== HERO VIDEO: respect reduced motion ===== */
const heroVideo = $("#heroVideo");
if (heroVideo && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  heroVideo.pause();
}