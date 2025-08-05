"use strict";

(async () => {

    const getData = url => fetch(url).then(result => result.json())

    const fetchUser = id => getData(`https://jsonplaceholder.typicode.com/users/${id}`)

    const generateUserHTML = ({name, username, email, phone, address : {city, street, zipcode}, company}) => 
    `
        <p><strong>name: </strong>${name}</p>
        <p><strong>username: </strong>${username}</p>
        <p><strong>email: </strong>${email}</p>
        <p><strong>phone: </strong>${phone}</p>
        <p><strong>city: </strong>${city}</p>
        <p><strong>street: </strong>${street}</p>
        <p><strong>zipcode: </strong>${zipcode}</p>
        <p><strong>company: </strong>${company.name}</p>
    `

    const generateUsersAvgNamesLengthHTML = avgNamesFunc => 
    `
        <p><strong>The average length of the chosen users is: </strong>${avgNamesFunc}</p>
    `

    const renderHTML = (html, target) => document.getElementById(target).innerHTML = html

    const renderUserHTML = html => renderHTML(html, "user-details")
    const renderAvgUsersNamesLengthHTML = html => renderHTML(html, "average-names-chars")

    const fetchedUsers = [];

    document.getElementById("get-user").addEventListener(`click`, async () => {

        const userID = document.getElementById("user-ID").value 

        if(userID > 10 || userID <= 0) {
            alert(`${userID} is invalid, you must enter a number between 1 - 10`)
            return
        }


        const avgUsersNamesLength = () => fetchedUsers.reduce((acc, {name}) => acc + name.replaceAll(" ", "").length, 0) / fetchedUsers.length

        try {
            const user = await fetchUser(userID)
            fetchedUsers.push(user)
            const html = generateUserHTML(user)
            const namesHTML = generateUsersAvgNamesLengthHTML(avgUsersNamesLength())
            renderUserHTML(html)
            renderAvgUsersNamesLengthHTML(namesHTML)
            console.log(`done!`)
        } catch (err) {
            console.log(`error has been accrued: ${err}`)
        }
    })
})()