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
    createObject(firstName, lastName, empId, empTitle, annualSalary, counter);
    counter++;
    addToTable(firstName, lastName, empId, empTitle, annualSalary, counter);
    $('#inputError').hide();
};

addToTable = (firstName, lastName, empId, emptTitle, annualSalary) => {
    if (firstRun) {
        $('#clearBtn').show();
        $('#tableHeadRow').append(`<th title="Delete the row button column"id="buttonField"></th>`);
        $('tfoot').show();
        firstRun = false;
    }
    clearInputs();
    $('#buttonField').show(); 
    $("#employeeTableBody").append(
      `<tr data-counter=${counter} class="tableRows"><td id="fNameIn">${firstName}</td><td id="lNameIn">${lastName}</td><td id="empIdIn">${empId}</td><td id="empTitleIn">${emptTitle}</td><td class="annualSalaryIn">$${annualSalary.toLocaleString()}</td><td><button class="deleteBtn" title="Delete this row button">Delete</button></td></tr>`
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
        if (employeeList[i].counter === (employeeToRemove - 1)) {
            employeeList.splice(i, 1);
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
}