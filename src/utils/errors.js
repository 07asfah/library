export class APIError extends Error {
    constructor(message, status, code) {
        super(message);
        this.name = 'APIError';
        this.status = status;
        this.code = code;
    }
}

export class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ValidationError';
    }
}

export const handleAPIError = (error) => {
    if (error instanceof APIError || error instanceof ValidationError) {
        throw error;
    }

    if (error.response) {
        throw new APIError(
            error.response.data?.message || 'An error occurred with the API request',
            error.response.status,
            error.response.data?.code
        );
    }

    if (error.request) {
        throw new APIError('No response received from the server', 503);
    }

    throw new APIError('Failed to make the request', 500);
}; 