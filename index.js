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



// COODESIGNAL PRACTICE PROBLEMS:
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
        let op = {command: c_arr[0]};

        if (op['command'] == 'TYPE'){
            op['value'] = c_arr[1];
            if (prev_ops.length > 0){                                   //DETERMINES STRING REPLACEMENT OR NOT DEPENDING ON PREVIOUS 'SELECT' COMMAND
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
                cursor_pos = prev_ops.slice(-2)[0]['cursor_pos'];                   //REVERT CURSOR POSITION AND STRING RESULT TO STATE FROM 2 STATES AGO {CURRENT CONDITION MATCHES LAST SAVED STATE}
                result = prev_ops.slice(-2)[0]['result'];
                prev_ops.pop();                                                     //REMOVE LAST SAVED STATE FROM ARRAY OF PREVIOUS COMMANDS
            } else {
                cursor_pos = 0;
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

cs_solution_1(operations)