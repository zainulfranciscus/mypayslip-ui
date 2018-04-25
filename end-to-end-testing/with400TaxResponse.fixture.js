import {Selector} from 'testcafe';
import fillEmployeeForm from "./common.form.entry";

fixture `Test for Payslip using a stub that return a tax response JSON with 400 HTTTP Status`
    .page `http://localhost:3000/`;

test('An error message should be rendered when Generate Payslip button is clicked ', async t => {

	const errorMessage = 'Webservice could not process a payslip for this employee because: ' +
        'salary is not a number Make sure that salary entered does not contain any non-numerical characters';

    await fillEmployeeForm(t)
        .click('#generatePayslipButton')
        .expect(Selector("#errorMessage").innerText).contains(errorMessage);
    
});

test('Payslip should not be rendered when button is clicked, because tax response JSON has 400 http Status', async t => {

    await fillEmployeeForm(t)
        .click('#generatePayslipButton')
        .expect(Selector("#Payslip_Container").count).eql(0);

});