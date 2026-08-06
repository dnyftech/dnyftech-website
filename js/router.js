document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("click", (e) => {
    const link = e.target.closest("a[href^='#']");
    if (!link) return;

    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;

    e.preventDefault();

    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
});
