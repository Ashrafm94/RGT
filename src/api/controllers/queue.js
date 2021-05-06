
const getMessage = (message) => {
    
    return {
        success: true,
        message
    }
}


//Multiply Two Numbers and Get Result
const multiplyTwoNumbers = (number1, number2) => {
    return number1 * number2;
}

//Generates Number In Range
const generateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = {
    getMessage,
    multiplyTwoNumbers,
    generateRandomNumber
}