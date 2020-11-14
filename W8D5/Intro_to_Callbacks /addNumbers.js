// addNumbers

const readline = require('readline');
const reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const addNumbers = (sum, numsLeft, completionCallback) => {
    if (numsLeft > 0){
        reader.question('Please enter a number: ', (str) => {
            let num = parseInt(str);
            sum += num;
            console.log(sum);
            addNumbers(sum, --numsLeft, completionCallback);
        });
    } else {
        completionCallback(sum);
    }
}

// addNumbers(0, 3, sum => console.log(`Total Sum: ${sum}`));