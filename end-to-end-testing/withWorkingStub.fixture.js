import {Selector} from 'testcafe';
import moment from "moment";
import fillEmployeeForm,{firstNameID,lastNameID,salaryID,superRateID,salary} from "./common.form.entry";
import currencyFormatter from 'currency-formatter';

fixture `Test for Payslip using a stub for functional test`
    .page `http://localhost:3000/`;




test('Given an employee, a payslip with the right amount should be displayed ', async t => {

    await fillEmployeeForm(t)
        .click('#generatePayslipButton')
        .expect(Selector('#errorMessageforFirstName').length).eql(0)
        .expect(Selector('#errorMessageforLastName').length).eql(0)
        .expect(Selector('#errorMessageForSalary').length).eql(0)
        .expect(Selector('#errorMessageForSuper').length).eql(0)
        .expect(Selector('#AnnualIncome_ID').innerText).eql(amountFormatter(salary))
        .expect(Selector('#GrossIncome_ID').innerText).eql(amountFormatter(5004))
        .expect(Selector('#IncomeTax_ID').innerText).eql(amountFormatter(922))
        .expect(Selector('#NetIncome_ID').innerText).eql(amountFormatter(4082))
        .expect(Selector('#Super_ID').innerText).eql(amountFormatter(450))
        .expect(Selector('#Pay_ID').innerText).eql(amountFormatter(3632))
        .expect(Selector('#PayFrequency_ID').innerText).eql("Monthly")
        .expect(Selector('#Paydate_ID').innerText).eql( moment().format('DD MMMM YYYY'))


});



test('Paying an employee who has not been paid, should not display an error message', async t => {

    const salary =  '60050';

    await fillEmployeeForm(t)
        .click('#generatePayslipButton')
        .click('#payButton')
        .expect(Selector('#errorMessage').count).eql(0);



});

test('Paying an employee whom has been paid,should display an error message', async t => {

    const salary =  '60050';

    await fillEmployeeForm(t)
        .click('#generatePayslipButton')
        .click('#payButton')
        .expect(Selector('#errorMessage').innerText).contains('already exist');

});

test('Enter a first name that are not alphabet will trigger a validation error' , async t => {
    await t.typeText(firstNameID, '123')
        .click('#generatePayslipButton')
        .expect(Selector('#errorMessageforFirstName').innerText).eql('Please enter a first name. First name cannot be a number')
});

test('Enter a last name that are not alphabet will trigger a validation error' , async t => {
    await t.typeText(lastNameID, '123')
        .click('#generatePayslipButton')
        .expect(Selector('#errorMessageforLastName').innerText).eql('Please enter a last name. Last name cannot be a number')
});

test('Enter a salary that is not a round number will trigger an error message' , async t => {
    await t.typeText(salaryID, '4500.12')
        .click('#generatePayslipButton')
        .expect(Selector('#errorMessageForSalary').innerText).eql('Please enter a salary, which must be a round number that must not be less than 0.')
});

test('Enter a salary that is a negative number will trigger an error message' , async t => {
    await t.typeText(salaryID, '-1000')
        .click('#generatePayslipButton')
        .expect(Selector('#errorMessageForSalary').innerText).eql('Please enter a salary, which must be a round number that must not be less than 0.')
});

test('Enter a super that is not a number will trigger an error message' , async t => {
    await t.typeText(superRateID, 'nine percent')
        .click('#generatePayslipButton')
        .expect(Selector('#errorMessageForSuper').innerText).eql('Please enter a number for super that must not be less than 0.')
});

test('Enter a super that is a negative number will trigger an error message' , async t => {
    await t.typeText(superRateID, '-9')
        .click('#generatePayslipButton')
        .expect(Selector('#errorMessageForSuper').innerText).eql('Please enter a number for super that must not be less than 0.')
});

function amountFormatter(amount) {
    return currencyFormatter.format(amount, {code: 'AUD'});
}