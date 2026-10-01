const MAX_CODE_LENGTH = 20000;

function validateCode(code) {

    if (
        typeof code !== "string"
    ) {
        throw new Error(
            "Invalid code."
        );
    }


    if (
        code.length > MAX_CODE_LENGTH
    ) {
        throw new Error(
            "Code is too long."
        );
    }


    return true;
}


module.exports = {
    validateCode
};
