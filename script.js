const header = document.querySelector("[data-header]");
const year = document.querySelector("[data-year]");
const revealItems = document.querySelectorAll(".reveal");
const projectImages = document.querySelectorAll(".project-media img");
const skillIconTargets = document.querySelectorAll(".skill-group h3[data-icon], .tag-list li[data-icon]");

function createSkillIcon(iconName, className) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  const use = document.createElementNS("http://www.w3.org/2000/svg", "use");

  svg.classList.add(className);
  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("focusable", "false");
  use.setAttribute("href", `#icon-${iconName}`);
  use.setAttributeNS("http://www.w3.org/1999/xlink", "href", `#icon-${iconName}`);
  svg.append(use);

  return svg;
}

if (year) {
  year.textContent = new Date().getFullYear();
}

skillIconTargets.forEach((item) => {
  if (item.querySelector(".skill-heading-icon, .tag-icon")) return;

  const iconName = item.dataset.icon;
  const iconClass = item.matches("h3") ? "skill-heading-icon" : "tag-icon";
  item.prepend(createSkillIcon(iconName, iconClass));
});

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
