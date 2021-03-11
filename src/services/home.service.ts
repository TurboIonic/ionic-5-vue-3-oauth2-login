import ApiService from "./api.service";

class ResponseError extends Error {
    errorCode: any;
    errorMessage: any;
    constructor(errorCode: any, message: string | undefined) {
        super(message);
        this.name = this.constructor.name;
        if (message != null) {
            this.message = message;
        }
        this.errorCode = errorCode;
    }
}

const HomeService = {
    loadArticles: async function(Owner = "Minne") {
        try {
            return ApiService.get("/articles?Owner=" + Owner);
        } catch (error) {
            throw new ResponseError(
                error.status,
                error.error.message
            );
        }
    },
    createArticle: async function(playload: any) {
        try {
            return ApiService.post("/article", playload);
        } catch (error) {
            throw new ResponseError(
                error.status,
                error.error.message
            );
        }
    }
}

export { HomeService, ResponseError };
