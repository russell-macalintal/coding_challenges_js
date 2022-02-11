function solution(queries) {
    let results_arr = [];                       //Array of all results after each operation
    let result = "";                            //Current state of the result based on the latest operation
    let cursor_pos = 0;                         //Current position of cursor - initiated at 0;
    let prev_ops = [];                          //Log all previous operations - certain operation behaviors depend on previous command
    let copy = "";
    let undone = [];
    
    for(let i = 0; i < queries.length; i++){      
        let op = {command: queries[i][0]};      //Split each query to a "command" and "value" property
        
        if (op['command'] == 'APPEND'){
            op['value'] = queries[i][1];        //If command is APPEND, assign string as 'value'
            if(prev_ops.length > 0){
                if(prev_ops.slice(-1)[0]['op']['command'] == 'SELECT'){
                    cursor_pos = prev_ops.slice(-1)[0]['op']['value']['left'];                      //If preivious command is SELECT, place cursor to the left of selection and delete selection before proceeding to code outside of IF statement
                    result = result.slice(0, prev_ops.slice(-1)[0]['op']['value']['left']) + result.slice(prev_ops.slice(-1)[0]['op']['value']['right']);
                }
            }
            
            result = result.slice(0, cursor_pos) + op['value'] + result.slice(cursor_pos);           //Add APPEND value to resulting string based on cursor position
            cursor_pos += op['value'].length;           //Update cursor position based on 'value' appended 
            prev_ops.push({op, result, cursor_pos});    //Add operation, resulting string, and current cursor position to array of previous ops
            results_arr.push(result);
        } else if (op['command'] == 'MOVE'){
            op['value'] = queries[i][1];        //If command is MOVE, assign string as 'value'
            cursor_pos = parseInt(op['value']);
            if (cursor_pos < 0){
                cursor_pos = 0;
            } else if (cursor_pos > result.length){
                cursor_pos = result.length;
            }
            prev_ops.push({op, result, cursor_pos});    //Add operation, resulting string, and current cursor position to array of previous ops
            results_arr.push(result);                   //No change to result but add into array anyway
        } else if (op['command'] == 'DELETE'){
            let delete_end = cursor_pos + 1;            //Default to one space past current cursor position
            if(prev_ops.length > 0){
                if(prev_ops.slice(-1)[0]['op']['command'] == 'SELECT'){
                    cursor_pos = prev_ops.slice(-1)[0]['op']['value']['left'];                      //If preivious command is SELECT, place cursor to the left of selection and delete selection before proceeding to code outside of IF statement
                    delete_end = parseInt(prev_ops.slice(-1)[0]['op']['value']['right']);           //Overwrite delete end with end of selection
                }
            }
            result = result.slice(0, cursor_pos) + result.slice(delete_end);
            prev_ops.push({op, result, cursor_pos});    //Add operation, resulting string, and current cursor position to array of previous ops
            results_arr.push(result);
        } else if (op['command'] == 'SELECT'){
            op['value'] = {left: queries[i][1], right: queries[i][2]};
            cursor_pos = parseInt(op['value']['right']);
            prev_ops.push({op, result, cursor_pos});    //Add operation, resulting string, and current cursor position to array of previous ops
            results_arr.push(result);                   //No change to result but add into array anyway
        } else if (op['command'] == 'COPY'){
            if(prev_ops.length > 0){
                if(prev_ops.slice(-1)[0]['op']['command'] == 'SELECT'){
                    copy = result.slice(prev_ops.slice(-1)[0]['op']['value']['left'], prev_ops.slice(-1)[0]['op']['value']['right']);
                    cursor_pos = parseInt(prev_ops.slice(-1)[0]['op']['value']['left']);
                    op['value'] = {left: prev_ops.slice(-1)[0]['op']['value']['left'], right: prev_ops.slice(-1)[0]['op']['value']['right']};
                }
            }
            prev_ops.push({op, result, cursor_pos, copy});  //Add operation, resulting string, and current cursor position to array of previous ops
            results_arr.push(result);                       //No change to result but add into array anyway
        } else if (op['command'] == 'PASTE'){
            op['value'] = copy;
            if(prev_ops.length > 0){
                if(prev_ops.slice(-1)[0]['op']['command'] == 'SELECT' || prev_ops.slice(-1)[0]['op']['command'] == 'COPY'){
                    cursor_pos = prev_ops.slice(-1)[0]['op']['value']['left'];                      //If preivious command is SELECT, place cursor to the left of selection and delete selection before proceeding to code outside of IF statement
                    delete_end = parseInt(prev_ops.slice(-1)[0]['op']['value']['right']);           //Overwrite delete end with end of selection
                    result = result.slice(0, cursor_pos) + result.slice(delete_end);
                } 
            }
            result = result.slice(0, cursor_pos) + op['value'] + result.slice(cursor_pos);           //Add COPY value to resulting string based on cursor position
            cursor_pos += op['value'].length;           //Update cursor position based on 'value' appended 
            prev_ops.push({op, result, cursor_pos});    //Add operation, resulting string, and current cursor position to array of previous ops
            results_arr.push(result);
        } else if (op['command'] == 'UNDO'){
            if(prev_ops.length > 0){
                cursor_pos = prev_ops.slice(-2)[0]['cursor_pos'];
                result = prev_ops.slice(-2)[0]['result'];
                results_arr.push(result);
                undone.push(prev_ops.pop());
            } else {
                cursor_pos = 0;
                result = "";
                results_arr.push(result);
                prev_ops = [];
            }
        } else if (op['command'] == 'REDO'){
            if(undone.length > 0){
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
    ["UNDO"]
]
solution(queries);