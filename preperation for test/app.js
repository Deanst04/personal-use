"use strict";

(async () => {

    const getData = url => fetch(url).then(result => result.json())

    const fetchUser = id => getData(`https://jsonplaceholder.typicode.com/users/${id}`)

    const generateHTML = ({name, username, email, phone, address : { city, street }}) => {
        return `
        <p><strong>name: </strong>${name}</p>
        <p><strong>username: </strong>${username}</p>
        <p><strong>email: </strong>${email}</p>
        <p><strong>phone: </strong>${phone}</p>
        <p><strong>city: </strong>${city}</p>
        <p><strong>street: </strong>${street}</p>
        `
    }

    const renderHTML = (html, target) => {
        document.getElementById(target).innerHTML = html
    }

    document.getElementById("get-user").addEventListener(`click`, async () => {

        const userID = +document.getElementById("user-id").value

        if (userID > 10 || userID < 1) {
            alert(`user not found, please try again with a number between 1 - 10`)
            return
        }


        try {
            const user = await fetchUser(userID)
            const html = generateHTML(user)
            renderHTML(html, "user-info")
        } catch (err) {
            console.log(err)
        }
    })
})()