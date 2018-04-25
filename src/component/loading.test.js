import React from 'react';
import {shallow} from 'enzyme';
import Loading, {GETTING_TAX,SAVING_PAYSLIP,ID_OF_LOADER} from "./loading";

const findLoaderDiv = (wrapper) => {
    return wrapper.find("#" + ID_OF_LOADER);
};

describe("Unit tests for loading component", () => {

    it("It should render message equal to SAVING_PAYSLIP when savingPayslip prop is true",() => {
        const wrapper = shallow(<Loading isSavingPayslip={true}/>);
        expect(findLoaderDiv(wrapper).length).toBe(1);
        expect(findLoaderDiv(wrapper).text()).toBe(SAVING_PAYSLIP);
    });

    it("It should render message equal to GETTING_TAX when savingPayslip prop is true",() => {
        const wrapper = shallow(<Loading loadingTax={true}/>);
        expect(findLoaderDiv(wrapper).length).toBe(1);
        expect(findLoaderDiv(wrapper).text()).toBe(GETTING_TAX);
    });

    it("It should not render a loading div when hasError is true",() => {
        const wrapper = shallow(<Loading hasError={true}/>);
        expect(findLoaderDiv(wrapper).length).toBe(0);
    });

});