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
    createArticle: async function(payload: any) {
        try {
            return ApiService.post("/article", payload);
        } catch (error) {
            throw new ResponseError(
                error.status,
                error.error.message
            );
        }
    },
    updateArticle: async function(payload: any) {
        try {
            return ApiService.put("/article", payload);
        } catch (error) {
            throw new ResponseError(
                error.status,
                error.error.message
            );
        }
    },
    deleteArticle: async function(payload: any) {
        try {
            return ApiService.delete(`/article/${payload}`,);
        } catch (error) {
            throw new ResponseError(
                error.status,
                error.error.message
            );
        }
    },
    getArticleById: async function(payload: any) {
        try {
            return ApiService.get(`/article/${payload}`);
        } catch (error) {
            throw new ResponseError(
                error.status,
                error.error.message
            );
        }
    },
    uploadImage: function(payload: any) {

        const {blobData, name, ext} = payload;
        const formData = new FormData();
        formData.append('file', blobData, `myimage.${ext}`);
        formData.append('name', name);
        try {
            return ApiService.post(`/upload`, formData);
        } catch (error) {
            throw new ResponseError(
                error.status,
                error.error.message
            );
        }
    },
    like: function(payload: any) {
        try {
            return ApiService.post(`/like/${payload}`, {});
        } catch (error) {
            throw new ResponseError(
                error.status,
                error.error.message
            );
        }
    }
}

export { HomeService, ResponseError };
