// SAMPLE CODE TO CHECK INDEX.JS FUNCTIONALITY
// const greet = (name = "Tester") => {
//     console.log(`Hello ${name}`);
// }

// greet();


// JPMCC CODING CHALLENGE
// Input: jumbled numeral characters
// Output: numerical representations of jumbled words sorted in ascending order
// Import: Duplicates are not excluded from the outputw

// SIMPLE WORD SCRAMBLER
const scrambler = (word) => {
    let a = word.split("");
    let len = a.length;

    for(let i = len - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = a[i];
        a[i] = a[j];
        a[j] = temp;
    }
    
    return a.join("");
}

let scrambled = scrambler("zeroonetwotwoeightnine");

console.log(`Puzzle to solve: ${scrambled}`);


// JPMCC CODING CHALLENGE - NUMBER CHECKER
const solution = (problem) => {
    let all = problem.split("");
    let answer = [];

    const numerals = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

   
    numerals.forEach((number, idx) => {
        let num_arr = number.split("");
        if(num_arr.every( val => all.includes(val))){
            answer.push(idx);
            // num_arr.every(letter => all.replace(letter, ""));
        }
    })
    

    console.log(answer);
    console.log(all);
}

solution(scrambled);