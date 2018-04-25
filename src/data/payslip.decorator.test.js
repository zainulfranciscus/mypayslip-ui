import payslipDecorator from "./payslip.decorator";
import {GOOD_HTTP_RESPONSE} from "./json.validator";

describe("Payslip decorator unit tests", ()=> {
    it("should return true when status is 200", () => {
        const payslipJson = {
            status: GOOD_HTTP_RESPONSE,
            message: "success",
            responseObject: {}
        };

        expect(payslipDecorator(payslipJson).ok()).toBeTruthy();
    });

    it("should return false when status is 400", () => {
        const payslipJson = {
            status: 400,
            message: "false",
            responseObject: {}
        };

        expect(payslipDecorator(payslipJson).ok()).toBeFalsy();
    });

    it("should return an equivalent message", ()=>{
        const payslipJson = {
            status: GOOD_HTTP_RESPONSE,
            message: "not right",
            responseObject: {}
        };

        expect(payslipDecorator(payslipJson).message()).toBe(payslipJson.message);
    });

    it("should return first name and last name as a full name", ()=>{
        const payslipJson = {
            status: GOOD_HTTP_RESPONSE,
            message: "not right",
            responseObject: {
                employeeFirstName: "Joe",
                employeeLastName: "B."
            }
        };

        expect(payslipDecorator(payslipJson).fullName()).toBe(payslipJson.responseObject.employeeFirstName + " " + payslipJson.responseObject.employeeLastName);
    });

    it("should return null null as full name when names are null", ()=>{
        const payslipJson = {
            status: GOOD_HTTP_RESPONSE,
            message: "not right",
            responseObject: {
                employeeFirstName: null,
                employeeLastName: null
            }
        };

        expect(payslipDecorator(payslipJson).fullName()).toBe(null + " " + null);
    });
});