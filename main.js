/* =====================================================
   SCROLL SUAVE (APENAS LINKS INTERNOS)
===================================================== */
document.querySelectorAll('.sidebar a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();

    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});


/* =====================================================
   FADE-IN / SLIDE-IN NAS SEÇÕES
===================================================== */
const sections = document.querySelectorAll(".main > div");

const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

sections.forEach(section => {
  section.classList.add("fade-section");
  fadeObserver.observe(section);
});


/* =====================================================
   SCROLL SPY
===================================================== */
const menuLinks = document.querySelectorAll(".sidebar a");

const spyObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      menuLinks.forEach(link => {
        const id = link.getAttribute("href").replace("#", "");
        link.classList.toggle("active", entry.target.id === id);
      });
    }
  });
}, { threshold: 0.6 });

sections.forEach(section => spyObserver.observe(section));


/* =====================================================
   MODAL DE TRAILERS
===================================================== */
const modal = document.getElementById("modal");
const iframe = document.getElementById("modal-video");
const openButtons = document.querySelectorAll(".open-modal");
const closeButton = document.querySelector(".close-modal");

openButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    iframe.src = btn.dataset.video;
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  });
});

function closeModal() {
  modal.classList.remove("active");
  iframe.src = "";
  document.body.style.overflow = "";
}

if (closeButton) {
  closeButton.addEventListener("click", closeModal);
}

modal.addEventListener("click", e => {
  if (e.target === modal) closeModal();
});

document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeModal();
});
