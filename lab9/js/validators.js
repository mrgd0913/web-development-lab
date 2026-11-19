// Лаборатори 9 — Form validation функцүүд

// Нэр: захын зайг арилгах, 2-50 тэмдэгт, тоо агуулахгүй
export function validateName(value) {
    const name = value.trim();
    if (name.length < 2 || name.length > 50) return false;
    if (/[0-9]/.test(name)) return false;
    return true;
}

// Имэйл: нэр@домэйн.өргөтгөл хэлбэртэй, зайгүй
export function validateEmail(value) {
    if (value === "" || /\s/.test(value)) return false;
    const pattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return pattern.test(value);
}

// Нууц үг: 8-аас доошгүй тэмдэгт, зайгүй, үсэг ба тоотой
export function validatePassword(value) {
    if (value.length < 8) return false;
    if (/\s/.test(value)) return false;

    const hasLetter = /[A-Za-zА-Яа-яЁёӨөҮү]/.test(value);
    const hasNumber = /[0-9]/.test(value);

    return hasLetter && hasNumber;
}

// Мессеж: захын зайг арилгасны дараа 10-500 тэмдэгт
export function validateMessage(value) {
    const message = value.trim();
    return message.length >= 10 && message.length <= 500;
}
