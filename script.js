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
    $('#employeeTableBody').append(`<tr class="tableRows"><td>${firstName}</td><td>${lastName}</td><td>${empId}</td><td>${emptTitle}</td><td>${annualSalary}</td><td><button class="deleteBtn">Delete</button></td></tr>`)
}

clearInputs = () => {
    firstName = $('#fNameInput').val('');
    lastName = $('#lNameInput').val('');
    empId = $('#idNumInput').val('');
    empTitle  = $('#titleInput').val('');
    annualSalary = $('#annualSalaryInput').val('');
};