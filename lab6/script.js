"use strict";

const root = document.documentElement;
const themeButton = document.querySelector("#theme-toggle");
const darkPreference = window.matchMedia("(prefers-color-scheme: dark)");
let savedTheme = null;

try {
  const value = localStorage.getItem("agshin-theme");

  if (value === "light" || value === "dark") {
    savedTheme = value;
  }
} catch {
  // Хадгалсан горимыг унших боломжгүй үед системийн горимыг ашиглана.
}

function applyTheme(theme) {
  root.dataset.theme = theme;
  themeButton.setAttribute("aria-pressed", String(theme === "dark"));
}

applyTheme(savedTheme || (darkPreference.matches ? "dark" : "light"));

themeButton.hidden = false;

themeButton.addEventListener("click", () => {
  savedTheme = root.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(savedTheme);

  try {
    localStorage.setItem("agshin-theme", savedTheme);
  } catch {
    // Хадгалах боломжгүй байсан ч горим солигдоно.
  }
});

darkPreference.addEventListener("change", (event) => {
  if (!savedTheme) {
    applyTheme(event.matches ? "dark" : "light");
  }
});

const menuButton = document.querySelector("#menu-toggle");
const navigation = document.querySelector("#site-nav");
const wideScreen = window.matchMedia("(min-width: 800px)");

function closeMenu() {
  navigation.classList.remove("is-open");
  menuButton.setAttribute("aria-expanded", "false");
}

menuButton.hidden = false;
root.classList.add("nav-enhanced");

menuButton.addEventListener("click", () => {
  const expanded = menuButton.getAttribute("aria-expanded") === "true";

  navigation.classList.toggle("is-open", !expanded);
  menuButton.setAttribute("aria-expanded", String(!expanded));
});

navigation.addEventListener("click", (event) => {
  const link = event.target.closest("a");

  if (!link || wideScreen.matches) return;

  closeMenu();

  const target = document.querySelector(link.getAttribute("href"));
  target?.focus({ preventScroll: true });
});

document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    menuButton.getAttribute("aria-expanded") === "true"
  ) {
    closeMenu();
    menuButton.focus();
  }
});

wideScreen.addEventListener("change", closeMenu);

const cards = [...document.querySelectorAll(".gallery-card")];

function flipCard(card, flipped, restoreFocus = true) {
  const front = card.querySelector(".card-front");
  const back = card.querySelector(".card-back");
  const button = card.querySelector(".flip-button");
  const title = card.querySelector("h3").textContent;

  if (
    !flipped &&
    restoreFocus &&
    back.contains(document.activeElement)
  ) {
    button.focus({ preventScroll: true });
  }

  card.classList.toggle("is-flipped", flipped);

  front.setAttribute("aria-hidden", String(flipped));
  front.inert = flipped;

  back.setAttribute("aria-hidden", String(!flipped));
  back.inert = !flipped;

  button.setAttribute("aria-expanded", String(flipped));
  button.setAttribute(
    "aria-label",
    `${title}: ${flipped ? "зураг руу буцах" : "мэдээлэл харах"}`
  );
}

function toggleCard(card) {
  const opening = !card.classList.contains("is-flipped");

  // Өөр карт нээхэд өмнө нь нээлттэй байсан картыг хаана.
  if (opening) {
    cards.forEach((other) => {
      if (
        other !== card &&
        other.classList.contains("is-flipped")
      ) {
        flipCard(other, false, false);
      }
    });
  }

  // Нээлттэй картаа дахин дарвал буцааж хаана.
  flipCard(card, opening);
  card.querySelector(".flip-button").focus({ preventScroll: true });
}

cards.forEach((card) => {
  const button = card.querySelector(".flip-button");

  flipCard(card, false);
  card.classList.add("can-flip");
  button.hidden = false;

  // Зургийн талбай дээр дарахад ажиллана.
  button.addEventListener("click", () => {
    toggleCard(card);
  });

  card.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      card.classList.contains("is-flipped")
    ) {
      flipCard(card, false);
      button.focus();
    }
  });
});

const gallery = document.querySelector("#gallery-grid");
const filters = [...document.querySelectorAll(".filter")];
const count = document.querySelector("#gallery-count");

document.querySelector(".filters").hidden = false;

filters.forEach((button) => {
  button.addEventListener("click", () => {
    const selected = button.dataset.filter;
    let index = 0;

    gallery.classList.remove("is-ready");

    filters.forEach((item) => {
      item.setAttribute("aria-pressed", String(item === button));
    });

    cards.forEach((card) => {
      card.hidden =
        selected !== "all" &&
        card.dataset.category !== selected;

      flipCard(card, false, false);

      if (!card.hidden) {
        card.style.setProperty("--i", index++);
      }
    });

    count.textContent = `${index} зураг`;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        gallery.classList.add("is-ready");
      });
    });
  });
});

const status = document.querySelector("#loading-status");
const statusText = document.querySelector("#loading-text");

status.hidden = false;
gallery.setAttribute("aria-busy", "true");

function waitForImage(image) {
  if (image.complete) {
    return Promise.resolve(image.naturalWidth > 0);
  }

  return new Promise((resolve) => {
    image.addEventListener("load", () => resolve(true), {
      once: true
    });

    image.addEventListener("error", () => resolve(false), {
      once: true
    });
  });
}

document.querySelectorAll(".card-front img").forEach((image) => {
  const showError = () => {
    image.hidden = true;
    image.parentElement.querySelector(".image-fallback").hidden = false;
  };

  image.addEventListener("error", showError, { once: true });

  if (image.complete && !image.naturalWidth) {
    showError();
  }
});

const initialImages = [...document.images].filter(
  (image) => image.loading !== "lazy"
);

let timeoutId;

const timeout = new Promise((resolve) => {
  timeoutId = window.setTimeout(() => resolve(null), 8000);
});

Promise.race([
  Promise.all(initialImages.map(waitForImage)),
  timeout
]).then((results) => {
  window.clearTimeout(timeoutId);

  gallery.setAttribute("aria-busy", "false");
  gallery.classList.add("is-ready");

  if (results && results.every(Boolean)) {
    statusText.textContent = "Зургууд бэлэн боллоо.";
    status.hidden = true;
  } else {
    status.querySelector(".loader").hidden = true;

    statusText.textContent = results
      ? "Зарим зураг ачаалагдсангүй. Картын мэдээллийг нээж болно."
      : "Зураг удаан ачаалж байна. Та цомгийг үргэлжлүүлэн үзэж болно.";
  }
});