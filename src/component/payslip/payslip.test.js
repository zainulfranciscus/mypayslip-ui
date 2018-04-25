import React from 'react';
import {shallow, mount} from 'enzyme';
import renderer from 'react-test-renderer';
import Payslip from './payslip';
import PayslipCalculator from './payslip.calculator';
import {ERROR_MESSAGE_ID} from '../error';

const annualIncome = "2500";
const grossIncome = "1500";
const incomeTax = "4500";
const netIncome = "3000";
const superAmount = "140";
const pay = "750";
const fullName = "John Doe";
const mockPayslipCalculator = new PayslipCalculator();


let wrapper;

describe("Payslip component unit test", () => {

    beforeEach(() => {
        setupMockCalculatorMethods(mockPayslipCalculator);
        wrapper = shallow(<Payslip calculator={mockPayslipCalculator}/>);
    });

    it('payslip component should match the most up to date snapshot', () => {
        const payslipSnapshot = renderer.create(<Payslip calculator={mockPayslipCalculator}/>).toJSON();
        expect(payslipSnapshot).toMatchSnapshot();

    });

    

    function findErrorDiv(payslipComponent) {
        return payslipComponent.find('#' + ERROR_MESSAGE_ID);
    }
});


export const setupMockCalculatorMethods = (calculator) => {
    spyOn(calculator, "getGrossIncome").and.returnValue(grossIncome);
    spyOn(calculator, "getIncomeTax").and.returnValue(incomeTax);
    spyOn(calculator, "getNetIncome").and.returnValue(netIncome);
    spyOn(calculator, "getSuper").and.returnValue(superAmount);
    spyOn(calculator, "getPay").and.returnValue(pay);
    spyOn(calculator, "annualSalary").and.returnValue(annualIncome);
    spyOn(calculator, "fullName").and.returnValue(fullName);
};