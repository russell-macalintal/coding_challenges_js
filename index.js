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

// PROBLEM STATEMENTS - ALL SOLUTIONS CHECK OUT
// let scrambled = scrambler("zeroonefournine");
// let scrambled = scrambler("zeroonetwotwoeightnine");
// let scrambled = scrambler("oneoneonethreethreethreezerofivefive");
// let scrambled = scrambler("fivefivefivefivefive");
// let scrambled = scrambler("fiveoneonefiveeightzerozero");

// console.log(`Puzzle to solve: ${scrambled}`);


// JPMCC CODING CHALLENGE - NUMBER CHECKER
const solution = (problem) => {
    
    let answer = [];

    const numerals = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

    while(problem.length > 0){
        for(let i = 0; i < numerals.length; i++) {
            let all = problem.split("");
            let num_arr = numerals[i].split("");
            if(num_arr.every( val => all.includes(val))){
                answer.push(i);
                // Revert index to check problem statement for duplicate numerals during next for loop execution
                i--;
                // Erase found numeral from problem statement
                // While loop will execute until problem string has 0 length
                num_arr.forEach(letter => problem = problem.replace(letter, ''));
            }
        }
    }

    console.log(answer);

}

// solution(scrambled);



// COODESIGNAL PRACTICE PROBLEMS: CHALLENGE #1
// MIMIC TEXT EDITOR OPERATIONS
// 'TYPE string' => fills current string with input
// 'MOVE_CURSOR integer' => moves cursor by the input interval
// 'SELECT [start_index, end_index]' => selects current text based on starting and ending indices, inclusive
// 'UNDO' => undoes previous command; can undo multiple commands

// let operations = ['TYPE Code', 'TYPE Signal', 'MOVE_CURSOR -3', 'TYPE maCa']
// let operations = ['TYPE Code', 'TYPE Signal', 'MOVE_CURSOR -13', 'TYPE maCa']
// let operations = ['TYPE Code', 'TYPE Signal', 'SELECT [0,10]', 'MOVE_CURSOR -3', 'TYPE maCa']
// let operations = ['TYPE Code', 'TYPE Signal', 'SELECT [0,3]', 'MOVE_CURSOR -3', 'TYPE maCa']
// let operations = ['TYPE Code', 'TYPE Signal', 'SELECT [0,10]', 'TYPE MARISSA ZHONG', 'MOVE_CURSOR -5', 'TYPE MACALINTAL-']
// let operations = ['TYPE Code', 'TYPE Signal', 'SELECT [0,10]', 'TYPE MARISSA ZHONG', 'UNDO', 'MOVE_CURSOR -5', 'TYPE RUSSELL MACALINTAL']
// let operations = ['TYPE Code', 'TYPE Signal', 'SELECT [0,10]', 'TYPE MARISSA ZHONG', 'UNDO', 'TYPE RUSSELL MACALINTAL']
// let operations = ['TYPE Code', 'TYPE Signal', 'SELECT [0,10]', 'TYPE MARISSA ZHONG', 'UNDO', 'UNDO', 'UNDO', 'UNDO']
let operations = ['TYPE Code', 'TYPE Signal', 'SELECT [0,10]', 'TYPE MARISSA ZHONG', 'UNDO', 'UNDO', 'UNDO', 'TYPE  Challenge Complete']

function cs_solution_1(operations){
    let result = "";                //INITIATE STRING TO BE RETURNED
    let cursor_pos = 0;             //INITIATE CURSOR POSITION
    let prev_ops = [];              //INITIATE ARRAY OF PREVIOUS COMMANDS FOR FUTURE REFERENCE IN UNDO OPERATION

    for(let i = 0; i < operations.length; i++){
        let c_arr = operations[i].split(/(?<=^\S+)\s/);                 //REGEX FOR POSITIVE LOOKBEHIND TO SPLIT STRING BASED ONLY ON FIRST WHITESPACE
        let op = {command: c_arr[0]};                                   //SPLIT EACH OPERATION INTO ITS 'COMMAND' AND 'VALUE' STRINGS

        if (op['command'] == 'TYPE'){
            op['value'] = c_arr[1];
            if (prev_ops.length > 0){                                   //IF PRECEDING COMMAND IS 'SELECT' REMOVE THE SELECTED STRING AND REPLACE WITH NEW STRING
                if (prev_ops.slice(-1)[0]['op']['command'] == 'SELECT'){
                    cursor_pos = prev_ops.slice(-1)[0]['select_start'];
                    result = result.slice(0, prev_ops.slice(-1)[0]['select_start']) + result.slice(prev_ops.slice(-1)[0]['select_end']);
                }
            }
            result = result.slice(0, cursor_pos) + op['value'] + result.slice(cursor_pos);
            cursor_pos += op['value'].length;
            prev_ops.push({op, result, cursor_pos});                    //STORE EXECUTED COMMAND, CURRENT STRING, AND CURSOR POSITION FOR FUTURE REFERENCE
        } else if (op['command'] == 'MOVE_CURSOR'){
            op['value'] = c_arr[1];
            result += "";
            cursor_pos += parseInt(op['value']);
            if (cursor_pos < 0){                                        //RESET CURSOR POSITION TO 0 IF VALUE IS NEGATIVE
                cursor_pos = 0;
            }
            prev_ops.push({op, result, cursor_pos});                    //STORE EXECUTED COMMAND, CURRENT STRING, AND CURSOR POSITION FOR FUTURE REFERENCE
        } else if (op['command'] == 'SELECT'){
            op['value'] = c_arr[1];
            let select_start = parseInt(op['value'].split(/\,|\[|\]/)[1]);
            let select_end = parseInt(op['value'].split(/\,|\[|\]/)[2]);
            result += "";
            cursor_pos = select_end;
            prev_ops.push({op, result, cursor_pos, select_start, select_end});      //STORE EXECUTED COMMAND, CURRENT STRING, AND CURSOR POSITION FOR FUTURE REFERENCE
        } else if (op['command'] == 'UNDO'){
            if (prev_ops.length > 1){
                cursor_pos = prev_ops.slice(-2)[0]['cursor_pos'];                   //REVERT CURSOR POSITION AND STRING RESULT TO STATE FROM 2 STATES AGO {**CURRENT CONDITION MATCHES LAST SAVED STATE**}
                result = prev_ops.slice(-2)[0]['result'];
                prev_ops.pop();                                                     //REMOVE LAST SAVED STATE FROM ARRAY OF PREVIOUS COMMANDS
            } else {
                cursor_pos = 0;                                                     //IF PREVIOUS OPERATIONS ARRAY ONLY HAS ONE EXECUTED COMMAND (**WHICH THE CURRENT CONDITION ALREADY REFLECTS**), THEN RESET ALL PARAMETERS TO INITIAL VALUE
                result = "";
                prev_ops = [];
            }
        }
    }

    console.log(`Result: ${result}`);
    console.log(`Current Cursor Position: ${cursor_pos}`)
    console.log(`All previous commands:`)
    console.log(prev_ops)

}

// cs_solution_1(operations)



// CODESIGNAL PRACTICE PROBLEMS: CHALLENGE #2
// FIND LARGEST PALINDROME STRING GENERATED FROM A RANDOM SET OF CHARACTERS. IF MULTIPLE STRINGS OF THE SAME LENGTH ARE FOUND, RETURN THE 'LEXICALLY SMALLEST' STRING.
// let random_chars = "bbaaa";
// let random_chars = "cbaaa";
// let random_chars = "azaleaelaza";
let random_chars = "adjtkakenivxalajakwzsedaaassksddkddssaaaditm";
function cs_solution_2(random_chars){
    let char_array = [...random_chars];
    let pal_array = [];                                 //INITIATE PALINDROME ARRAY
    let unpaired = [];
    let pairs = [];                                     //INITIATE ARRAY FOR PAIRED CHARACTERS
    char_array.sort();
    while (char_array.length > 0) {
        if (char_array[0] === char_array[1]){
            pairs.push(char_array.shift());
            pairs.push(char_array.shift());
        } else {
            unpaired.push(char_array.shift());
        }
    }

    console.log(`Pairs: ${pairs}`);
    console.log(`Unpaired: ${unpaired}`);

    pairs.reverse();                                    //REVERSE ORDER OF PAIRS IN PREPARTION FOR PALINDROME CREATION
    console.log(`Pairs Reverse: ${pairs}`);
    if (unpaired.length > 0){
        pal_array.push(unpaired.shift());                //IF THERE ARE ANY UNPAIRED CHARACTERS, PUSH THE FIRST ELEMENT OF THE UNPAIRED ARRAY TO THE PALINDROME (**PALINDROME CAN ONLY HAVE A MAXIMUM OF 1 UNPAIRED CHARACTER LOCATED IN THE MIDDLE)
    }
    while (pairs.length > 0) {
        pal_array.push(pairs.shift());
        pal_array.unshift(pairs.shift());
    }
    console.log(`Largest Palindrome: ${pal_array.join('')}`);
    
}

cs_solution_2(random_chars);