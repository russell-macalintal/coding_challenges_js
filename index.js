// SAMPLE CODE TO ENSURE INDEX.JS FUNCTIONALITY
// const greet = (name = "Tester") => {
//     console.log(`Hello ${name}`);
// }

// greet();


// JPMCC CODING CHALLENGE
// Input: jumbled numeral characters
// Output: numerical representations of jumbled words sorted in ascending order
// Import: Duplicates are not excluded from the outputw

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

console.log(scrambler("zeroonetwoeightnine"));