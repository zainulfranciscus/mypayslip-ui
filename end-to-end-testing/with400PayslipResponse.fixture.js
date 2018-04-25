import {Selector} from 'testcafe';
import fillEmployeeForm from "./common.form.entry";

fixture `Test for Payslip using a stub that return a tax response JSON with 400 HTTTP Status`
    .page `http://localhost:3000/`;

test('An error message should be rendered when Generate Payslip button is clicked ', async t => {

    const errorMessage = 'Webservice could not process this payslip, because income tax is less than zero.';

    await fillEmployeeForm(t)
        .click('#generatePayslipButton')
        .click('#payButton')
        .expect(Selector('#errorMessage').innerText).contains(errorMessage);

});
