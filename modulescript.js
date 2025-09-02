// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBswrTT_Z1k4M3dcPfWlpW-s7CpWABNc-8",
  authDomain: "new-dream-tattooz-feedbacks.firebaseapp.com",
  projectId: "new-dream-tattooz-feedbacks",
  storageBucket: "new-dream-tattooz-feedbacks.firebasestorage.app",
  messagingSenderId: "833279828861",
  appId: "1:833279828861:web:d34febefb560f8931ca214",
  measurementId: "G-DNFRMFGEXZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// Selectors
const feedbackContainer = document.querySelector(".feedback-carousel");
const form = document.getElementById("feedbackForm");
const reviewButton = document.getElementById("revbtn");
const input = document.getElementById("feedbackInput");
const starsSelect = document.getElementById("stars");

reviewButton.addEventListener('click', () => {
  if(form.style.display=='block'){
    form.style.display='none';
  }
  else{
    form.style.display='block';
  }
});
let scrollAmount = 0;
let scrollInterval;
let feedbacks = [];

// Load feedbacks from Firestore
async function loadFeedbacks() {
  feedbacks = [];
  const q = query(collection(db, "feedbacks"), orderBy("timestamp", "desc"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    feedbacks.push(doc.data());
  });
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

// Feedback form submit (Firestore)
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const message = input.value.trim();
  const stars = parseInt(starsSelect.value);

  if (message) {
    await addDoc(collection(db, "feedbacks"), {
      message,
      stars,
      timestamp: new Date(),
    });
    input.value = "";
    starsSelect.value = "5";
    loadFeedbacks();
  }
});

// Start
loadFeedbacks();
startAutoScroll();
feedbackContainer.addEventListener("mouseenter", stopAutoScroll);
feedbackContainer.addEventListener("mouseleave", startAutoScroll);

feedbackContainer.addEventListener("touchstart", stopAutoScroll);
feedbackContainer.addEventListener("touchend", startAutoScroll);
