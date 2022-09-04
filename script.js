$(onReady);

let firstRun = true;
let monthlySalary = 0;
let employeeList = [];
let counter = 0;

function onReady() {
    clickHandlers();
    $('#clearBtn').hide();
    $('tfoot').hide();
    $('#inputBox').hide();
    $('#submitBtn').hide();
    $('#employeeTable').hide();
    $('#inputError').hide();
}

clickHandlers = () => {
    $('#submitBtn').on('click', () => {
        $('#employeeTable').show();
        $('#clearBtn').show();
        $('tfoot').show();
        $('#monthlyDisplay').show();
        getVals();
    })
    $('#clearBtn').on('click', () => {
        $('#employeeTableBody').empty();
        clearInputs();
        calculateMonthly();
        $('#clearBtn').hide();
        $('#buttonField').hide();
        $('tfoot').hide();
        $('#inputError').hide();
        employeeList = [];
    });
    $('#employeeTableBody').on('click', ".deleteBtn", (event) =>{
        removeRow(event);
        calculateMonthly();

    });
    $('#addEmp').on('click', () => {
        if ($('#inputBox').is(':visible')) {
            $('#inputBox').hide();
            $('#submitBtn').hide();
        } else {
        $('#inputBox').show();
        $('#submitBtn').show();
        }
    });
    $('#employeeHead').on('click', () => {
        if ($('#employeeTable').is(':visible')) {
            $('#employeeTable').hide();
            $('#monthlyDisplay').hide();
        } else {
        $('#employeeTable').show();
        $('#monthlyDisplay').show();
        }
    });
    $('#lNameHead').on('click', () => {
        displaySortEmployees(sortLastName(employeeList));
    });
    $('#fNameHead').on('click', () => {
        displaySortEmployees(sortFirstName(employeeList));
    });
    $('#titleHead').on('click', () => {
        displaySortEmployees(sortTitle(employeeList));
    });
    $('#idHead').on('click', () => {
        displaySortEmployees(sortID(employeeList));
    });
    $('#salaryHead').on('click', () => {
        displaySortEmployees(sortSalary(employeeList));
    });

};

function getVals() {
    let firstName = $('#fNameInput').val();
    let lastName = $('#lNameInput').val();
    let empId = Number($('#idNumInput').val());
    let empTitle  = $('#titleInput').val();
    let annualSalary = Number($('#annualSalaryInput').val());
    //console.log(annualSalary);

    if (firstName === '' || lastName === '' || empId === 0 || empTitle === '' || annualSalary === 0 || !(typeof empId === 'number') || !(typeof annualSalary === 'number')) {
        $('#inputError').show();
        return;
    }
    //createObject(firstName, lastName, empId, empTitle, annualSalary, counter);
    counter++;
    addToTable(createObject(firstName, lastName, empId, empTitle, annualSalary, counter));
    $('#inputError').hide();
};

addToTable = (object) => {
    if (firstRun) {
        $('#clearBtn').show();
        $('#tableHeadRow').append(`<th title="Delete the row button column"id="buttonField"></th>`);
        $('tfoot').show();
        firstRun = false;
    }
    clearInputs();
    $('#buttonField').show(); 
    $("#employeeTableBody").append(
      `<tr data-counter=${object.counter} class="tableRows"><td id="fNameIn">${object.firstName}</td><td id="lNameIn">${object.lastName}</td><td id="empIdIn">${object.empId}</td><td id="empTitleIn">${object.empTitle}</td><td class="annualSalaryIn">$${object.annualSalary.toLocaleString()}</td><td><button class="deleteBtn" title="Delete this row button">Delete</button></td></tr>`
    );
    calculateMonthly();
}

clearInputs = () => {
    firstName = $('#fNameInput').val('');
    lastName = $('#lNameInput').val('');
    empId = $('#idNumInput').val('');
    empTitle  = $('#titleInput').val('');
    annualSalary = $('#annualSalaryInput').val('');
};


function removeRow(event) {
    let rowToRemove = $(event.target).closest('.tableRows');
    let employeeToRemove = rowToRemove.data('counter');
    console.log('Logging employeeToRemove', employeeToRemove);
    for (let i=0; i < employeeList.length; i++) {
        if (employeeList[i].counter === employeeToRemove) {
            employeeList.splice((i), 1);
        }
    }
    rowToRemove.remove();
    let tableRowsCount = $('.tableRows');
    if (tableRowsCount.length === 0) {
        $('#buttonField').hide();   
        $('tfoot').hide();
        $('#clearBtn').hide(); 
    }
};

calculateMonthly = () => {
    let tableSalary = $('.annualSalaryIn');
    let totalSalary = 0;
    let tableRowsCount = $('.tableRows');
    if (tableRowsCount.length === 0) {
        monthlySalary = 0;
        //console.log('This is monthlySalary as Number, ', Number(monthlySalary.toFixed(2))); 
    } else {
        for (let record of tableSalary) {
            let salaryAsString = $(record).text();
            let salaryAsNum = salaryAsString.replace('$', '');
            let salaryNoComma = salaryAsNum.replaceAll(',', '');
            totalSalary += Number(salaryNoComma);
            monthlySalary = totalSalary / 12;
            //console.log('This is totalSalary as Number, ', Number(totalSalary));
            //console.log('This is monthlySalary as Number, ', Number(monthlySalary.toFixed(2)));
        }
    }
    $('#monthlyDisplay').empty();
    $('#monthlyDisplay').append(`Total Monthly: ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(monthlySalary)}`);
    if (monthlySalary > 20000) {
        $('#monthlyDisplay').css('background-color', 'red').css('padding-left', '1vw').css('border-radius', '7px').css('color', '#e2e2e2');
    } else {
        $('#monthlyDisplay').css('background-color', 'inherit').css('color', 'inherit');
    }
}

createObject = (firstName, lastName, empId, empTitle, annualSalary) => {
    const addObj = {
        firstName,
        lastName,
        empId,
        empTitle,
        annualSalary,
        counter
    }
    employeeList.push(addObj);
    console.log(`Logging out employeeList`, employeeList);
    return addObj;
}

function sortFirstName (array) {
    let arr = array;
    let sortArt = [...arr].sort((a, b) => { // sorts without changing original collection
    let firstA = a.firstName.toLowerCase(); // convert lastName value to lowercase
    let firstB = b.firstName.toLowerCase(); // convert lastName value to lowercase
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
    let firstA = a.empTitle.toLowerCase(); // convert lastName value to lowercase
    let firstB = b.empTitle.toLowerCase(); // convert lastName value to lowercase
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
}

function sortSalary(array) { // sorts without changing original collection
    let sortYr = [...array].sort((a, b) => {
        return a.annualSalary - b.annualSalary;
    });
    return sortYr; // return sorted collection
    }

function displaySortEmployees(array) {
    $('#employeeTableBody').empty();
    for (let record of array) {
        $("#employeeTableBody").append(
            `<tr data-counter=${record.counter} class="tableRows"><td id="fNameIn">${record.firstName}</td><td id="lNameIn">${record.lastName}</td><td id="empIdIn">${record.empId}</td><td id="empTitleIn">${record.empTitle}</td><td class="annualSalaryIn">$${record.annualSalary.toLocaleString()}</td><td><button class="deleteBtn" title="Delete this row button">Delete</button></td></tr>`
          );
    }
}

