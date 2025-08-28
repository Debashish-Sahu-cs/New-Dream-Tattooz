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

// Auto-scroll Feedback
const feedbackContainer = document.querySelector(".feedback-carousel");
const form = document.getElementById("feedbackForm");
const reviewButton = document.getElementById("revbtn");
const input = document.getElementById("feedbackInput");
const starsSelect = document.getElementById("stars");

reviewButton.addEventListener("click", () => {
  if (form.style.display === "block") {
    form.style.display = "none";
  } else {
    form.style.display = "block";
  }
});

let scrollAmount = 0;
let scrollInterval;
let feedbacks = [];

// Load feedbacks from backend
async function loadFeedbacks() {
  const res = await fetch("get_feedbacks.php");
  feedbacks = await res.json();
  renderFeedbacks();
}

function renderFeedbacks() {
  feedbackContainer.innerHTML = "";

  feedbacks.forEach((fb) => {
    const card = document.createElement("div");
    card.className = "feedback-card";

    const p = document.createElement("p");
    p.textContent = `“${fb.message}”`;
    p.style.maxWidth = "300px";

    const stars = document.createElement("div");
    stars.className = "stars";
    stars.textContent = "★".repeat(fb.stars) + "☆".repeat(5 - fb.stars);

    card.appendChild(p);
    card.appendChild(stars);
    feedbackContainer.appendChild(card);
  });
}

// Auto scroll function
function autoScrollFeedback() {
  if (!feedbackContainer) return;
  scrollAmount += 1;
  if (
    scrollAmount >
    feedbackContainer.scrollWidth - feedbackContainer.clientWidth
  ) {
    scrollAmount = 0;
  }
  feedbackContainer.scrollTo({ left: scrollAmount, behavior: "smooth" });
}

function startAutoScroll() {
  if (!scrollInterval) {
    scrollInterval = setInterval(autoScrollFeedback, 10);
  }
}

function stopAutoScroll() {
  clearInterval(scrollInterval);
  scrollInterval = null;
}

// Feedback form submit
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const message = input.value.trim();
  const stars = parseInt(starsSelect.value);

  if (message) {
    await fetch("submit_feedback.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, stars }),
    });
    input.value = "";
    starsSelect.value = "5";
    const res = await fetch("get_feedbacks.php");
    feedbacks = await res.json();
    console.log(feedbacks);
  }
});

// Start
loadFeedbacks();
startAutoScroll();
feedbackContainer.addEventListener("mouseenter", stopAutoScroll);
feedbackContainer.addEventListener("mouseleave", startAutoScroll);
