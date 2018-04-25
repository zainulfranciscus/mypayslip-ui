import {Selector} from 'testcafe';
import fillEmployeeForm from "./common.form.entry";

fixture `Test for Payslip using a stub that return a tax response JSON with missing tax information required to calculate a payslip`
    .page `http://localhost:3000/`;

test('An error message should be rendered when Generate Payslip button is clicked ', async t => {

    const errorMessage = 'Tax bracket returned by the server is missing the minimum information to calculate a payslip.';

    await fillEmployeeForm(t)
        .click('#generatePayslipButton')
        .expect(Selector("#errorMessage").innerText).contains(errorMessage);

});

test('Payslip should not be rendered when button is clicked, because there is no tax information required to calculate a payslip', async t => {

    await fillEmployeeForm(t)
        .click('#generatePayslipButton')
        .expect(Selector("#Payslip_Container").count).eql(0);

});