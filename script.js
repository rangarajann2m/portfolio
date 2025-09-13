/* global THREE, emailjs */
document.addEventListener("DOMContentLoaded", () => {
  // Year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // === 3D background (Three.js) ===
  (function initThreeBackground(){
    try {
      const canvas = document.getElementById("bg-canvas");
      if (!canvas) return;

      const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
      renderer.setPixelRatio(window.devicePixelRatio || 1);
      renderer.setSize(window.innerWidth, window.innerHeight);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 6;

      // wireframe sphere
      const geometry = new THREE.SphereGeometry(2.2, 48, 48);
      const material = new THREE.MeshStandardMaterial({
        color: 0x06b6d4,
        metalness: 0.2,
        roughness: 0.6,
        emissive: 0x064e5b,
        emissiveIntensity: 0.25,
        transparent: true,
        opacity: 0.9
      });
      const sphere = new THREE.Mesh(geometry, material);
      scene.add(sphere);

      // small wireframe overlay
      const wire = new THREE.LineSegments(
        new THREE.WireframeGeometry(geometry),
        new THREE.LineBasicMaterial({ color: 0x22c55e, opacity: 0.25, transparent: true })
      );
      scene.add(wire);

      // lights
      const pLight = new THREE.PointLight(0xffffff, 0.8);
      pLight.position.set(5,5,5);
      scene.add(pLight);
      const amb = new THREE.AmbientLight(0x223344, 0.35);
      scene.add(amb);

      // animate
      function animate(){
        requestAnimationFrame(animate);
        sphere.rotation.y += 0.0025;
        sphere.rotation.x += 0.0015;
        wire.rotation.y += 0.0028;
        renderer.render(scene, camera);
      }
      animate();

      // resize
      window.addEventListener("resize", () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      });
    } catch (err) {
      // if three fails, silently continue (still ok)
      console.warn("Three.js init failed:", err);
    }
  })();

  // === Project activation (click) ===
  const projectCards = Array.from(document.querySelectorAll(".project-card"));
  function activateProject(cardId) {
    projectCards.forEach(c => c.classList.remove("active"));
    const el = document.getElementById(cardId);
    if (el) {
      el.classList.add("active");
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }
  projectCards.forEach(pc => {
    // set id if not present (defensive)
    if (!pc.id) return;
    pc.addEventListener("click", () => activateProject(pc.id));
  });

  // === Skills to Projects mapping & skill click behavior ===
  const skillMap = {
    "skill-uiux": "project-uiux",
    "skill-frontend": "project-frontend",
    "skill-editor": "project-editing"
  };
  const skillCards = Array.from(document.querySelectorAll(".skill-card"));
  skillCards.forEach(card => {
    card.addEventListener("click", () => {
      // highlight clicked skill
      skillCards.forEach(c => c.classList.remove("active"));
      card.classList.add("active");

      // map to project and activate
      const projectId = skillMap[card.id];
      if (projectId) {
        activateProject(projectId);
        // also scroll to projects section
        const projectsSection = document.getElementById("projects");
        if (projectsSection) projectsSection.scrollIntoView({ behavior: "smooth" });
      }
    });

    // Allow keyboard activation (Enter)
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        card.click();
      }
    });
  });

  // === EmailJS contact form ===
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  if (form) {
    form.addEventListener("submit", function(e){
      e.preventDefault();

      // TODO: replace with your EmailJS IDs
      const SERVICE_ID = "YOUR_SERVICE_ID";
      const TEMPLATE_ID = "YOUR_TEMPLATE_ID";

      // show sending state
      status.textContent = "Sending…";
      status.style.color = "#93c5fd";

      emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, this)
        .then(() => {
          status.textContent = "✅ Message sent successfully!";
          status.style.color = "#34d399";
          form.reset();
        })
        .catch((err) => {
          console.error("EmailJS error:", err);
          status.textContent = "❌ Failed to send. Please try again.";
          status.style.color = "#f87171";
        });
    });
  }

  // small accessibility: smooth anchor links -> active nav link toggling
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", (e) => {
      const target = document.querySelector(a.getAttribute("href"));
      if (target) {
        // allow default but also close any mobile nav if needed (not implemented here)
      }
    });
  });
});
