import {FETCH_TAX_RESULTS_IN_ERROR,LOADING_TAX,FETCHING_TAX_IS_SUCCESSFUL} from "../actions/tax.actions";

export function errorWhenGettingTax(state = false, action) {
    switch (action.type) {
        case FETCH_TAX_RESULTS_IN_ERROR:
            return action.hasErrored;

        default:
            return state;
    }
}

export function loadingTax(state = false, action) {
    switch (action.type) {
        case LOADING_TAX:
            return action.isLoading;

        default:
            return state;
    }
}

export function items(state = [], action) {
    switch (action.type) {
        case FETCHING_TAX_IS_SUCCESSFUL:
            return action.items;

        default:
            return state;
    }
}