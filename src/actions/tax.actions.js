export const FETCH_TAX_RESULTS_IN_ERROR = 'HAS_ERRORED';
export const LOADING_TAX = 'TAX_IS_LOADING';
export const FETCHING_TAX_IS_SUCCESSFUL = 'TAX_FETCH_DATA_SUCCESS';

export function errorOccurredWhenFindingTax(bool) {
    return {
        type: FETCH_TAX_RESULTS_IN_ERROR,
        hasErrored: bool
    };
}

export function loadingTax(bool) {
    return {
        type: LOADING_TAX,
        isLoading: bool
    };
}

export function findTaxDataIsSuccessful(tax, employeeFormValues) {

    return {
        type: FETCHING_TAX_IS_SUCCESSFUL,
        items: {tax,
        employeeFormValues}
    };
}


export function fetchTax(url, employeeFormValues) {
    return (dispatch) => {
        dispatch(loadingTax(true));
        dispatch(errorOccurredWhenFindingTax(false,employeeFormValues));

        return fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                dispatch(loadingTax(false));

                return response;
            })
            .then((response) => response.json())
            .then((tax) => dispatch(findTaxDataIsSuccessful(tax,employeeFormValues)))
            .catch(() => dispatch(errorOccurredWhenFindingTax(true)));
    };
}