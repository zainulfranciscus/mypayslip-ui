import Error, {ERROR_MESSAGE_ID, SERVER_IS_UNAVAILABLE, SERVER_RETURNED_INVALID_TAX_DATA} from "./error";
import {GOOD_HTTP_RESPONSE} from "../data/json.validator";

import React from 'react';
import {shallow} from 'enzyme';

describe("Unit tests for Error component ", () => {

    const errorMessage = "Please provide a non negative salary";
    const BAD_HTTP_RESPONSE = 400;

    it("should render SERVER_IS_UNAVAILABLE when error happenned when fetching tax", () => {

        const wrapper = shallow(<Error fetchTaxError={true}/>);
        expect(findErrorDiv(wrapper).text()).toBe(SERVER_IS_UNAVAILABLE);

    });

    it("should render that server is unavailable error happenned when doing POST payslip", () => {
        const wrapper = shallow(<Error postPayslipError={true}/>);
        expect(findErrorDiv(wrapper).text()).toBe(SERVER_IS_UNAVAILABLE);
    });

    it("Given a tax response JSON from the server has a 400 HTTP response, then an equivalent message should be rendered ", () => {

        const taxResponseJSON = mockJSON(BAD_HTTP_RESPONSE);

        const wrapper = shallow(<Error taxResponseJSON={taxResponseJSON}/>);
        expect(findErrorDiv(wrapper).text()).toBe(taxResponseJSON.message);

    });

    it("Given a payslip response JSON from the server that has a 400 HTTP response, then an equivalent message should be rendered", () => {

        const payslipResponseJSON = mockJSON(BAD_HTTP_RESPONSE);
        const taxResponseJSON = mockJSON(GOOD_HTTP_RESPONSE);

        const wrapper = shallow(<Error taxResponseJSON={taxResponseJSON} payslipResponseJSON={payslipResponseJSON}/>);
        expect(findErrorDiv(wrapper).text()).toBe(payslipResponseJSON.message);
    });

    it("Given tax JSON with no tax information, then an error message should be rendered", () => {

        const json = {
            status: GOOD_HTTP_RESPONSE,
            message: "This json is missing the response object"
        };

        const wrapper = shallow(<Error taxResponseJSON={json}/>);
        expect(findErrorDiv(wrapper).length).toBe(1);
        expect(findErrorDiv(wrapper).text()).toBe(SERVER_RETURNED_INVALID_TAX_DATA);
    });

    it("Given a tax JSON with empty tax information, then an error message should be rendered",() => {
        const json = {
            status: GOOD_HTTP_RESPONSE,
            message: "This response object has no tax information such as base tax, tax per dollar, etc",
            responseObject:{}
        };

        const wrapper = shallow(<Error taxResponseJSON={json}/>);
        expect(findErrorDiv(wrapper).length).toBe(1);
        expect(findErrorDiv(wrapper).text()).toBe(SERVER_RETURNED_INVALID_TAX_DATA);
    });


    function findErrorDiv(wrapper) {
        return wrapper.find('#' + ERROR_MESSAGE_ID);
    }

    function mockJSON(httpStatusCode) {
        const json = {
            status: httpStatusCode,
            message: "this is a mock json",
            responseObject: {
                "baseTax": "540.00",
                "taxPerDollarInCents": "32.50",
                "taxPerDollarOver": "3752.00",
                "maxTaxableIncome": "18200.00",
                "minTaxableIncome": "10.00"
            }
        };

        return json;
    }
});