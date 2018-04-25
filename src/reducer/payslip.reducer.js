import {POST_PAYSLIP_RESULTED_IN_ERROR,PAYSLIP_IS_SAVED,SAVING_POST} from "../actions/payslip.actions";


export function postingPayslipHasErrored(state = false, action) {
    switch (action.type) {
        case POST_PAYSLIP_RESULTED_IN_ERROR:
            return action.hasErrored;

        default:
            return state;
    }
}

export function isSavingPayslip(state = false, action) {
    switch (action.type) {
        case SAVING_POST:
            return action.isSaving;

        default:
            return state;
    }
}

export function payslip(state = [], action) {
    switch (action.type) {
        case PAYSLIP_IS_SAVED:
            return action.payslip;

        default:
            return state;
    }
}