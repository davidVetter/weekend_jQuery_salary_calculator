$(onReady);

let firstRun = true;

function onReady() {
    $('#submitBtn').on('click', () => {
        getVals();
    })
    $('#clearBtn').hide();
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
        firstRun = false;
    }
    $('#employeeTableBody').append(`<tr><td>${firstName}</td><td>${lastName}</td><td>${empId}</td><td>${emptTitle}</td><td>${annualSalary}</td></tr>`)
}
