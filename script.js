const header = document.querySelector("[data-header]");
const year = document.querySelector("[data-year]");
const revealItems = document.querySelectorAll(".reveal");
const projectImages = document.querySelectorAll(".project-media img");

if (year) {
  year.textContent = new Date().getFullYear();
}

function setHeaderState() {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 8);
}

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

projectImages.forEach((image) => {
  image.addEventListener("error", () => {
    const media = image.closest(".project-media");
    if (!media) return;

    const placeholder = document.createElement("div");
    placeholder.className = "image-placeholder";
    placeholder.textContent = media.dataset.fallbackLabel || "Project preview";
    media.replaceChildren(placeholder);
  });
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
