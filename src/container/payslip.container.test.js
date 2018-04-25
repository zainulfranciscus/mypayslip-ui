import React from "react";
import PayslipContainer from "./payslip.container";
import {ERROR_MESSAGE_ID} from "../component/error";
import {EMPLOYEE_FORM_CONTAINER} from "../component/employee/employee.form";
import {ID_FOR_PAYSLIP_CONTAINER} from "../component/payslip/payslip";
import {shallow, mount} from 'enzyme';
import configureStore from 'redux-mock-store';
import PayslipCalculator from "../component/payslip/payslip.calculator";
import {setupMockCalculatorMethods} from "../component/payslip/payslip.test";
import {ID_OF_LOADER} from "../component/loading";

describe("unit tests for PayslipContainer", () => {

    const mockStore = configureStore();
    let store;
    const mockCalculator = new PayslipCalculator();
    const mockItems = {
        tax: {
            status: 200,
            responseObject: {
                "baseTax": "540.00",
                "taxPerDollarInCents": "32.50",
                "taxPerDollarOver": "3752.00",
                "maxTaxableIncome": "18200.00",
                "minTaxableIncome": "10.00"
            }
        },
        employeeFormValues: {}

    };

    const savingPayslipResponse = {
        status: 400,
        message: "payslip for this person already exist"
    };

    const findErrorDiv = (wrapper) => {
        return wrapper.find("#" + ERROR_MESSAGE_ID);
    };

    beforeEach(() => {
        setupMockCalculatorMethods(mockCalculator);
    });
    it("when isLoading props is true then loader should be rendered ", () => {


        store = mockStore({loadingTax: true, items: mockItems});
        const wrapper = mount(<PayslipContainer store={store} calculator={mockCalculator} />);
        expect(wrapper.find("#" + ID_OF_LOADER).length).toBe(1);
    });

    it("when an error occured when retrieving tax for an employee, then error message shold be rendered ", () => {

        store = mockStore({
            errorWhenGettingTax: true
        });
        const wrapper = mount(<PayslipContainer store={store}  />);
        expect(findErrorDiv(wrapper).length).toBe(1);

    });

    it("when an error occured when saving a payslip, then error message should be rendered ", () => {

        store = mockStore({
            postingPayslipHasErrored: {
                hasErrored: true,
                employeeFormValues: {}
            }
        });
        const wrapper = mount(<PayslipContainer store={store}/>);
        expect(findErrorDiv(wrapper).length).toBe(1);

    });

    it("when rest API returns a status of 400 after saving a payslip, then  error message should be rendered", () =>{

        store = mockStore({
            payslip: {
                status: 400,
                message: 'Unable to save payslip',
                responseObject: {}
            }
        });

        const wrapper = mount(<PayslipContainer store={store}/>);
        expect(findErrorDiv(wrapper).length).toBe(1);

    });

    it("when rest API returns a status of 400 after fetching a tax, then  error message should be rendered", () =>{

        store = mockStore({
            items:{
                tax: {
                    status: 400,
                    message: 'Salary for an employee must be more than 0',
                    responseObject: {}
                }
            }
            
        });

        const wrapper = mount(<PayslipContainer store={store}/>);
        expect(findErrorDiv(wrapper).length).toBe(1);

    });

    it("when hasErrored is false and isLoading is false then employee form should be rendered", () => {


        store = mockStore({
            errorWhenGettingTax: false,
            isLoading: false,
            items: mockItems,
            payslip: {savingPayslipResponse}
        });
        const wrapper = mount(<PayslipContainer store={store} calculator={mockCalculator}/>);
        expect(wrapper.find("#" + EMPLOYEE_FORM_CONTAINER).length).toBe(1);

    });

    it("when employeeFormValues is set and tax is set then payslip should be rendered", () => {
        store = mockStore({
            items: mockItems,
            payslip: {savingPayslipResponse}
        });
        const wrapper = mount(<PayslipContainer store={store} calculator={mockCalculator}/>);
        expect(wrapper.find("#" + ID_FOR_PAYSLIP_CONTAINER).length).toBe(1);
    });

    it("when employeeFormValues and tax is undefined then payslip should NOT be rendered", () => {
        store = mockStore({
            items: {
                tax: undefined,
                employeeFormValues: undefined
            }
        });
        const wrapper = mount(<PayslipContainer store={store} calculator={mockCalculator}/>);
        expect(wrapper.find("#" + ID_FOR_PAYSLIP_CONTAINER).length).toBe(0);
    })


});