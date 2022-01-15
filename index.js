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

// let scrambled = scrambler("zeroonefournine");
// let scrambled = scrambler("zeroonetwotwoeightnine");
let scrambled = scrambler("oneoneonethreethreethreezerofivefive");

console.log(`Puzzle to solve: ${scrambled}`);


// JPMCC CODING CHALLENGE - NUMBER CHECKER
const solution = (problem) => {
    
    let answer = [];

    const numerals = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

    while(problem.length > 0){
        // numerals.forEach((number, idx) => {
        for(let i = 0; i < numerals.length; i++) {
            let all = problem.split("");
            let num_arr = numerals[i].split("");
            if(num_arr.every( val => all.includes(val))){
                answer.push(i);
                i--;
                num_arr.forEach(letter => problem = problem.replace(letter, ''));
                console.log(problem);
            }
        }
        // })
    }

    // answer.sort();

    console.log(answer);

}

solution(scrambled);