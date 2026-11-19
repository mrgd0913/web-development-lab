// Лаборатори 9 — Алгоритмын жижиг функцүүд

// 1. 1-ээс n хүртэлх тооны нийлбэр
export function sumTo(n) {
    if (n < 1) return 0;
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}

// 2. Факториал
export function factorial(n) {
    if (n < 0) return null;
    let result = 1;
    for (let i = 1; i <= n; i++) {
        result *= i;
    }
    return result;
}

// 3. Анхны тоо эсэх
export function isPrime(n) {
    if (n < 2) return false;
    for (let i = 2; i < n; i++) {
        if (n % i === 0) return false;
    }
    return true;
}

// 4. FizzBuzz
export function fizzBuzz(n) {
    const result = [];
    for (let i = 1; i <= n; i++) {
        if (i % 3 === 0 && i % 5 === 0) {
            result.push("FizzBuzz");
        } else if (i % 3 === 0) {
            result.push("Fizz");
        } else if (i % 5 === 0) {
            result.push("Buzz");
        } else {
            result.push(i);
        }
    }
    return result;
}

// 5. Эгшгийн тоо (латин болон монгол кирилл)
export function countVowels(str) {
    const vowels = "aeiouAEIOUаэиоуюяөүАЭИОУЮЯӨҮ";
    let count = 0;
    for (let i = 0; i < str.length; i++) {
        for (let j = 0; j < vowels.length; j++) {
            if (str[i] === vowels[j]) {
                count++;
                break;
            }
        }
    }
    return count;
}

// 6. Palindrome эсэх
export function isPalindrome(str) {
    const value = str.toLowerCase();
    let reversed = "";
    for (let i = value.length - 1; i >= 0; i--) {
        reversed += value[i];
    }
    return value === reversed;
}

// 7. Массивын хамгийн их утга
export function maxOf(arr) {
    if (arr.length === 0) return null;
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) max = arr[i];
    }
    return max;
}

// 8. Цифрүүдийн нийлбэр
export function digitSum(n) {
    n = Math.abs(Math.trunc(n));
    let sum = 0;
    while (n > 0) {
        sum += n % 10;
        n = Math.floor(n / 10);
    }
    return sum;
}
