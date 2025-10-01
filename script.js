/* =============================
   ROLE TEXT ROTATION (Home)
============================= */
const roles = ["Designer", "Frontend Developer", "Editor"];
let roleIndex = 0;

function changeRole() {
  const roleEl = document.querySelector(".role");
  if (roleEl) {
    roleEl.style.opacity = 0; // fade out
    setTimeout(() => {
      roleEl.textContent = roles[roleIndex];
      roleEl.style.opacity = 1; // fade in
      roleIndex = (roleIndex + 1) % roles.length;
    }, 400); // small delay before text change
  }
}
setInterval(changeRole, 2400); // total time per cycle


/* =============================
   SKILLS HOVER DETAILS
============================= */
// Show tool details on hover
const skillBoxes = document.querySelectorAll(".skill-box");

skillBoxes.forEach(box => {
  box.addEventListener("mouseenter", () => {
    const detail = box.querySelector(".skill-detail");
    if (detail) detail.classList.add("visible");
  });
  box.addEventListener("mouseleave", () => {
    const detail = box.querySelector(".skill-detail");
    if (detail) detail.classList.remove("visible");
  });
});


/* =============================
   SKILL CLICK → PROJECT PAGE
============================= */
skillBoxes.forEach(box => {
  box.addEventListener("click", () => {
    // Only redirect when clicked (not just hovered)
    if (box.classList.contains("uiux-skill")) {
      window.location.href = "projects.html#uiux";
    } else if (box.classList.contains("frontend-skill")) {
      window.location.href = "projects.html#frontend";
    } else if (box.classList.contains("editor-skill")) {
      window.location.href = "projects.html#editor";
    }
  });
});


/* =============================
   SMOOTH SCROLL FOR NAV LINKS
============================= */
const navLinks = document.querySelectorAll("nav a[href^='#']");

navLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: "smooth"
      });
    }
  });
});


/* =============================
   CONTACT FORM SUCCESS MSG (Optional)
============================= */
// Only if using local form (without Formspree)
const contactForm = document.querySelector(".contact-form form");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("✅ Your message has been sent successfully!");
    contactForm.reset();
  });
}
