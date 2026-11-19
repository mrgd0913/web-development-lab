// Лаборатори 9 — Хувьсагч, төрөл, хөрвүүлэлтийн туршилт
import {
    sumTo, factorial, isPrime, fizzBuzz,
    countVowels, isPalindrome, maxOf, digitSum
} from "./algorithms.js";

import {
    validateName, validateEmail, validatePassword, validateMessage
} from "./validators.js";

// Хувьсагч болон өгөгдлийн төрөл
const studentName = "Margad";
const studentAge = 20;
const isStudent = true;
const scoreText = "95";
const scoreNumber = Number(scoreText);

console.table([
    { variable: "studentName", value: studentName, type: typeof studentName },
    { variable: "studentAge", value: studentAge, type: typeof studentAge },
    { variable: "isStudent", value: isStudent, type: typeof isStudent },
    { variable: "scoreText", value: scoreText, type: typeof scoreText },
    { variable: "scoreNumber", value: scoreNumber, type: typeof scoreNumber }
]);

console.log("String-ээс Number рүү:", scoreNumber, typeof scoreNumber);
console.log("0.1 + 0.2 =", 0.1 + 0.2);
console.log("0.1 + 0.2 === 0.3:", 0.1 + 0.2 === 0.3);

// Алгоритмын функцүүдийг console дээр турших
console.table([
    { function: "sumTo(5)", result: sumTo(5) },
    { function: "factorial(5)", result: factorial(5) },
    { function: "isPrime(7)", result: isPrime(7) },
    { function: "fizzBuzz(5)", result: fizzBuzz(5).join(", ") },
    { function: "countVowels('Сайн байна')", result: countVowels("Сайн байна") },
    { function: "isPalindrome('level')", result: isPalindrome("level") },
    { function: "maxOf([3, 8, 2])", result: maxOf([3, 8, 2]) },
    { function: "digitSum(1234)", result: digitSum(1234) }
]);

// Өмнөх лабораторийн theme тохиргоо
const root = document.documentElement;
const isBootstrap = document.body.dataset.framework === "bootstrap";
const themeButton = document.querySelector("#theme-toggle");

function setTheme(dark) {
    if (isBootstrap) {
        root.dataset.bsTheme = dark ? "dark" : "light";
    } else {
        root.classList.toggle("dark", dark);
    }

    themeButton.setAttribute("aria-pressed", String(dark));
    themeButton.textContent = dark ? "Гэрэлтэй горим" : "Харанхуй горим";
}

let savedTheme;
try {
    savedTheme = localStorage.getItem("agshin-theme");
} catch (error) {
    savedTheme = null;
}

setTheme(
    savedTheme
        ? savedTheme === "dark"
        : window.matchMedia("(prefers-color-scheme: dark)").matches
);

themeButton.addEventListener("click", () => {
    const dark = themeButton.getAttribute("aria-pressed") !== "true";
    setTheme(dark);
    try {
        localStorage.setItem("agshin-theme", dark ? "dark" : "light");
    } catch (error) {
        // Local storage боломжгүй байсан ч theme ажиллана.
    }
});

// Tailwind хувилбарын mobile menu
const menu = document.querySelector("#menu-toggle");
if (menu) {
    menu.addEventListener("click", () => {
        const open = menu.getAttribute("aria-expanded") !== "true";
        menu.setAttribute("aria-expanded", String(open));
        document.querySelector("#navigation").classList.toggle("hidden", !open);
        document.querySelector("#navigation").classList.toggle("flex", open);
    });
}

// Зургийн мэдээллийг нээх/хаах
const photoButtons = document.querySelectorAll(".photo-button");

function closePhotos() {
    photoButtons.forEach(button => {
        button.setAttribute("aria-expanded", "false");
        document.getElementById(button.getAttribute("aria-controls")).hidden = true;
    });
}

photoButtons.forEach(button => {
    button.addEventListener("click", () => {
        const open = button.getAttribute("aria-expanded") !== "true";
        closePhotos();
        button.setAttribute("aria-expanded", String(open));
        document.getElementById(button.getAttribute("aria-controls")).hidden = !open;
    });
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape") closePhotos();
});

// Санал хүсэлтийн form
const form = document.querySelector("#contact-form");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const messageInput = document.querySelector("#message");
const fields = [nameInput, emailInput, passwordInput, messageInput];

const validationRules = {
    name: {
        check: validateName,
        message: "Нэр 2-50 тэмдэгт байх ба тоо агуулахгүй."
    },
    email: {
        check: validateEmail,
        message: "Зөв имэйл хаяг оруулна уу. Жишээ: name@example.com"
    },
    password: {
        check: validatePassword,
        message: "Нууц үг 8-аас доошгүй тэмдэгт, үсэг болон тоо агуулна. Зай оруулахгүй."
    },
    message: {
        check: validateMessage,
        message: "Санал хүсэлт 10-500 тэмдэгт байх ёстой."
    }
};

function validateField(field) {
    const rule = validationRules[field.id];
    const valid = rule.check(field.value);
    const error = document.getElementById(field.id + "-error");

    field.setAttribute("aria-invalid", String(!valid));
    field.classList.toggle("is-valid", valid);
    field.classList.toggle("is-invalid", !valid);

    error.textContent = valid ? "" : rule.message;
    error.hidden = valid;

    return valid;
}

// Бичих үед form өмнө нь шалгагдсан бол алдааг шинэчилнэ
fields.forEach(field => {
    field.addEventListener("input", () => {
        if (form.classList.contains("was-validated")) {
            validateField(field);
        }
        document.querySelector("#form-status").textContent = "";
    });
});

// Мессежийн тэмдэгтийн тоолуур
const messageCount = document.querySelector("#message-count");
messageInput.addEventListener("input", () => {
    messageCount.textContent = messageInput.value.length;
});

// Илгээх товч дарахад бүх талбарыг шалгана
form.addEventListener("submit", event => {
    event.preventDefault();
    form.classList.add("was-validated");

    let allValid = true;

    fields.forEach(field => {
        if (!validateField(field)) allValid = false;
    });

    const status = document.querySelector("#form-status");

    if (allValid) {
        status.textContent = "✓ Таны санал хүсэлт амжилттай шалгагдлаа. (Сургалтын форм тул сервер рүү илгээгээгүй.)";
        status.classList.add("form-success");
        status.classList.remove("form-failure");

        form.reset();
        fields.forEach(field => {
            field.classList.remove("is-valid", "is-invalid");
            field.setAttribute("aria-invalid", "false");
        });
        fields.forEach(field => {
            document.getElementById(field.id + "-error").hidden = true;
            document.getElementById(field.id + "-error").textContent = "";
        });
        messageCount.textContent = "0";
        form.classList.remove("was-validated");
    } else {
        status.textContent = "Тэмдэглэсэн талбаруудыг шалгаж, зөв бөглөнө үү.";
        status.classList.add("form-failure");
        status.classList.remove("form-success");

        const firstInvalid = fields.find(field =>
            field.getAttribute("aria-invalid") === "true"
        );
        if (firstInvalid) firstInvalid.focus();
    }
});
