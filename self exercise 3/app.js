"use strict";

(() => {
  const users = [
    { name: "david", age: 21 },
    { name: "sarah", age: 17 },
    { name: "moshe", age: 34 },
    { name: "ronit", age: 16 },
    { name: "yoav", age: 45 },
  ];

  const getAverageAdultsAge = users => {
    const { totalAge, adults} = users
      .reduce((acc, {age}) => {
        const current = {...acc}
        if (age > 18) {
          current.totalAge += age
          current.adults += 1
        } else {
          current.totalAge = age
          current.adults = 1
        }
        return current
      }, { totalAge, adults})
      const average = totalAge / adults
      return `the average adults age is: ${average}`
  }
  
  console.log(getAverageAdultsAge(users))
})();
