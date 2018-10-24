module.exports = {
    createResponse: (status, token, code, validation, desc, response) => {
        return {
            Error: {
                status: status,
                token: token,
                code: code,
                validation: validation,
                des: desc,
            },
            Response: response
        }
    }
};



