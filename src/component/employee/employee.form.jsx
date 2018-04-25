import React, {Component} from 'react';

export const ID_OF_FIRST_NAME_TEXT_FIELD = "firstName";
export const ID_OF_LAST_NAME_TEXT_FIELD = "lastName";
export const ID_OF_ANNUAL_SALARY_TEXT_FIELD = "salary";
export const ID_OF_SUPER_RATE_TEXT_FIELD = "superRate";
export const ID_OF_GENERATE_PAYSLIP_BUTTON = "generatePayslipButton";
export const CLASS_NAME_FOR_INVALID_FIELD_ENTRY = "is-invalid";
export const EMPLOYEE_FORM_CONTAINER = "employeeForm";

export default class EmployeeForm extends Component {


    constructor(props) {
        super(props);
        let formValues = {};
        formValues[ID_OF_FIRST_NAME_TEXT_FIELD] = '';
        formValues[ID_OF_LAST_NAME_TEXT_FIELD] = '';
        formValues[ID_OF_ANNUAL_SALARY_TEXT_FIELD] = '';
        formValues[ID_OF_SUPER_RATE_TEXT_FIELD] = '';

        this.state = {
            formValues: formValues,
            isFirstNameValid: false,
            isLastNameValid: false,
            isSalaryValid: false,
            isSuperValid: false
        }


    }

    handleChange(event) {

        const name = event.target.name;
        const value = event.target.value;

        let updatedFormValues = this.state.formValues;
        updatedFormValues[name] = value;
        this.setState({formValues: updatedFormValues});

    }

    validateFirstName(event) {
        this.handleChange(event);
        let isValidFirstName = this.props.validation.withFirstName(event.target.value).validateFirstName();
        this.setState({isFirstNameValid: isValidFirstName});
    }

    validateLastName(event) {
        this.handleChange(event);
        let isValidLastName = this.props.validation.withLastName(event.target.value).validateLastName();
        this.setState({isLastNameValid: isValidLastName});
    }

    validateSalary(event) {
        this.handleChange(event);
        let isValidSalary = this.props.validation.withSalary(event.target.value).validateSalary();
        this.setState({isSalaryValid: isValidSalary});
    }

    validateSuper(event) {
        this.handleChange(event);
        let isValidSuper = this.props.validation.withSuper(event.target.value).validateSuper();
        this.setState({isSuperValid: isValidSuper});
    }

    generatePayslip() {
        let validation = this.props.validation.validate();
        if (validation.isEmployeeDataValid()) {
            this.props.generatePayslip(this.state.formValues);
        }
    }

    render() {

        return (
            <div id={EMPLOYEE_FORM_CONTAINER}>

                <h1>Employee Info</h1>
                <div className="form-group row">
                    
                        <div className="col-12 col-md-4">
                            <input type="text" id={ID_OF_FIRST_NAME_TEXT_FIELD}
                                   name={ID_OF_FIRST_NAME_TEXT_FIELD}
                                   onChange={this.validateFirstName.bind(this)}
                                   value={this.state.formValues[ID_OF_FIRST_NAME_TEXT_FIELD]}
                                   placeholder="first name"
                                   className={
                                       this.state.isFirstNameValid ? "form-control" : CLASS_NAME_FOR_INVALID_FIELD_ENTRY + " form-control"
                                   }/>


                            <p id="errorMessageforFirstName" className={
                                this.state.isFirstNameValid ? "d-none" : "error-msg"
                            }>Please enter a first name. First name cannot be a number </p>

                        </div>
                        <div className="col-12 col-md-4">
                            <input type="text" id={ID_OF_LAST_NAME_TEXT_FIELD}
                                   name={ID_OF_LAST_NAME_TEXT_FIELD}
                                   onChange={this.validateLastName.bind(this)}
                                   value={this.state.formValues[ID_OF_LAST_NAME_TEXT_FIELD]}
                                   placeholder="last name"
                                   className={
                                       this.state.isLastNameValid ? "form-control" : CLASS_NAME_FOR_INVALID_FIELD_ENTRY + " form-control"
                                   }/>
                            <p id="errorMessageforLastName" className={
                                this.state.isLastNameValid ? "d-none" : "error-msg"
                            }>Please enter a last name. Last name cannot be a number </p>

                        </div>
                    

                </div>
                
                    <div className="form-group row">
                        <div className="col-12 col-md-4">
                           <div className="input-group">
                                <div className="input-group-prepend">
                                    <div className="input-group-text">$</div>
                                </div>
                                <input type="text" id={ID_OF_ANNUAL_SALARY_TEXT_FIELD}
                                       name={ID_OF_ANNUAL_SALARY_TEXT_FIELD}
                                       onChange={this.validateSalary.bind(this)}
                                       value={this.state.formValues[ID_OF_ANNUAL_SALARY_TEXT_FIELD]}
                                       placeholder="Annual Salary"
                                       className={
                                           this.state.isSalaryValid ? "form-control" : CLASS_NAME_FOR_INVALID_FIELD_ENTRY + " form-control"
                                       }/>
                                <div className="input-group-prepend">
                                    <div className="input-group-text">.00</div>
                                </div>
                            </div>
                             <p id="errorMessageForSalary" className={
                                this.state.isSalaryValid ? "d-none" : "error-msg"
                            }>Please enter a salary, which must be a round number </p>
                           

                        </div>
                        <div className="col-12 col-md-4">
                            <input type="text" id={ID_OF_SUPER_RATE_TEXT_FIELD}
                                   name={ID_OF_SUPER_RATE_TEXT_FIELD}
                                   onChange={this.validateSuper.bind(this)}
                                   value={this.state.formValues[ID_OF_SUPER_RATE_TEXT_FIELD]}
                                   placeholder="Super Rate"
                                   className={
                                       this.state.isSuperValid ? "form-control" : CLASS_NAME_FOR_INVALID_FIELD_ENTRY + " form-control"
                                   }/>
                             <p id="errorMessageForSuper" className={
                                this.state.isSuperValid ? "d-none" : "error-msg"
                            }>Please enter a number for super. </p>
                        </div>
                    </div>

                    <div className="row">
                        <div className="input-group col-12 col-md-4">

                           
                        </div>
                        <div className="input-group col-12 col-md-4">
                           
                        </div>
                    </div>
                
                <div className="row justify-content-end">
                    <div className="input-group col-6 button-padding">
                        <button id={ID_OF_GENERATE_PAYSLIP_BUTTON}
                                name={ID_OF_GENERATE_PAYSLIP_BUTTON}
                                onChange={this.handleChange.bind(this)}
                                onClick={this.generatePayslip.bind(this)}
                                className="btn btn-primary "
                                value={this.state.formValues[ID_OF_GENERATE_PAYSLIP_BUTTON]}>Generate Payslip
                        </button>
                    </div>
                </div>


            </div>
        );
    }
}