"use strict";

(async () => {

    const getData = url => fetch(url).then(result => result.json())

    const { users } = await getData(`https://dummyjson.com/users`)
    

    
    const generateGenderDistribution = () => {
            return Object.entries(
                users.reduce((acc, { gender }) => {
                    const current = { ...acc }
                    if (current[gender]) current[gender]++
                    else current[gender] = 1
                    return current
                }, {})
            ).map(([gender, count]) => ({gender, count}))
            .map(({gender, count}) => `<p><strong>gender: </strong>${gender}, <strong>amount: </strong>${count}</p>`)
            .join(``)
    }

    const generateHemisphereDistribution = () => {
        const {north, south} = users.reduce((acc, {weight, address: {coordinates: {lat}}}) => {
            const current = {...acc}
            if (lat > 0) {
                current.north.northernUsers++
                current.north.northTotalWeight += weight
            }
            else {
                current.south.southernUsers++
                current.south.southTotalWeight += weight
            }
            return current
        }, {
            north: {
                northernUsers: 0,
                northTotalWeight: 0
            },
            south: {
                southernUsers: 0,
                southTotalWeight: 0
            }
        });

        const northAvg = (north.northTotalWeight / north.northernUsers).toFixed(2)
        const southAvg = (south.southTotalWeight / south.southernUsers).toFixed(2)
        const ratio = ((north.northTotalWeight / north.northernUsers) / (south.southTotalWeight / south.southernUsers)).toFixed(2)
           return `
            <p><strong>northern users: </strong>${north.northernUsers}, <strong>southern users: </strong>${south.southernUsers}</p>
            <p><strong>northern users average weight: </strong>${northAvg} KG, <strong>southern users: </strong>${southAvg} KG</p>
            <p><strong>average weight ratio (north / south): </strong>${ratio}</p>
            `
    }

    const generateEyeColorDistribution = () => {
        return Object.entries(
            users.reduce((acc, {eyeColor, weight}) => {
            const current = {...acc}
            if (!current[eyeColor]) {
                    current[eyeColor] = {
                        amount: 1,
                        totalWeight: weight,
                    }
            }
            else {
                current[eyeColor].amount++
                current[eyeColor].totalWeight += weight
            }
            return current
        }, {})).map(([eyeColor, {amount, totalWeight}]) => 
        `
            <tr>
            <td class="text-center">${eyeColor}</td>
            <td class="text-center">${amount}</td>
            <td class="text-center">${(totalWeight / amount).toFixed(2)}</td>
            <tr>
            `
        ).join(``)
    }

            
    const renderHTML = (html, target) => document.getElementById(target).innerHTML = html

    const renderGenderHTML = html => renderHTML(html, "gender-summary")

    const renderHemisphereHTML = html => renderHTML(html, "hemisphere-summary")

    const renderEyeColorHTML = html => renderHTML(html, "eye-color-summary")

    try {
        const genderHTML = generateGenderDistribution()
        const hemisphereHTML = generateHemisphereDistribution()
        const eyeColorHTML = generateEyeColorDistribution()
        renderGenderHTML(genderHTML)
        renderHemisphereHTML(hemisphereHTML)
        renderEyeColorHTML(eyeColorHTML)
    } catch (err) {
        console.log(`an error has been accrued: ${err}`)
    }

})()