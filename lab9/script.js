const root = document.documentElement;
const isBootstrap = document.body.dataset.framework === "bootstrap";
const themeButton = document.querySelector("#theme-toggle");
function setTheme(dark) {
  if (isBootstrap) root.dataset.bsTheme = dark ? "dark" : "light";
  else root.classList.toggle("dark", dark);
  themeButton.setAttribute("aria-pressed", String(dark));
  themeButton.textContent = dark ? "Гэрэлтэй горим" : "Харанхуй горим";
}
let savedTheme;
try { savedTheme = localStorage.getItem("agshin-theme"); } catch {}
setTheme(savedTheme ? savedTheme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches);
themeButton.addEventListener("click", () => {
  const dark = themeButton.getAttribute("aria-pressed") !== "true";
  setTheme(dark);
  try { localStorage.setItem("agshin-theme", dark ? "dark" : "light"); } catch {}
});
const menu = document.querySelector("#menu-toggle");
if (menu) menu.addEventListener("click", () => {
  const open = menu.getAttribute("aria-expanded") !== "true";
  menu.setAttribute("aria-expanded", String(open));
  document.querySelector("#navigation").classList.toggle("hidden", !open);
  document.querySelector("#navigation").classList.toggle("flex", open);
});
const photoButtons = [...document.querySelectorAll(".photo-button")];
function closePhotos() {
  photoButtons.forEach(button => {
    button.setAttribute("aria-expanded", "false");
    document.getElementById(button.getAttribute("aria-controls")).hidden = true;
  });
}
photoButtons.forEach(button => button.addEventListener("click", () => {
  const open = button.getAttribute("aria-expanded") !== "true";
  closePhotos();
  button.setAttribute("aria-expanded", String(open));
  document.getElementById(button.getAttribute("aria-controls")).hidden = !open;
}));
document.addEventListener("keydown", event => { if (event.key === "Escape") closePhotos(); });
const form = document.querySelector("#contact-form");
const fields = [...form.querySelectorAll("input, textarea")];
function validate(field) {
  const valid = field.checkValidity();
  field.setAttribute("aria-invalid", String(!valid));
  document.getElementById(field.id + "-error").hidden = valid;
  return valid;
}
form.addEventListener("submit", event => {
  event.preventDefault();
  form.classList.add("was-validated");
  const valid = fields.map(validate).every(Boolean);
  document.querySelector("#form-status").textContent = valid ? "Мэдээлэл зөв бөглөгдсөн байна. Энэ туршилтын форм тул илгээгдээгүй." : "Тэмдэглэсэн талбаруудыг зөв бөглөнө үү.";
  if (!valid) fields.find(field => !field.validity.valid).focus();
});
fields.forEach(field => field.addEventListener("input", () => {
  if (form.classList.contains("was-validated")) validate(field);
  document.querySelector("#form-status").textContent = "";
}));
