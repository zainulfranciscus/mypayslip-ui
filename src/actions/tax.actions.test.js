import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'
import {fetchTax,loadingTax,findTaxDataIsSuccessful, errorOccurredWhenFindingTax} from './tax.actions';

const mockTaxJson = {
    "status": 200,
    "message": "Success",
    "responseObject": {
        "primaryKey": {"minTaxableIncome": 37001, "maxTaxableIncome": 80000},
        "baseTax": 3572,
        "taxPerDollarInCents": 32.5,
        "taxPerDollarOver": 37000,
        "maxTaxableIncome": 80000,
        "minTaxableIncome": 37001
    }
};

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("tax action creators unit tests", () => {

    const url = "url";
    let store;

    beforeEach(() => {
        fetchMock.reset();
        store = mockStore({ items: [] });
    });

    afterEach(() => {
        fetchMock.restore()
    });

    it("when server response is OK then expected actions are itemIsLoading,errorOccurredWhenFindingTax, and findTaxDataIsSuccessful ", () => {

        fetchMock.getOnce(url,{body:mockTaxJson});
        const expectedActions = [loadingTax(true),errorOccurredWhenFindingTax(false),loadingTax(false),findTaxDataIsSuccessful(mockTaxJson)];
        return store.dispatch(fetchTax(url)).then(() => {
            const actions = store.getActions;
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it("when server response is 400 expected actions is loadingTax and errorOccurredWhenFindingTax", () => {

        fetchMock.mock(url,400);
        const expectedActions = [loadingTax(true),errorOccurredWhenFindingTax(false),errorOccurredWhenFindingTax(true)];
        return store.dispatch(fetchTax(url)).then(() => {
            const actions = store.getActions;
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});