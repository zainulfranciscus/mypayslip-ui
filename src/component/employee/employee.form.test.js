import React from 'react';
import {shallow} from 'enzyme';
import renderer from 'react-test-renderer';
import EmployeeForm,{
    ID_OF_FIRST_NAME_TEXT_FIELD,
    ID_OF_ANNUAL_SALARY_TEXT_FIELD,
    ID_OF_LAST_NAME_TEXT_FIELD,
    ID_OF_SUPER_RATE_TEXT_FIELD,
    ID_OF_GENERATE_PAYSLIP_BUTTON,
    CLASS_NAME_FOR_INVALID_FIELD_ENTRY
} from './employee.form';

import EmployeeValidation from './employee.validation';

const firstNameTextField = () => {
    return wrapper.find("input[type='text']#" + ID_OF_FIRST_NAME_TEXT_FIELD);
};

const lastNameTextField = () => {
    return wrapper.find("input[type='text']#" + ID_OF_LAST_NAME_TEXT_FIELD)
};

const annualSalaryTextField = () => {
    return wrapper.find("input[type='text']#" + ID_OF_ANNUAL_SALARY_TEXT_FIELD);
};

const superRateTextField = () => {
    return wrapper.find("input[type='text']#" + ID_OF_SUPER_RATE_TEXT_FIELD);
};

const generatePayslipButton = () => {
    return wrapper.find("button#" + ID_OF_GENERATE_PAYSLIP_BUTTON);
};


const employeeValidation = new EmployeeValidation();
let mockGeneratePayslipIsCalled = false;
const mockGeneratePayslip = (employeeFormValues) =>{
    mockGeneratePayslipIsCalled = true;
};

let validateSpy;
let isEmployeeDataValidSpy;
let mockIsEmployeeDataValid;

const wrapper = shallow(<EmployeeForm validation={employeeValidation} generatePayslip={mockGeneratePayslip} />);

describe("Employee Form unit tests ",() => {

    beforeEach(() => {

        mockIsEmployeeDataValid = {
            isEmployeeDataValid: () => {}
        };

        isEmployeeDataValidSpy = spyOn(mockIsEmployeeDataValid,"isEmployeeDataValid");
        validateSpy = spyOn(employeeValidation, "validate");
        validateSpy.and.returnValue(mockIsEmployeeDataValid);

        mockGeneratePayslipIsCalled = false;


    });


    it('employee form component should match the most up to date snapshot', ()=>{
        const employeeFormSnapshot = renderer.create(<EmployeeForm validation={employeeValidation}
                                                              generatePayslip={mockGeneratePayslip} />).toJSON();
        expect(employeeFormSnapshot).toMatchSnapshot();

    });

    it("firstName state should be equal to text field value", ()=> {
        assertThatStateHasTheSameValueAsInputValue(firstNameTextField());
    });

    it("lastName state should be equal to text field value", ()=> {
        assertThatStateHasTheSameValueAsInputValue(lastNameTextField());
    });

    it("annual salary state should be equal to text field value", ()=> {
        assertThatStateHasTheSameValueAsInputValue(annualSalaryTextField());
    });

    it("super rate state should be equal to text field value", ()=> {
        assertThatStateHasTheSameValueAsInputValue(superRateTextField());
    });

    it("clicking on the generate payslip button, should called  validate", () => {
        generatePayslipButton().simulate('click');
        expect(employeeValidation.validate).toHaveBeenCalled();
    });

    it("when generate payslip button is callend, and if validation returns true, then generatePayslip should be called", () => {
        isEmployeeDataValidSpy.and.returnValue(true);
        generatePayslipButton().simulate('click');
        expect(mockGeneratePayslipIsCalled).toBeTruthy();
    });

    it("when generate payslip button is called, and if validation returns false, then generatePayslip should NOT be called", () => {
        isEmployeeDataValidSpy.and.returnValue(false);
        generatePayslipButton().simulate('click');
        expect(mockGeneratePayslipIsCalled).toBeFalsy();
    });


    it("when first name text field has a number, then is-invalid class is added onto it", () =>{
        updateInputWithValue(firstNameTextField(),"-1");
        expect(firstNameTextField().hasClass(CLASS_NAME_FOR_INVALID_FIELD_ENTRY)).toBeTruthy();
    });

    it("when first name text field is empty, then is-invalid class is added onto it", () =>{
        updateInputWithValue(firstNameTextField(),"");
        expect(firstNameTextField().hasClass(CLASS_NAME_FOR_INVALID_FIELD_ENTRY)).toBeTruthy();
    });

    it("when first name text field is filled, then first name text field should not have is-invalid class", () =>{
        updateInputWithValue(firstNameTextField(),"Joe");
        expect(firstNameTextField().hasClass(CLASS_NAME_FOR_INVALID_FIELD_ENTRY)).toBeFalsy();
    });




    it("when last name text field has a number, then is-invalid class is added onto it", () =>{
        updateInputWithValue(lastNameTextField(),"-1");
        expect(lastNameTextField().hasClass(CLASS_NAME_FOR_INVALID_FIELD_ENTRY)).toBeTruthy();
    });

    it("when last name text field is empty, then is-invalid class is added onto it", () =>{
        updateInputWithValue(lastNameTextField(),"");
        expect(lastNameTextField().hasClass(CLASS_NAME_FOR_INVALID_FIELD_ENTRY)).toBeTruthy();
    });

    it("when last name text field is filled, then first name text field should not have is-invalid class", () =>{
        updateInputWithValue(lastNameTextField(),"Joe");
        expect(lastNameTextField().hasClass(CLASS_NAME_FOR_INVALID_FIELD_ENTRY)).toBeFalsy();
    });

    it("when salary text field has a non numeric, then is-invalid class is added onto it ", () =>{
        updateInputWithValue(annualSalaryTextField(),"a thousand");
        expect(annualSalaryTextField().hasClass(CLASS_NAME_FOR_INVALID_FIELD_ENTRY)).toBeTruthy();
    });

    it("when salary text field has a number, then is-invalid class is added onto it ", () =>{
        updateInputWithValue(annualSalaryTextField(),"1000");
        expect(annualSalaryTextField().hasClass(CLASS_NAME_FOR_INVALID_FIELD_ENTRY)).toBeFalsy();
    });

    it("when super has a non numeric, then is-invalid class is added onto it ", () =>{
        updateInputWithValue(superRateTextField(),"nine percent");
        expect(superRateTextField().hasClass(CLASS_NAME_FOR_INVALID_FIELD_ENTRY)).toBeTruthy();
    });

    it("when super has a numeric value, then is-invalid class is added onto it ", () =>{
        updateInputWithValue(superRateTextField(),"9");
        expect(superRateTextField().hasClass(CLASS_NAME_FOR_INVALID_FIELD_ENTRY)).toBeFalsy();
    });


});

const updateInputWithValue = (input, value) => {
    input.simulate('change', {target: {value: value,name: input.prop('name')}});
};
const assertThatStateHasTheSameValueAsInputValue = (input) => {
    const valueForInputField = "some value";
    updateInputWithValue(input, valueForInputField);
    expect(wrapper.state().formValues[input.prop('name')]).toBe(valueForInputField);
};