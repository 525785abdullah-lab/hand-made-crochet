// A Little Tangled Co: script.js

/* ==========================================================
   EDIT YOUR DETAILS HERE
   - CONTACT: who takes orders and their number.
     "whatsapp" is the number with the country code and no zero
     or plus sign (03400759636 becomes 923400759636 for Pakistan).
   - PRODUCTS: one entry per item. Put photos in the images folder.
   ========================================================== */

const CONTACT = {
  name: "Abdullah",
  phone: "03400759636",
  whatsapp: "923400759636",
};

const PRODUCTS = [
  { name: "Rose crochet purse",         price: "Rs. 4,500", image: "images/round-purse.jpg" },
  { name: "Sunflower baby shoes set",   price: "Rs. 1,600", image: "images/baby-set.jpg" },
  { name: "Black tote with red rose",   price: "Rs. 400",   image: "images/tote-black.jpg" },
  { name: "Cream tote with flower",     price: "Rs. 400",   image: "images/tote-cream.jpg" },
  { name: "Pink tote with flower",      price: "Rs. 400",   image: "images/tote-pink.jpg" },
  { name: "Rose bouquet keychain",      price: "Rs. 400",   image: "images/rose-keychain.jpg" },
  { name: "Crochet hair clips",         price: "Message for price", image: "images/hair-clips.jpg" },
];

/* ---------- Mobile menu ---------- */

const nav = document.getElementById("nav");
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.querySelectorAll(".nav-link");

function setMenu(open) {
  nav.classList.toggle("open", open);
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
}

menuToggle.addEventListener("click", () => setMenu(!nav.classList.contains("open")));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenu(false);
});

document.addEventListener("click", (event) => {
  if (!nav.contains(event.target)) setMenu(false);
});

/* ---------- Build the Shop and Contact panels ---------- */

function whatsappLink(message) {
  return `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`;
}

document.getElementById("product-grid").innerHTML = PRODUCTS.map((p) => `
  <article class="product">
    <img src="${p.image}" alt="${p.name}" loading="lazy" />
    <h3 class="product-name">${p.name}</h3>
    <p class="product-price">${p.price}</p>
    <a class="product-order" href="${whatsappLink(`Hi ${CONTACT.name}, I would like to order: ${p.name}`)}" target="_blank" rel="noopener">Order</a>
  </article>
`).join("");

document.getElementById("contact-name").textContent = CONTACT.name;
document.getElementById("contact-phone").textContent = CONTACT.phone;
document.getElementById("contact-call").href = `tel:${CONTACT.phone}`;
document.getElementById("contact-whatsapp").href = whatsappLink(`Hi ${CONTACT.name}, I would like to place an order.`);

/* ---------- Open and close panels ---------- */

// Anything with data-dialog="some-id" opens that panel
document.querySelectorAll("[data-dialog]").forEach((trigger) => {
  trigger.addEventListener("click", (event) => {
    event.preventDefault();
    setMenu(false);
    document.getElementById(trigger.dataset.dialog).showModal();
  });
});

document.querySelectorAll("dialog").forEach((dialog) => {
  // close button
  dialog.querySelector("[data-close]").addEventListener("click", () => dialog.close());
  // click on the dark backdrop closes it too
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
});

/* ---------- Other links ---------- */

// Home and Blog still use href="#". Stop the page jumping to the top,
// and mark the clicked link as current. Replace the hrefs in index.html
// with real pages when you have them.
navLinks.forEach((link) => {
  if (link.dataset.dialog) return;
  link.addEventListener("click", (event) => {
    event.preventDefault();
    navLinks.forEach((l) => l.removeAttribute("aria-current"));
    link.setAttribute("aria-current", "page");
    setMenu(false);
  });
});
