document.addEventListener("DOMContentLoaded", function () {

  /* ===================== LOADING SCREEN ===================== */
  const loader = document.getElementById("loading-overlay");
  setTimeout(() => {
    loader.style.opacity = "0";
    loader.style.pointerEvents = "none";
  }, 1200);

  /* ===================== HAMBURGER MENU ===================== */
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");

  hamburger.addEventListener("click", function () {
    const isOpen = navMenu.style.display === "flex";
    navMenu.style.display = isOpen ? "none" : "flex";
    hamburger.setAttribute("aria-expanded", String(!isOpen));
  });

  /* ===================== DARK MODE ===================== */
  const darkBtn = document.getElementById("dark-mode-toggle");

  if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark");
    darkBtn.innerHTML = "☀️";
  }

  darkBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
      localStorage.setItem("darkMode", "enabled");
      darkBtn.innerHTML = "☀️";
    } else {
      localStorage.setItem("darkMode", "disabled");
      darkBtn.innerHTML = "🌙";
    }
  });

  /* ===================== STATS COUNTER ANIMATION ===================== */
  const stats = document.querySelectorAll(".stat-number");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseFloat(el.dataset.target);
          let current = 0;

          const increment = target / 80;

          const interval = setInterval(() => {
            current += increment;
            if (current >= target) {
              el.textContent = target;
              clearInterval(interval);
            } else {
              el.textContent = current.toFixed(1);
            }
          }, 30);

          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.4 }
  );

  stats.forEach((stat) => observer.observe(stat));

  /* ===================== FAQ TOGGLE ===================== */
  document.querySelectorAll(".faq-question").forEach((question) => {
    question.addEventListener("click", function () {
      const answer = this.nextElementSibling;
      const toggle = this.querySelector(".faq-toggle");

      if (answer.style.display === "block") {
        answer.style.display = "none";
        toggle.textContent = "+";
      } else {
        answer.style.display = "block";
        toggle.textContent = "−";
      }
    });
  });

  /* ===================== QUIZ LOGIC ===================== */
  let score = 0;
  const resultText = document.getElementById("result-text");
  const clearBtn = document.getElementById("quiz-clear-btn");

  document.querySelectorAll(".quiz-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      score += parseInt(this.dataset.score);

      if (score <= 2) {
        resultText.textContent =
          "Your stress level seems manageable. Keep practicing self-care!";
      } else if (score <= 4) {
        resultText.textContent =
          "You may be experiencing moderate stress. Consider talking to someone.";
      } else {
        resultText.textContent =
          "Your stress appears high. Booking a session could really help.";
      }
    });
  });

  clearBtn.addEventListener("click", () => {
    score = 0;
    resultText.textContent = "";
  });

  /* ===================== BOOKING FORM → GOOGLE FORM ===================== */
  const bookingForm = document.getElementById("booking-form");

  bookingForm.addEventListener("submit", function (event) {
    event.preventDefault();

    alert("You will be redirected to the official booking form.");

    window.open(
      "https://docs.google.com/forms/d/e/1FAIpQLSeTWz1URM54iSWw3kKXwvisagfBJpIfHpCQQnXjcElD3y7khA/viewform?usp=header",
      "_blank"
    );
  });

  /* ===================== NEWSLETTER FORM ===================== */
  const newsletterForm = document.getElementById("newsletter-form");

  newsletterForm.addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Thanks for subscribing! (Demo only — no backend connected yet)");
    newsletterForm.reset();
  });

});
