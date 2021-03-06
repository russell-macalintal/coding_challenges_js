// CODING CHALLENGE
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


// CODING CHALLENGE - NUMBER CHECKER
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



// CS PRACTICE PROBLEMS: CHALLENGE #1
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



// CS PRACTICE PROBLEMS: CHALLENGE #2
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

// cs_solution_2(random_chars);



// CS PRACTICE PROBLEMS: CHALLENGE #3
// DIAGONAL SEARCH ALGORITHM
// GIVEN A MATRIX OF 1, 0, AND 2, FIND THE LARGEST 1, 2, 0, 2, O, .... PATTERN ALONG A DIAGONAL
// SEARCH MUST ALWAYS START AT NUMBER 1
// RETURN MUST BE THE LENGTH OF THE LONGEST SOLUTION

// let matrix = [
//     [1, 0, 2, 0],
//     [0, 2, 0, 0],
//     [0, 2, 0, 0],
//     [1, 2, 0, 2]
// ]

// let matrix = [
//     [1, 0, 2, 2, 1],
//     [0, 2, 0, 2, 0],
//     [0, 2, 0, 0, 2],
//     [1, 2, 0, 2, 0],
//     [0, 2, 0, 2, 1]
// ]

// let matrix = [
//     [1, 2, 0, 2, 0],
//     [0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 2],
//     [1, 2, 0, 2, 0],
//     [0, 2, 0, 2, 1]
// ]

let matrix = [
    [0, 0, 2, 2, 0],
    [0, 0, 0, 1, 0],
    [0, 2, 2, 0, 2],
    [0, 0, 0, 0, 0],
    [2, 2, 0, 2, 0]
]

function cs_solution_3(matrix) {
    // EACH SEARCH HAS 4 PATHS [+ROW, +COL], [+ROW, -COL], [-ROW, +COL], [-ROW, -COL]
    //MATRIX DOES NOT HAVE TO BE A SQUARE
    
    
    function search_down_right(r, c, match){
        let result = 0;
        if(r+1 < matrix.length && c+1 < matrix[r].length){
            if(matrix[r+1][c+1] == match){
                result = 1;
                if(match == 2){
                    result += search_down_right(r+1, c+1, 0);
                }else if(match == 0){
                    result += search_down_right(r+1, c+1, 2);
                }
            }else{
                result = 0;
            }
        }
        return result;
    }
    
    function search_down_left(r, c, match){
        let result = 0;
        if(r+1 < matrix.length && 0 <= c-1){
            if(matrix[r+1][c-1] == match){
                result = 1;
                if(match == 2){
                    result += search_down_left(r+1, c-1, 0)
                }else if(match == 0){
                    result += search_down_left(r+1, c-1, 2)
                }
            }else{
                result = 0;
            }
        }
        return result;
    }
    
    function search_up_right(r, c, match){
        let result = 0;
        if((r-1) >= 0 && c+1 < matrix[r].length){
            if(matrix[r-1][c+1] == match){
                result = 1;
                if(match == 2){
                    result += search_up_right(r-1, c+1, 0)
                }else if(match == 0){
                    result += search_up_right(r-1, c+1, 2)
                }
            }else{
                result = 0;
            }
        }
        return result;
    }
    
    function search_up_left(r, c, match){
        let result = 0;
        if(0 <= r-1 && 0 <= c-1){
            if(matrix[r-1][c-1] == match){
                result = 1;
                if(match == 2){
                    result += search_up_left(r-1, c-1, 0)
                }else if(match == 0){
                    result += search_up_left(r-1, c-1, 2)
                }
            }else{
                result = 0;
            }
        }
        return result;
    }
    
    let counter = [];
    for(let i = 0; i < matrix.length; i++){
        for(let j = 0; j < matrix[i].length; j++){
            if (matrix[i][j] == 1) {
                console.log(`Found at ${i}, ${j}`);
                console.log(`Max pattern: ${1 + Math.max(search_down_right(i,j,2), search_down_left(i,j,2), search_up_right(i,j,2), search_up_left(i,j,2))}\n`);
                // counter = [...counter, search_down_right(i, j, 2), search_down_left(i, j, 2),search_up_right(i, j, 2), search_up_left(i, j, 2)];
            }
        }
    }
}
    
// cs_solution_3(matrix);



// CS PRACTICE PROBLEMS: CHALLENGE #4
// TOWER PROBLEM
// FIND THE MINIMUM MOVES REQUIRED TO MAKE AN ARRAY OF TOWERS EITHER IN ASCENDING OR DESCENDING ORDER
// STARTING TOWER ARRAY INCLUDES TOWER HEIGHTS RANDOMLY ARRANGED
// UNIT BLOCKS CAN ONLY BE **ADDED** TO THE EXISTING TOWER HEIGHTS -- UNIT BLOCKS CANNOT BE SUBTRACTED FROM THE HEIGHTS

// let towers = [3, 5, 6, 7]           // MOVES = 1  --> [4, 5, 6, 7]
// let towers = [3, 4, 5, 6, 10]       // MOVES = 12 --> [6, 7, 8, 9, 10]
// let towers = [2, 10000]             // MOVES = 9997 --> [9999, 10000]
// let towers = [3, 9, 8, 5]           // MOVES = 9 --> [10, 9, 8, 7]
// let towers = [3, 10, 6, 5]          // MOVES = 18 --> [9, 10, 11, 12]      MOVES = 14 --> [11, 10, 9, 8]
// let towers = [9, 10, 9, 8]          // MOVES = 6 --> [9, 10, 11, 12]       MOVES = 2 --> [11, 10, 9, 8]]


// THIS SOLUTION WORKS BUT NOT FOR ALL CASES. SEE CS_SOLUTION_4B BELOW FOR A REFACTORED SOLUTION THAT WORKS
function cs_solution_4(towers){
    let max_idx = towers.indexOf(Math.max(...towers));              //FIND INDEX OF TALLEST TOWER
    console.log(max_idx);
    let moves = 0;                                                  //INITIATE SOLUTION
    
    if (max_idx == 0){                                              //STEPS IF TALLEST TOWER IS IN THE BEGINNING OF THE ARRAY
        for(let i = 1; i < towers.length; i++){
            let current_moves = (towers[i-1] - 1) - towers[i];
            while (current_moves < 0) {                             //IF PREVIOUS ELEMENT IS NOT LARGER THAN CURRENT ELEMENT, THEN ADD A BLOCK TO THE PREVIOUS ELEMENT AND COUNT AN ADDITIONAL MOVE
                moves += 1;
                towers[i-1] += 1;
            }
            moves += (towers[i-1] - 1) - towers[i];
            towers[i] = towers[i-1] - 1;
        }
    } else if (max_idx == towers.length - 1) {                      //STEPS IF TALLEST TOWER IS IN THE END OF THE ARRAY
        for(let i = towers.length-2 ; i >= 0; i--){
            let current_moves = (towers[i+1] - 1) - towers[i];
            while (current_moves < 0) {                             //IF PREVIOUS ELEMENT IS NOT LARGER THAN CURRENT ELEMENT, THEN ADD A BLOCK TO THE PREVIOUS ELEMENT AND COUNT AN ADDITIONAL MOVE
                moves += 1;
                towers[i+1] += 1;
            }
            moves += (towers[i+1] - 1) - towers[i];
            towers[i] = towers[i+1] - 1;
        }
    } else {                                                                //STEPS IF TALLEST TOWER IS IN THE MIDDLE OF THE ARRAY
        let asc_moves = 0;
        let asc_towers = [...towers];
        if ((asc_towers[max_idx] - asc_towers[0]) / max_idx < 1){           //CHECK THAT THE MAX TOWER HEIGHT HAS 1:1 SLOPE COMPARED TO THE TOWER AT ARRAY[FIRST]
            asc_towers[max_idx] = asc_towers[0] + max_idx;
        }

        for (let i = max_idx - 1; i >= 0; i--){                             //DO 2 FOR LOOPS TO CHECK NUMBER OF MOVES FOR ASCENDING PATTERN
            let current_moves = (asc_towers[i+1] - 1) - asc_towers[i];      //FOR LOOP TO LOOK LEFT
            while (current_moves < 0) {
                asc_moves += 1;
                asc_towers[i+1] += 1;
            }
            asc_moves += (asc_towers[i+1] - 1) - asc_towers[i];
            asc_towers[i] = asc_towers[i+1] - 1;
        }
        for (let i = max_idx + 1; i < asc_towers.length; i++){              //FOR LOOP TO LOOK RIGHT
            asc_moves += (asc_towers[i-1] + 1) - asc_towers[i];
            asc_towers[i] = asc_towers[i-1] + 1;
        }
        // ================================================================================================================
        let desc_moves = 0;
        let desc_towers = [...towers];
        if ((desc_towers[max_idx] - desc_towers[desc_towers.length-1]) / ((desc_towers.length-1) - max_idx) < 1){                   //CHECK THAT THE MAX TOWER HEIGHT HAS 1:1 SLOPE COMPARED TO THE TOWER AT ARRAY[LAST]
            desc_towers[max_idx] = desc_towers[desc_towers.length-1] + ((desc_towers.length-1) - max_idx);
        }

        for (let i = max_idx + 1; i < desc_towers.length; i++){             //DO 2 FOR LOOPS TO CHECK NUMBER OF MOVES FOR DESCENDING PATTERN
            let current_moves = (desc_towers[i-1] - 1) - desc_towers[i];    //FOR LOOP TO LOOK RIGHT
            while (current_moves < 0) {
                desc_moves += 1;
                desc_towers[i-1] += 1;
            }
            desc_moves += (desc_towers[i-1] - 1) - desc_towers[i];
            desc_towers[i] = desc_towers[i-1] - 1;
        }
        for (let i = max_idx - 1; i >= 0; i--){                             //FOR LOOP TO LOOK LEFT
            desc_moves += (desc_towers[i+1] + 1) - desc_towers[i];
            desc_towers[i] = desc_towers[i+1] + 1;
        }
        if (asc_moves < desc_moves) {
            moves += asc_moves;
            towers = asc_towers;
        } else {
            moves += desc_moves;
            towers = desc_towers;
        }
    }

    console.log(`Tower: ${towers}`);
    console.log(`Moves: ${moves}`);
}

// cs_solution_4(towers);


// ALTERNATE SOLUTION TO CS PRACTICE PROBLEMS: CHALLENGE #4
// let towers = [3, 5, 6, 7]           // MOVES = 1  --> [4, 5, 6, 7]
// let towers = [3, 4, 5, 6, 10]       // MOVES = 12 --> [6, 7, 8, 9, 10]
// let towers = [2, 10000]             // MOVES = 9997 --> [9999, 10000]
// let towers = [3, 9, 8, 5]           // MOVES = 9 --> [10, 9, 8, 7]
// let towers = [9, 10, 10, 10, 8]      // MOVES = 8 --> [9, 10, 11, 12, 13]   MOVES = 8 --> [13, 12, 11, 10, 9]
// let towers = [9, 10, 11, 10, 10]     // MOVES = 5 --> [9, 10, 11, 12, 13]   MOVES = 10 --> [14, 13, 12, 11, 10]
// let towers = [11, 18, 18, 18, 5]     // MOVES = 25 --> [17, 18, 19, 20, 21]   MOVES = 25 --> [21, 20, 19, 18, 17]
let towers = [11, 18, 18, 18, 5, 17] // MOVES = 30 --> [17, 18, 19, 20, 21, 22]   MOVES = 30 --> [22, 21, 20, 19, 18, 17]

function cs_solution_4b(towers){
    let moves = 0;                                                  //INITIATE SOLUTION
    
    let asc_moves = 0;
    let asc_towers = [...towers];
    let max_idx = towers.indexOf(Math.max(...asc_towers));              //FIND INDEX OF TALLEST TOWER

    for(let i = 0; i < max_idx; i++){
        console.log(`Max tower @ index ${max_idx}: ${asc_towers[max_idx]}`);
        if ((asc_towers[max_idx] - asc_towers[i]) / (max_idx-i) < 1){   //CHECK THAT THE MAX TOWER HEIGHT HAS 1:1 SLOPE COMPARED TO THE TOWERS AT THE LOW END
            let old_max = asc_towers[max_idx];
            asc_towers[max_idx] = asc_towers[i] + (max_idx-i);
            asc_moves += (asc_towers[max_idx] - old_max);
        }
    }

    for (let i = max_idx - 1; i >= 0; i--){                             //DO 2 FOR LOOPS TO CHECK NUMBER OF MOVES FOR ASCENDING PATTERN
        let current_moves = (asc_towers[i+1] - 1) - asc_towers[i];      //FOR LOOP TO LOOK LEFT
        while (current_moves < 0) {
            asc_moves += 1;
            asc_towers[i+1] += 1;
        }
        asc_moves += (asc_towers[i+1] - 1) - asc_towers[i];
        asc_towers[i] = asc_towers[i+1] - 1;
    }

    for (let i = max_idx + 1; i < asc_towers.length; i++){              //FOR LOOP TO LOOK RIGHT
        asc_moves += (asc_towers[i-1] + 1) - asc_towers[i];
        asc_towers[i] = asc_towers[i-1] + 1;
    }
    // ================================================================================================================
    let desc_moves = 0;
    let desc_towers = [...towers];
    desc_towers.reverse();                                              //REVERSE ARRAY ORDER TO ALLOW .indexOf TO FIND FIRST MAX TOWER INDEX
    max_idx = towers.indexOf(Math.max(...desc_towers));                 //FIND INDEX OF TALLEST TOWER

    for(let i = 0; i < max_idx; i++){
        console.log(`Max tower @ index ${max_idx}: ${desc_towers[max_idx]}`);
        if ((desc_towers[max_idx] - desc_towers[i]) / (max_idx-i) < 1){ //CHECK THAT THE MAX TOWER HEIGHT HAS 1:1 SLOPE COMPARED TO THE TOWERS AT THE LOW END
            let old_max = desc_towers[max_idx];
            desc_towers[max_idx] = desc_towers[i] + (max_idx-i);
            desc_moves += (desc_towers[max_idx] - old_max);
        }
    }

    for (let i = max_idx - 1; i >= 0; i--){                             //DO 2 FOR LOOPS TO CHECK NUMBER OF MOVES FOR DESCENDING PATTERN
        let current_moves = (desc_towers[i+1] - 1) - desc_towers[i];    //FOR LOOP TO LOOK RIGHT (OF ORIGINAL ARRAY)
        while (current_moves < 0) {
            desc_moves += 1;
            desc_towers[i+1] += 1;
        }
        desc_moves += (desc_towers[i+1] - 1) - desc_towers[i];
        desc_towers[i] = desc_towers[i+1] - 1;
    }
    for (let i = max_idx + 1; i < desc_towers.length; i++){             //FOR LOOP TO LOOK LEFT (OF ORIGINAL ARRAY)
        desc_moves += (desc_towers[i-1] + 1) - desc_towers[i];
        desc_towers[i] = desc_towers[i-1] + 1;
    }

    if (asc_moves <= desc_moves) {
        moves += asc_moves;
        towers = asc_towers;
        console.log('Ascending governs');
    } else {
        moves += desc_moves;
        towers = desc_towers;
        console.log('Descending governs');
    }


    console.log(`Tower: ${towers}`);
    console.log(`Moves: ${moves}`);
}

// cs_solution_4b(towers);



// CS PRACTICE PROBLEMS: CHALLENGE #5
// REMOVE PREFIX PALINDROMES AND RETURN RESULTING STRING
// let s = 'aaacodecedoc'              //--> ""
// let s = 'abbacodesignal'            //--> "codesignal"
// let s = 'abbaabbb'                  //--> "abbb"
// let s = 'ccctryccc'                 //--> "tryccc"
// let s = 'codenarcedoc'              //--> "codenarcedoc"
// let s = ''                          //--> ""
// let s = 'codesignalaaaa'            //--> "codesignalaaaa"
// let s = 'abbaddddfefcode'           //--> "code"
// let s = 'abbaddddfeffcode'          //--> "fcode"

function cs_solution_5(s) {
    console.log(`Starting String: ${s}`);
    let s_arr = [...s];
    let temp = "";
    for(let i = s_arr.length - 1; i > 0; i--){
        if(s_arr[0] == s_arr[i]){
            temp = s_arr.slice(0, i+1);
            while(temp.length > 1){
                if(temp[0] == temp[temp.length-1]){
                    temp.shift();
                    temp.pop();
                }else{
                    break;
                }
            }
            if(temp.length <= 1){
                s_arr = s_arr.slice(i+1);
                i = s_arr.length;
            }else{
                continue;
            }
        }
    }
    console.log(`Final Result: ${s_arr.join('')}`);
}

// cs_solution_5(s);



// CS PRACTICE PROBLEMS: CHALLENGE #6
// GIVEN AN ARRAY a OF RIBBONS WITH EACH ELEMENT INDICATING EACH RIBBON'S LENGTH, DETERMINE THE LONGEST LENGTH OF RIBBON THAT CAN BE FASHIONED FROM THE COLLECTION OF RIBBONS THAT WILL YIELD AT LEAST k NUMBER OF RIBBONS. EACH RIBBON ELEMENT CAN BE CUT TO A SPECIFIC LENGTH a WHILE DISPOSING OF THE LEFTOVER LENGTHS
let a = [5, 7, 7, 10, 5];
let k = 7;

function cs_solution_6(a, k) {
    let max_ribbon_length = Math.max(...a);
    let max_length_possible = 0;
    let num_ribbons;
    
    for(let j = 1; j <= max_ribbon_length; j++){
        num_ribbons = 0;
        for(let i = 0; i < a.length; i++){
            num_ribbons += parseInt(a[i] / j);              // COUNT NUMBER OF RIBBONS THAT CAN BE CUT TO LENGTH j
        }

        if(num_ribbons >= k){                               // CHECK THAT THE NUMBER OF RIBBONS SATISFY THE MINIMUM REQUIRED
            max_length_possible = j;                        // IF IT MEETS MINIMUM REQUIREMENTS, CURRENT "MAX LENGTH" SHOULD BE SET TO j
        } else {
            break;                                          // ELSE IF MINIMUM NUMBER OF RIBBONS IS NO LONGER MET, BREAK THE OUTER FOR LOOP --> OPTIMIZE PERFORMANCE
        }       
    }
    
    console.log(`Max Length: ${max_length_possible}`);
}

// cs_solution_6(a, k);



// CS PRACTICE PROBLEMS: CHALLENGE #7
// VARIATION OF CHALLENGE #1 - MIMIC TEXT EDITOR OPERATIONS
// COMMANDS - APPEND, MOVE, DELETE, SELECT, COPY, PASTE, UNDO, REDO
function cs_solution_7(queries) {
    let results_arr = [];                       //Array of all results after each operation
    let result = "";                            //Current state of the result based on the latest operation - initiated to empty string;
    let cursor_pos = 0;                         //Current position of cursor - initiated at 0;
    let prev_ops = [];                          //Log all previous operations - certain operation behaviors depend on previous command
    let copy = "";                              //Current value of copied elements - initiated to empty string;
    let undone = [];                            //Array of all UNDO elements for future REDO command
    
    for(let i = 0; i < queries.length; i++){      
        let op = {command: queries[i][0]};      //Split each query to a "command" and "value" property
        
        if (op['command'] == 'APPEND'){
            op['value'] = queries[i][1];        //If command is APPEND, assign attached string as 'value'
            if(prev_ops.length > 0){
                if(prev_ops.slice(-1)[0]['op']['command'] == 'SELECT'){
                    cursor_pos = prev_ops.slice(-1)[0]['op']['value']['left'];                      //If previous command is SELECT, place cursor to the left of selection and delete selected text before proceeding to code outside of IF statement
                    result = result.slice(0, prev_ops.slice(-1)[0]['op']['value']['left']) + result.slice(prev_ops.slice(-1)[0]['op']['value']['right']);
                }
            }
            
            result = result.slice(0, cursor_pos) + op['value'] + result.slice(cursor_pos);           //Add APPEND value to resulting string based on cursor position
            cursor_pos += op['value'].length;                   //Update cursor position based on 'value' appended 
            prev_ops.push({op, result, cursor_pos});            //Add operation, resulting string, and current cursor position to array of previous ops
            results_arr.push(result);
        } else if (op['command'] == 'MOVE'){
            op['value'] = queries[i][1];                        //If command is MOVE, parse string as integer and assign to 'value'
            cursor_pos = parseInt(op['value']);
            if (cursor_pos < 0){                                //Set text_start and text_end as boundaries
                cursor_pos = 0;
            } else if (cursor_pos > result.length){
                cursor_pos = result.length;
            }
            prev_ops.push({op, result, cursor_pos});            //Add operation, resulting string, and current cursor position to array of previous ops
            results_arr.push(result);                           //No change to result but add into array anyway
        } else if (op['command'] == 'DELETE'){
            let delete_end = cursor_pos + 1;                    //Default to one space past current cursor position
            if(prev_ops.length > 0){
                if(prev_ops.slice(-1)[0]['op']['command'] == 'SELECT'){
                    cursor_pos = prev_ops.slice(-1)[0]['op']['value']['left'];                      //If preivious command is SELECT, place cursor to the left of selection
                    delete_end = parseInt(prev_ops.slice(-1)[0]['op']['value']['right']);           //Overwrite delete_end with end of selection
                }
            }
            result = result.slice(0, cursor_pos) + result.slice(delete_end);
            prev_ops.push({op, result, cursor_pos});            //Add operation, resulting string, and current cursor position to array of previous ops
            results_arr.push(result);
        } else if (op['command'] == 'SELECT'){
            op['value'] = {left: queries[i][1], right: queries[i][2]};                              //Assign attached string values as 'left' and 'right' parameters of 'value'
            cursor_pos = parseInt(op['value']['right']);        //Set current cursor position to rightmost portion of selection
            prev_ops.push({op, result, cursor_pos});            //Add operation, resulting string, and current cursor position to array of previous ops
            results_arr.push(result);                           //No change to result but add into array anyway
        } else if (op['command'] == 'COPY'){
            if(prev_ops.length > 0){
                if(prev_ops.slice(-1)[0]['op']['command'] == 'SELECT'){
                    copy = result.slice(prev_ops.slice(-1)[0]['op']['value']['left'], prev_ops.slice(-1)[0]['op']['value']['right']);               //Set text to be copied
                    cursor_pos = parseInt(prev_ops.slice(-1)[0]['op']['value']['left']);                                                            //If copying, cursor should move to the rightmost portion of selection
                    op['value'] = {left: prev_ops.slice(-1)[0]['op']['value']['left'], right: prev_ops.slice(-1)[0]['op']['value']['right']};       //Copies 'left' and 'right' parameters for PASTE function
                }
            }
            prev_ops.push({op, result, cursor_pos, copy});      //Add operation, resulting string, and current cursor position to array of previous ops
            results_arr.push(result);                           //No change to result but add into array anyway
        } else if (op['command'] == 'PASTE'){
            op['value'] = copy;
            if(prev_ops.length > 0){
                if(prev_ops.slice(-1)[0]['op']['command'] == 'SELECT' || prev_ops.slice(-1)[0]['op']['command'] == 'COPY'){
                    cursor_pos = prev_ops.slice(-1)[0]['op']['value']['left'];                      //If previous command is SELECT || COPY, place cursor to the left of selection and delete selected text before proceeding to code outside of IF statement
                    delete_end = parseInt(prev_ops.slice(-1)[0]['op']['value']['right']);           //Overwrite delete end with end of selection
                    result = result.slice(0, cursor_pos) + result.slice(delete_end);
                } 
            }
            result = result.slice(0, cursor_pos) + op['value'] + result.slice(cursor_pos);           //Add COPY value to resulting string based on cursor position
            cursor_pos += op['value'].length;                   //Update cursor position based on 'value' appended 
            prev_ops.push({op, result, cursor_pos});            //Add operation, resulting string, and current cursor position to array of previous ops
            results_arr.push(result);
        } else if (op['command'] == 'UNDO'){
            if(prev_ops.length > 0){                            //If there are any commands to undo, set previous cursor position and results to previous states
                cursor_pos = prev_ops.slice(-2)[0]['cursor_pos'];
                result = prev_ops.slice(-2)[0]['result'];
                results_arr.push(result);
                undone.push(prev_ops.pop());                    //Move undone command to another array for REDO reference
            } else {                                            //If no commands left to undo, set cursor position and result to initial values
                cursor_pos = 0;
                result = "";
                results_arr.push(result);
                prev_ops = [];
                console.log("Nothing to undo");
            }
        } else if (op['command'] == 'REDO'){
            if(undone.length > 0){                              //If there are any commands to redo, push undone commands back to previously performed array and reset result and cursor position to latest states. Otherwise, do nothing.
                prev_ops.push(undone.pop());
                cursor_pos = prev_ops.slice(-1)[0]['cursor_pos'];
                result = prev_ops.slice(-1)[0]['result'];
                results_arr.push(result);
            }
        }
    }
    
    console.log(results_arr);
}

queries = [
    ["APPEND", "Hello World"],
    ["APPEND", ", This is just a test!"],
    ["SELECT", "12", "33"],
    ["COPY"],
    ["PASTE"],
    ["PASTE"],
    ["UNDO"],
    ["UNDO"],
    ["UNDO"],
    ["UNDO"],
    ["UNDO"],
    ["UNDO"],
    ["UNDO"],
    ["UNDO"],
    ["REDO"],
    ["REDO"],
    ["UNDO"]
]
solution(queries);

// FIND MAXIMUM SUM OF ALL THE NUMBERS FOUND IN A DIAGONAL BOX DEFINED BY LENGTH a AND WIDTH b WITHIN A GIVEN MATRIX
