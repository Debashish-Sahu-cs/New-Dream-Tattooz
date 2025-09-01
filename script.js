// Mobile Nav Toggle
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const gallerybtn = document.querySelector(".cart-btn");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("hide");
});
navLinks.addEventListener("click", () => {
  navLinks.classList.toggle("hide");
});

gallerybtn.addEventListener("click", () => {
  window.location.href = "gallery.html";
});

if (navLinks.classList.toggle("hide") == false) {
  navLinks.style.width = "100%";
}
const typingText = Typify("#typify-text", {
  text: ["Workshop", "Institute"],
  delay: 100,
  loop: true,
  cursor: true,
  stringDelay: 1000,
});


