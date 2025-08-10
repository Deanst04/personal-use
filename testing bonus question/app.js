"use strict";

(async () => {

    const getData = url => fetch(url).then(result => result.json())

    const fetchCountries = () => getData(`https://restcountries.com/v3.1/all?fields=name,population,currencies,region`)
    const fetchCountry = country => getData(`https://restcountries.com/v3.1/name/${country}?fields=name,population,currencies,region`)

    const generateCountriesInfoHTML = country => {
        const result = country.reduce((cumulative, { population  }) => {
            const current = { ... cumulative }
            if (current.countries) {
                current.countries += 1;
                current.population += population;
            }
            else {
                current.countries = 1;
                current.population = population;
            }
            return current
        }, {
            countries: 0,
            population: 0
        })
        return `
            <tr>
                <td class="text-center">${result.countries}</td>
                <td class="text-center">${result.population}</td>
                <td class="text-center">${(result.population / result.countries).toFixed(2)}</td>
            </tr>
        `
    }

    const generateCountriesNamesAndPopulationHTML = country => {
        const result = Object.entries(
            country.reduce((cumulative, {name : { common }, population}) => {
                const current = { ...cumulative }
                if (!current[common]) current[common] = population
                return current
            }, {})
            ).map(([countryName, population]) => 
                `
                <tr>
                    <td class="text-center">${countryName}</td>
                    <td class="text-center">${population}</td>
                </tr>
            `).join(``)
        return result
    }

    const generateRegionsAndCountriesHTML = country => {
        const result = Object.entries(
            country.reduce((cumulative, { region } ) => {
                const current = { ...cumulative }
                if (!current[region]) {
                    current[region] = 1
                }
                else current[region] += 1
                return current
            }, {})
        ).map(([region, amountOfCountries]) => 
            `
            <tr>
                <td class="text-center">${region}</td>
                <td class="text-center">${amountOfCountries}</td>
            </tr>
        `).join(``)
        return result
    }

    const generateCurrenciesOfCountries = country => {
        const result = Object.entries(
            country.reduce((cumulative, { currencies }) => {
                const current = { ...cumulative }

                for (const currency of Object.values(currencies)) {
                    const {name, symbol} = currency
                    if (current[name]) {
                    current[name].amount += 1;
                }
                else {
                    current[name] = {
                        amount: 1,
                        symbol
                    }
                }
                }
                return current
            }, {})
        ).map(([currencyName, {amount, symbol}]) => ({currencyName, amount, symbol}))
        .map(({currencyName, amount, symbol}) => 
            
            `<tr>
                <td class="text-center">${currencyName}</td>
                <td class="text-center">${symbol}</td>
                <td class="text-center">${amount}</td>
            </tr>`
        ).join(``)
        return result
    }

    const renderHTML = (html, target) => document.getElementById(target).innerHTML = html

    const renderFirstTableHTML = html => renderHTML(html, "first-table-info")
    const renderSecondTableHTML = html => renderHTML(html, "second-table-info")
    const renderThirdTableHTML = html => renderHTML(html, "third-table-info")
    const renderFourthTableHTML = html => renderHTML(html, "fourth-table-info")

    document.getElementById("search-country").addEventListener(`click`, async () => {

        const userCountry = document.getElementById("country-name").value

        try {
            const country = await fetchCountry(userCountry)
            const firstTableHTML = generateCountriesInfoHTML(country)
            const secondTableHTML = generateCountriesNamesAndPopulationHTML(country)
            const thirdTableHTML = generateRegionsAndCountriesHTML(country)
            const fourthTableHTML = generateCurrenciesOfCountries(country)
            renderFirstTableHTML(firstTableHTML)
            renderSecondTableHTML(secondTableHTML)
            renderThirdTableHTML(thirdTableHTML)
            renderFourthTableHTML(fourthTableHTML)
            console.log(`done!`)
        } catch (err) {
            console.log(err)
            alert(`ERROR!, please try again`)
        }
    })

    document.getElementById("show-all-countries").addEventListener(`click`, async () => {

        try {
            const countries = await fetchCountries()
            const firstTableHTML = generateCountriesInfoHTML(countries)
            const secondTableHTML = generateCountriesNamesAndPopulationHTML(countries)
            const thirdTableHTML = generateRegionsAndCountriesHTML(countries)
            const fourthTableHTML = generateCurrenciesOfCountries(countries)
            renderFirstTableHTML(firstTableHTML)
            renderSecondTableHTML(secondTableHTML)
            renderThirdTableHTML(thirdTableHTML)
            renderFourthTableHTML(fourthTableHTML)
            console.log(`done!`)
        } catch (err) {
            console.log(err)
        }
    })
})()