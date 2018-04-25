import {connect} from 'react-redux';
import {fetchTax} from '../actions/tax.actions';
import React, {Component} from 'react';
import EmployeeForm, {ID_OF_ANNUAL_SALARY_TEXT_FIELD} from "../component/employee/employee.form";
import Error from "../component/error";
import EmployeeValidation from "../component/employee/employee.validation";
import PayslipCalculator from "../component/payslip/payslip.calculator";
import Payslip from "../component/payslip/payslip";
import {postPayslip} from "../actions/payslip.actions";
import Loading from "../component/loading";
import taxDecorator from "../data/tax.decorator";
import EnvironmentVariablesReader from "./env.variable.reader";

import "../stylesheet/bootstrap/bootstrap-grid.min.css";
import "../stylesheet/bootstrap/bootstrap.min.css";
import "../stylesheet/style.css";

const employeeValidation = new EmployeeValidation();



export class PayslipContainer extends Component {

    getPayslipComponent() {
        const employeeFormValues = this.props.employeeFormValues;
        const tax = this.props.tax;

        let hasEmployees = typeof employeeFormValues !== 'undefined';
        let hasValidTaxData = taxDecorator(tax).hasValidTaxData();

        if (hasEmployees && hasValidTaxData) {
            let payslipCalculator = this.props.calculator || new PayslipCalculator();
            payslipCalculator.setEmployee(employeeFormValues);
            payslipCalculator.setTax(tax);

            const postPayslip = this.props.savePayslip;
            const payslipResponseFromServer = this.props.payslip;

            return <Payslip calculator={payslipCalculator}
                            savePayslip={postPayslip}
                            payslipResponseFromServer={payslipResponseFromServer}/>;
        }


    }

    render() {

        const getTaxDataFromServer = this.props.generatePayslip;
        const hasErrorWhenGettingTax = this.props.errorWhenGettingTax;
        const payslipComponent = this.getPayslipComponent();
        const employeeFormValues = this.props.employeeFormValues;
        const taxResponseJSON = this.props.tax;
        const payslipResponseJSON = this.props.payslip;
        const postingPayslipHasErrored = this.props.postingPayslipHasErrored;
        const isLoadingTax = this.props.loadingTax;
        const isSavingPayslip = this.props.isSavingPayslip;

        return (
            <div className="container">
                <Loading loadingTax={isLoadingTax}
                         isSavingPayslip={isSavingPayslip}
                         hasError={hasErrorWhenGettingTax || postingPayslipHasErrored}/>

                <Error fetchTaxError={hasErrorWhenGettingTax} 
                       postPayslipError={postingPayslipHasErrored}
                       taxResponseJSON={taxResponseJSON}
                       payslipResponseJSON={payslipResponseJSON}/>

                <EmployeeForm validation={employeeValidation}
                              generatePayslip={getTaxDataFromServer}
                              employeeFormValues={employeeFormValues}/>

                {
                    hasErrorWhenGettingTax ? null : (payslipComponent)
                }

            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {

    const envVarReader = new EnvironmentVariablesReader();

    return {
        generatePayslip: (formValues) => {
            const url = envVarReader.getTaxURL(formValues[ID_OF_ANNUAL_SALARY_TEXT_FIELD]);
            dispatch(fetchTax(url, formValues));
        },
        savePayslip: (payslipRequestParameters) => {
            const url = envVarReader.getPayslipURL(payslipRequestParameters);
            dispatch(postPayslip(url));
        }
    };
};


const mapStateToProps = (state) => {

    const decoratedState = stateDecorator(state);
    let employeeFormValues = decoratedState.getEmployeeFormValues();
    let tax = decoratedState.getTax();
   
    return {
        tax: tax,
        employeeFormValues: employeeFormValues,
        errorWhenGettingTax: state.errorWhenGettingTax,
        loadingTax: state.loadingTax,
        postingPayslipHasErrored: state.postingPayslipHasErrored,
        isSavingPayslip: state.isSavingPayslip,
        payslip: state.payslip
    };
};

const stateDecorator = (state) => {

    const itemsIsUndefined = typeof state.items === 'undefined';

    return {

        getTax: () =>{
            if(itemsIsUndefined){
                return;
            }

            return state.items.tax;
        },

        getEmployeeFormValues: ()=>{
            
            if(!itemsIsUndefined){
                return state.items.employeeFormValues;
            }
        }
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(PayslipContainer);