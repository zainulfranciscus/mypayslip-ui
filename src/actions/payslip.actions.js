export const POST_PAYSLIP_RESULTED_IN_ERROR = 'POST_PAYSLIP_RESULTED_IN_ERROR';
export const PAYSLIP_IS_SAVED = 'PAYSLIP_IS_SAVED';
export const SAVING_POST = 'SAVING_POST';

export function erroredWhenPostingPayslip(bool){
    return {
        type: POST_PAYSLIP_RESULTED_IN_ERROR,
        hasErrored: bool
    }
}

export function isPostingPayslip(bool){
    return {
        type:SAVING_POST,
        isSaving: bool
    }
}

export function savingPayslipIsSuccessful(payslip){
    return {
        type: PAYSLIP_IS_SAVED,
        payslip
    }
}

export function postPayslip(url){
    return (dispatch) => {

        dispatch(isPostingPayslip(true));

        return fetch(url,{method: 'POST'})
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                dispatch(isPostingPayslip(false));

                return response;
            })
            .then((response) => response.json())
            .then((payslip) => dispatch(savingPayslipIsSuccessful(payslip)))
            .catch(() => dispatch(erroredWhenPostingPayslip(true)));

    }
}