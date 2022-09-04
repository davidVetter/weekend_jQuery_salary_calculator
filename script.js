$(onReady); // shorthand for calling onReady function when script loads

// declare some used global variables
let firstRun = true;
let monthlySalary = 0;
let employeeList = [];
let counter = 0;

function onReady() { // function that runs when script loads
    clickHandlers(); // calls clickHandlers Function
    $('#clearBtn').hide();       // sets DOM for intial load
    $('tfoot').hide();           // "                    "
    $('#inputBox').hide();       // "                    "
    $('#submitBtn').hide();      // "                    "
    $('#employeeTable').hide();  // "                    "
    $('#inputError').hide();     // "                    "
    $('#inputTypeError').hide(); // "                    "
} // end onReady Function

clickHandlers = () => { // this function handles all click events
    $('#submitBtn').on('click', () => {
        $('#employeeTable').show(); // series of elements to show on click
        $('#clearBtn').show();
        $('tfoot').show();
        $('#monthlyDisplay').show();
        getVals(); // called getVals function
    }) // end submitBtn on click actions
    $('#clearBtn').on('click', () => {
        $('#employeeTableBody').empty();
        clearInputs(); // clears inputs
        calculateMonthly(); // calcs monthly and displays on DOM
        $('#clearBtn').hide(); // series of hide elements on click
        $('#buttonField').hide();
        $('tfoot').hide();
        $('#inputError').hide();
        $('#inputTypeError').hide();
        employeeList = []; // clears global employeeList array on click
    }); // end clearBtn on click actions
    $('#employeeTableBody').on('click', ".deleteBtn", (event) =>{
        removeRow(event); // calls removeRow function, passing in the "hidden" event argument
        calculateMonthly(); // calcs monthly and displays on DOM

    }); // end employeeTableBody on click actions
    $('#addEmp').on('click', () => {
        if ($('#inputBox').is(':visible')) { // check in inputs are visible and hides if they are or shows if they were hidden
            $('#inputBox').hide();
            $('#submitBtn').hide();
        } else {
        $('#inputBox').show();
        $('#submitBtn').show();
        }
    }); // end addEmp on click actions
    $('#employeeHead').on('click', () => { // check if employeeTable is visible and hides if it is or shows if it was hidden
        if ($('#employeeTable').is(':visible')) {
            $('#employeeTable').hide();
            $('#monthlyDisplay').hide();
        } else {
        $('#employeeTable').show();
        $('#monthlyDisplay').show();
        }
    }); // end employeHead on click actions
    $('#lNameHead').on('click', () => {
        displaySortEmployees(sortLastName(employeeList));
    }); // end sort by lastName click
    $('#fNameHead').on('click', () => {
        displaySortEmployees(sortFirstName(employeeList));
    }); // end sort by firstName click
    $('#titleHead').on('click', () => {
        displaySortEmployees(sortTitle(employeeList));
    }); // end sort by title click
    $('#idHead').on('click', () => {
        displaySortEmployees(sortID(employeeList));
    }); // end sort by empId click
    $('#salaryHead').on('click', () => {
        displaySortEmployees(sortSalary(employeeList));
    }); // end sort by salary click

}; // end clickHandlers Function

function getVals() {
    let firstName = $('#fNameInput').val(); // store values from inputs on DOM in variables to use
    let lastName = $('#lNameInput').val();
    let empId = Number($('#idNumInput').val());
    let empTitle  = $('#titleInput').val();
    let annualSalary = Number($('#annualSalaryInput').val());
    //console.log(annualSalary);

    if (empId === 0 || annualSalary === 0) { // checks if either empID or salary is not a number greater than 0, displays message if not
        $('#inputTypeError').show();
    }
    if (firstName === '' || lastName === '' || empId === 0 || empTitle === '' || annualSalary === 0) { // checks ALL inputs were filled in, displays message if not
        $('#inputError').show();
        return;
    }
    counter++; // increment counter that is used to keep track of employees in array, used to determine which element in global array was removed from table on DOM
    addToTable(createObject(firstName, lastName, empId, empTitle, annualSalary, counter)); // calls createObject with all values from DOM, returns the new object then calls passing in the object returned from addObject
    $('#inputError').hide(); // hide errors if needed
    $('#inputTypeError').hide();
};

addToTable = (object) => {
    if (firstRun) { // check if this is the first run from load
        $('#clearBtn').show(); // adds delete button column to table, shows table footer and toggles that firstRun has occurred
        $('#tableHeadRow').append(`<th title="Delete the row button column"id="buttonField"></th>`);
        $('tfoot').show();
        firstRun = false;
    }
    clearInputs(); // clear out inputs on DOM
    $('#buttonField').show(); // show the new button column
    $("#employeeTableBody").append( // addes new row to table with entered data
      `<tr data-counter=${object.counter} class="tableRows"><td id="fNameIn">${object.firstName}</td><td id="lNameIn">${object.lastName}</td><td id="empIdIn">${object.empId}</td><td id="empTitleIn">${object.empTitle}</td><td class="annualSalaryIn">$${object.annualSalary.toLocaleString()}</td><td><button class="deleteBtn" title="Click to delete this row">Delete</button></td></tr>`
    );
    calculateMonthly(); // calcs and re-displays the monthly salary to pay
}

clearInputs = () => { // clears all input field on DOM
    firstName = $('#fNameInput').val('');
    lastName = $('#lNameInput').val('');
    empId = $('#idNumInput').val('');
    empTitle  = $('#titleInput').val('');
    annualSalary = $('#annualSalaryInput').val('');
}; // end clearInputs function


function removeRow(event) {
    let rowToRemove = $(event.target).closest('.tableRows'); // gets the row the delete button that was clicked is from
    let employeeToRemove = rowToRemove.data('counter'); // gets the 'Counter' value from data attribute on the row to be deleted
    //console.log('Logging employeeToRemove', employeeToRemove);
    for (let i=0; i < employeeList.length; i++) { // for loop to walk through employee list
        if (employeeList[i].counter === employeeToRemove) { // check if the counter associated with the row being deleted matchs the current element in the loop
            employeeList.splice((i), 1); // if it matches, we remove that element from the global array
        }
    }
    rowToRemove.remove(); // row is removed from table
    let tableRowsCount = $('.tableRows');
    if (tableRowsCount.length === 0) { // if the table has no rows, hide the table footer, clear button and delete button column on the table
        $('#buttonField').hide();   
        $('tfoot').hide();
        $('#clearBtn').hide(); 
    }
}; // end removeRow function

calculateMonthly = () => {
    let tableSalary = $('.annualSalaryIn'); // create array of all values in annualSalary td elements from table
    let totalSalary = 0; // clear out salary in case already populated;
    let tableRowsCount = $('.tableRows'); // check that is any rows, if not monthly salary = 0
    if (tableRowsCount.length === 0) {
        monthlySalary = 0;
        //console.log('This is monthlySalary as Number, ', Number(monthlySalary.toFixed(2))); 
    } else {
        for (let record of tableSalary) { // for loop to walk through array of salary td elements
            let salaryAsString = $(record).text(); // get text from the current td element - ie first loop gets the annualSalary in the first row of the table
            // the value stored in the table is a string and has $ and , need to be removed- also need to convert to num
            let salaryAsNum = salaryAsString.replace('$', ''); // removes $
            let salaryNoComma = salaryAsNum.replaceAll(',', ''); // removes all , from string
            totalSalary += Number(salaryNoComma); // converts new string without special character to a number and adds to totalSalary variable
            monthlySalary = totalSalary / 12; // calc total monthly
            //console.log('This is totalSalary as Number, ', Number(totalSalary));
            //console.log('This is monthlySalary as Number, ', Number(monthlySalary.toFixed(2)));
        } // end for loopp
    }
    $('#monthlyDisplay').empty(); // clear old monthly total
    // addes new monthly total to DOM in nice USD currency format with $ and comma seperators
    $('#monthlyDisplay').append(`Total Monthly: ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(monthlySalary)}`);
    if (monthlySalary > 20000) { // checks if monthlySalary is over 20K, if it is then background is red, otherwise back to normal once under 20K again
        $('#monthlyDisplay').css('background-color', 'red').css('padding-left', '1vw').css('border-radius', '7px').css('color', '#e2e2e2');
    } else {
        $('#monthlyDisplay').css('background-color', 'inherit').css('color', 'inherit');
    }
} // end calculateMonthly function

createObject = (firstName, lastName, empId, empTitle, annualSalary) => {
    const addObj = { // create new object based on values input from user
        firstName,
        lastName,
        empId,
        empTitle,
        annualSalary,
        counter
    }
    employeeList.push(addObj); // push new object into global array employeeList
    //console.log(`Logging out employeeList`, employeeList);
    return addObj; // return the newly created object
} // end create object function

function sortFirstName (array) {
    let arr = array;
    let sortArt = [...arr].sort((a, b) => { // sorts without changing original collection
    let firstA = a.firstName.toLowerCase(); // convert firstName value to lowercase
    let firstB = b.firstName.toLowerCase(); // convert firstName value to lowercase
    if (firstA < firstB) { // compares letter for sorting
        return -1;
    } else if (firstA > firstB) {
        return 1;
    } else {
    return 0;
    }
});
return sortArt; // return sorted collection
} // end sortFirstName function

function sortLastName (array) {
    let arr = array;
    let sortArt = [...arr].sort((a, b) => { // sorts without changing original collection
    let firstA = a.lastName.toLowerCase(); // convert lastName value to lowercase
    let firstB = b.lastName.toLowerCase(); // convert lastName value to lowercase
    if (firstA < firstB) { // compares letter for sorting
        return -1;
    } else if (firstA > firstB) {
        return 1;
    } else {
    return 0;
    }
});
return sortArt; // return sorted collection
} // end sortLastName function

function sortTitle (array) {
    let arr = array;
    let sortArt = [...arr].sort((a, b) => { // sorts without changing original collection
    let firstA = a.empTitle.toLowerCase(); // convert empTitle value to lowercase
    let firstB = b.empTitle.toLowerCase(); // convert empTitle value to lowercase
    if (firstA < firstB) { // compares letter for sorting
        return -1;
    } else if (firstA > firstB) {
        return 1;
    } else {
    return 0;
    }
});
return sortArt; // return sorted collection
} // end sortLastName function

function sortID(array) { // sorts without changing original collection
let sortYr = [...array].sort((a, b) => {
    return a.empId - b.empId;
});
return sortYr; // return sorted collection
} // end sortID function

function sortSalary(array) { // sorts without changing original collection
    let sortYr = [...array].sort((a, b) => {
        return a.annualSalary - b.annualSalary;
    });
    return sortYr; // return sorted collection
    } // end sortSalary function

function displaySortEmployees(array) { // re-displays the table on DOM with employees in the sorted order depending on sort option used
    $('#employeeTableBody').empty(); // clear table first
    for (let record of array) { // for loop walks through sorted array and adds table rows for each object
        $("#employeeTableBody").append(
            `<tr data-counter=${record.counter} class="tableRows"><td id="fNameIn">${record.firstName}</td><td id="lNameIn">${record.lastName}</td><td id="empIdIn">${record.empId}</td><td id="empTitleIn">${record.empTitle}</td><td class="annualSalaryIn">$${record.annualSalary.toLocaleString()}</td><td><button class="deleteBtn" title="Delete this row button">Delete</button></td></tr>`
          );
    } // end for loop
} // end displaySortEmployees function

