$(onReady);

let firstRun = true;

function onReady() {
    $('#submitBtn').on('click', () => {
        getVals();
    })
    $('#clearBtn').hide();
    $('tfoot').hide();
    $('#clearBtn').on('click', () => {
        $('#employeeTableBody').empty();
        clearInputs();
        $('#buttonField').hide();
    });
    $('#employeeTableBody').on('click', ".deleteBtn", (event) =>{
        removeRow(event);
    });
}

function getVals() {
    let firstName = $('#fNameInput').val();
    let lastName = $('#lNameInput').val();
    let empId = $('#idNumInput').val();
    let empTitle  = $('#titleInput').val();
    let annualSalary = $('#annualSalaryInput').val();

    addToTable(firstName, lastName, empId, empTitle, annualSalary);
};

addToTable = (firstName, lastName, empId, emptTitle, annualSalary) => {
    if (firstRun) {
        $('#clearBtn').show();
        $('#tableHeadRow').append(`<th id="buttonField"></th>`);
        $('tfoot').show();
        firstRun = false;
    }
    clearInputs();
    $('#buttonField').show(); 
    $("#employeeTableBody").append(
      `<tr class="tableRows"><td id="fNameIn">${firstName}</td><td id="lNameIn">${lastName}</td><td id="empIdIn">${empId}</td><td id="empTitleIn">${emptTitle}</td><td id="annualSalaryIn">${annualSalary}</td><td><button class="deleteBtn">Delete</button></td></tr>`
    );
}

clearInputs = () => {
    firstName = $('#fNameInput').val('');
    lastName = $('#lNameInput').val('');
    empId = $('#idNumInput').val('');
    empTitle  = $('#titleInput').val('');
    annualSalary = $('#annualSalaryInput').val('');
};


function removeRow(event) {
    $(event.target).closest(".tableRows").remove();
    let tableRowsCount = $('.tableRows');
    if (tableRowsCount.length === 0) {
        $('#buttonField').hide();    
    }
};

