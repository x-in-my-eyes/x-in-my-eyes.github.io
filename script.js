
const feedback = document.getElementById("cta-feedback");
const primaryCta = document.getElementById("primary-cta");
const secondaryCta = document.getElementById("secondary-cta");
const checklist = document.getElementById("checklist");
const themeToggle = document.getElementById("theme-toggle");
const form = document.getElementById("contact-form");
const formFeedback = document.getElementById("form-feedback");
const yearSpan = document.getElementById("current-year");

const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

const setTheme = (mode) => {
  document.documentElement.dataset.theme = mode;
  localStorage.setItem("theme", mode);
  themeToggle.textContent =
    mode === "dark" ? "Usar tema claro" : "Alternar tema";
};

const storedTheme = localStorage.getItem("theme");
if (storedTheme) {
  setTheme(storedTheme);
} else if (prefersDark.matches) {
  setTheme("dark");
}

prefersDark.addEventListener("change", (event) => {
  if (!localStorage.getItem("theme")) {
    setTheme(event.matches ? "dark" : "light");
  }
});

themeToggle.addEventListener("click", () => {
  const currentTheme = document.documentElement.dataset.theme;
  setTheme(currentTheme === "dark" ? "light" : "dark");
});

primaryCta.addEventListener("click", () => {
  feedback.textContent = "Perfeito! Comece criando sua primeira seção hoje.";
});

secondaryCta.addEventListener("click", () => {
  const isHidden = checklist.getAttribute("aria-hidden") === "true";
  checklist.setAttribute("aria-hidden", String(!isHidden));
  checklist.style.display = isHidden ? "grid" : "none";
  feedback.textContent = isHidden
    ? "Checklist aberto para guiar os próximos passos."
    : "Checklist oculto. Volte quando precisar.";
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const name = formData.get("name");
  const email = formData.get("email");
  const goal = formData.get("goal");

  formFeedback.textContent = `Obrigado, ${name}! Vamos falar sobre ${goal}.`;
  form.reset();

  setTimeout(() => {
    formFeedback.textContent = `Confirmamos o envio para ${email}.`;
  }, 1500);
});

yearSpan.textContent = new Date().getFullYear();
checklist.style.display = "none";
