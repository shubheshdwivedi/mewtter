const successResponseObject = (data) => {
    return {
        success: true,
        data: data,
        error: null
    }
};

const errorResponseObject = (message) => {
    return {
        success: false,
        data: null,
        error: {
            message: message
        }

    }
};

export default {successResponseObject, errorResponseObject};




