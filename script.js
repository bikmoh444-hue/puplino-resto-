const phoneNumber = "212667379732";

// Easy to edit: update names, descriptions, prices, or categories here.
const menuItems = [
  { category: "Entrées", name: "Salade marocaine", description: "Tomates, oignons, concombre, herbes fraîches.", price: 35 },
  { category: "Entrées", name: "Soupe de poisson", description: "Bouillon parfumé, poisson blanc et épices douces.", price: 45 },
  { category: "Entrées", name: "Briouates aux crevettes", description: "Feuilles croustillantes, crevettes et fromage frais.", price: 55 },
  { category: "Fruits de mer", name: "Plateau Pulpino", description: "Assortiment de crevettes, calamars, poisson et poulpe.", price: 180 },
  { category: "Fruits de mer", name: "Crevettes pil-pil", description: "Sauce tomate relevée, ail, paprika et coriandre.", price: 95 },
  { category: "Fruits de mer", name: "Calamars frits", description: "Calamars dorés, citron et sauce maison.", price: 85 },
  { category: "Grillades", name: "Poisson grillé du jour", description: "Selon arrivage, accompagné de légumes et riz.", price: 130 },
  { category: "Grillades", name: "Brochettes de crevettes", description: "Marinade citronnée, grillées à la minute.", price: 115 },
  { category: "Grillades", name: "Poulpe grillé", description: "Poulpe tendre, huile d'olive et herbes fraîches.", price: 140 },
  { category: "Plats marocains", name: "Tajine de poisson", description: "Légumes, olives, citron confit et chermoula.", price: 120 },
  { category: "Plats marocains", name: "Pastilla fruits de mer", description: "Feuilletage croustillant, fruits de mer et vermicelles.", price: 125 },
  { category: "Plats marocains", name: "Paella marocaine", description: "Riz safrané, fruits de mer et épices locales.", price: 135 },
  { category: "Jus naturels", name: "Jus d'orange frais", description: "Oranges pressées à la commande.", price: 25 },
  { category: "Jus naturels", name: "Jus avocat fruits secs", description: "Avocat, lait, dattes et fruits secs.", price: 35 },
  { category: "Jus naturels", name: "Cocktail Pulpino", description: "Mélange fruité maison selon saison.", price: 38 },
  { category: "Desserts", name: "Orange à la cannelle", description: "Dessert léger, frais et parfumé.", price: 28 },
  { category: "Desserts", name: "Crème caramel", description: "Classique doux et fondant.", price: 32 },
  { category: "Desserts", name: "Pâtisserie marocaine", description: "Sélection du jour avec thé ou café.", price: 40 }
];

const testimonials = [
  { name: "Samira B.", text: "Très belle découverte à Tanger. Les fruits de mer étaient frais, bien assaisonnés et le service attentionné." },
  { name: "Youssef A.", text: "La pastilla aux fruits de mer est excellente. Ambiance chaleureuse et plats généreux." },
  { name: "Nadia L.", text: "Poisson grillé parfait, jus naturels très frais. Une adresse que je recommande." },
  { name: "Karim M.", text: "Cuisine marocaine savoureuse avec une belle touche marine. Rapport qualité-prix très correct." },
  { name: "Claire D.", text: "Accueil professionnel, plats bien présentés et belle expérience après une balade à Tanger." }
];

const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelectorAll(".nav-links a");
const menuTabs = document.querySelector(".menu-tabs");
const menuList = document.querySelector(".menu-list");
const testimonialTrack = document.querySelector(".testimonial-track");
const reservationForm = document.querySelector("#reservationForm");
const lightbox = document.querySelector(".lightbox");
const lightboxImage = document.querySelector(".lightbox img");
const lightboxClose = document.querySelector(".lightbox-close");

function setHeaderState() {
  header.classList.toggle("scrolled", window.scrollY > 20);
  document.documentElement.style.setProperty("--parallax", `${window.scrollY * 0.08}px`);
}

window.addEventListener("scroll", setHeaderState, { passive: true });
setHeaderState();

navToggle.addEventListener("click", () => {
  const isOpen = header.classList.toggle("menu-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    header.classList.remove("menu-open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

const categories = [...new Set(menuItems.map((item) => item.category))];
let activeCategory = categories[0];

function renderMenuTabs() {
  menuTabs.innerHTML = categories.map((category) => (
    `<button type="button" class="${category === activeCategory ? "active" : ""}" data-category="${category}" role="tab" aria-selected="${category === activeCategory}">${category}</button>`
  )).join("");
}

function renderMenuItems() {
  const filteredItems = menuItems.filter((item) => item.category === activeCategory);
  menuList.innerHTML = filteredItems.map((item) => (
    `<article class="menu-item">
      <div>
        <h3>${item.name}</h3>
        <p>${item.description}</p>
      </div>
      <span class="price">${item.price} MAD</span>
    </article>`
  )).join("");
}

menuTabs.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-category]");
  if (!button) return;
  activeCategory = button.dataset.category;
  renderMenuTabs();
  renderMenuItems();
});

renderMenuTabs();
renderMenuItems();

let testimonialIndex = 0;
let testimonialTimer;

function renderTestimonials() {
  testimonialTrack.innerHTML = testimonials.map((item, index) => (
    `<article class="testimonial-card ${index === testimonialIndex ? "active" : ""}">
      <div class="stars" aria-label="Note 5 étoiles">
        <i class="fa-solid fa-star" aria-hidden="true"></i>
        <i class="fa-solid fa-star" aria-hidden="true"></i>
        <i class="fa-solid fa-star" aria-hidden="true"></i>
        <i class="fa-solid fa-star" aria-hidden="true"></i>
        <i class="fa-solid fa-star" aria-hidden="true"></i>
      </div>
      <blockquote>“${item.text}”</blockquote>
      <cite>${item.name}</cite>
    </article>`
  )).join("");
}

function showTestimonial(index) {
  testimonialIndex = (index + testimonials.length) % testimonials.length;
  renderTestimonials();
}

function startTestimonials() {
  clearInterval(testimonialTimer);
  testimonialTimer = setInterval(() => showTestimonial(testimonialIndex + 1), 5200);
}

document.querySelector(".carousel-btn.prev").addEventListener("click", () => {
  showTestimonial(testimonialIndex - 1);
  startTestimonials();
});

document.querySelector(".carousel-btn.next").addEventListener("click", () => {
  showTestimonial(testimonialIndex + 1);
  startTestimonials();
});

let touchStartX = 0;
testimonialTrack.addEventListener("touchstart", (event) => {
  touchStartX = event.changedTouches[0].clientX;
}, { passive: true });

testimonialTrack.addEventListener("touchend", (event) => {
  const diff = event.changedTouches[0].clientX - touchStartX;
  if (Math.abs(diff) < 45) return;
  showTestimonial(diff < 0 ? testimonialIndex + 1 : testimonialIndex - 1);
  startTestimonials();
}, { passive: true });

renderTestimonials();
startTestimonials();

reservationForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(reservationForm);
  const message = [
    "Bonjour Pulpino Restaurant, je souhaite réserver une table.",
    `Nom: ${data.get("name")}`,
    `Téléphone: ${data.get("phone")}`,
    `Date: ${data.get("date")}`,
    `Heure: ${data.get("time")}`,
    `Nombre de personnes: ${data.get("guests")}`,
    `Message: ${data.get("message") || "Aucun"}`
  ].join("\n");
  window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener");
});

document.querySelectorAll(".gallery-item").forEach((button) => {
  button.addEventListener("click", () => {
    const image = button.querySelector("img");
    lightboxImage.src = button.dataset.full;
    lightboxImage.alt = image.alt;
    lightbox.hidden = false;
    lightboxClose.focus();
  });
});

function closeLightbox() {
  lightbox.hidden = true;
  lightboxImage.src = "";
}

lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !lightbox.hidden) closeLightbox();
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.16 });

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

document.querySelectorAll(".language-toggle button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".language-toggle button").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    document.documentElement.lang = button.dataset.lang;
    document.body.dir = button.dataset.lang === "ar" ? "rtl" : "ltr";
  });
});
