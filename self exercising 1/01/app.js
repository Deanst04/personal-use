"use strict";

(() => {

    const generateStrongPasswordAsync = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const lower = `abcdefghijklmnopqrstuvwxyz`.split(``);
                const upper = `ABCDEFGHIJKLMNOPQRSTUVWXYZ`.split(``)
                const number = `123456789`.split(``)
                const allChars = [...lower, ...upper, ...number];
                let password = ``;
                for (let i = 0; i < 6; i++) {
                    password += allChars[(Math.floor(Math.random() * allChars.length))]
                }
                let hasLower = false
                let hasUpper = false
                let hasNumber = false
                password.split(``).forEach(char => {
                    if (lower.includes(char)) hasLower = true
                    if (upper.includes(char)) hasUpper = true
                    if (number.includes(char)) hasNumber = true
                })
                if (!hasLower) reject(`your password :${password} is invalid because it lack of lowercase`)
                else if (!hasUpper) reject(`your password :${password} is invalid because it lack of uppercase`)
                else if (!hasNumber) reject(`your password :${password} is invalid because it lack of numbers`)
                resolve(`your password: ${password} is strong!`)
            }, 2000)
        })
    }

    document.getElementById("password-btn").addEventListener(`click`, () => {
        generateStrongPasswordAsync()
        .then(success => {
            console.log(success)
            document.getElementById("password").innerText = success
        })
        .catch(error => {
            console.log(error)
            document.getElementById("password").innerText = error
        })
    })

})()