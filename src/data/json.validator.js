export const GOOD_HTTP_RESPONSE = 200;

const UNDEFINED_VAR_VALUE = 'undefined';

export default function jsonValidator(json) {
    return {
        jsonExist: () => {
            return typeof json !==  UNDEFINED_VAR_VALUE && json !== null;
        },
        ok: () => {
            return json.status === GOOD_HTTP_RESPONSE;
        },
        hasMessage: () => {
            return typeof json.message !== UNDEFINED_VAR_VALUE;
        },
        message: () => {
            return json.message;
        },
        data: () => {
            return json.responseObject
        },
        dataExist: () => {
            return typeof json.responseObject !== UNDEFINED_VAR_VALUE && json.responseObject !== null;
        }
    }
}