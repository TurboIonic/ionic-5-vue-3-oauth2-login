import { HomeService, ResponseError } from "@/services/home.service";

const state = {
    responseData: "",
    responseErrorCode: 0,
    responseError: "",
    fullscreenStatus: true,
    previewList: [],
    previewIndex: 0,
    previewStatus: false
};

const getters = {
    responseErrorCode: (state: { responseErrorCode: any }) => {
        return state.responseErrorCode;
    },
    responseError: (state: { responseError: any }) => {
        return state.responseError;
    }
};

const actions = {
    async loadMessages(context: any, payload: string) {
        context.commit("dataRequest");
        try {
            const resp = await HomeService.loadMessages(payload);
            context.commit("dataSuccess", resp);
            return resp;
        } catch (e) {
            if (e instanceof ResponseError) {
                context.commit("dataError", {
                    errorMessage: e.errorMessage,
                    responseErrorCode: e.errorCode
                });
            }
            return e.message;
        }
    },
    async loadArticles(context: any, payload: string) {
        context.commit("dataRequest");
        try {
            const resp = await HomeService.loadArticles(payload);
            context.commit("dataSuccess", resp);
            return resp;
        } catch (e) {
            if (e instanceof ResponseError) {
                context.commit("dataError", {
                    errorMessage: e.errorMessage,
                    responseErrorCode: e.errorCode
                });
            }
            return e.message;
        }
    },
    async createArticle(context: any, payload: any) {
        context.commit("dataRequest");
        try {
            const resp = await HomeService.createArticle(payload);
            context.commit("dataSuccess", resp);
            return resp;
        } catch (e) {
            if (e instanceof ResponseError) {
                context.commit("dataError", {
                    errorMessage: e.errorMessage,
                    responseErrorCode: e.errorCode
                });
            }
            return e.message;
        }
    },
    async updateArticle(context: any, payload: any) {
        context.commit("dataRequest");
        try {
            const resp = await HomeService.updateArticle(payload);
            context.commit("dataSuccess", resp);
            return resp;
        } catch (e) {
            if (e instanceof ResponseError) {
                context.commit("dataError", {
                    errorMessage: e.errorMessage,
                    responseErrorCode: e.errorCode
                });
            }
            return e.message;
        }
    },
    async deleteArticle(context: any, payload: any) {
        context.commit("dataRequest");
        try {
            const resp = await HomeService.deleteArticle(payload);
            context.commit("dataSuccess", resp);
            return resp;
        } catch (e) {
            if (e instanceof ResponseError) {
                context.commit("dataError", {
                    errorMessage: e.errorMessage,
                    responseErrorCode: e.errorCode
                });
            }
            return e.message;
        }
    },
    async getArticleById(context: any, payload: any) {
        context.commit("dataRequest");
        try {
            const resp = await HomeService.getArticleById(payload);
            context.commit("dataSuccess", resp);
            return resp;
        } catch (e) {
            if (e instanceof ResponseError) {
                context.commit("dataError", {
                    errorMessage: e.errorMessage,
                    responseErrorCode: e.errorCode
                });
            }
            return e.message;
        }
    },
    async uploadImage(context: any, payload: any) {
        context.commit("dataRequest");
        try {
            const resp = await HomeService.uploadImage(payload);
            context.commit("dataSuccess", resp);
            return resp;
        } catch (e) {
            if (e instanceof ResponseError) {
                context.commit("dataError", {
                    errorMessage: e.errorMessage,
                    responseErrorCode: e.errorCode
                });
            }
            return e.message;
        }
    },
    async like(context: any, payload: any) {
        context.commit("dataRequest");
        try {
            const resp = await HomeService.like(payload);
            context.commit("dataSuccess", resp);
            return resp;
        } catch (e) {
            if (e instanceof ResponseError) {
                context.commit("dataError", {
                    errorMessage: e.errorMessage,
                    responseErrorCode: e.errorCode
                });
            }
            return e.message;
        }
    },
    async robot(context: any, payload: any) {
        context.commit("dataRequest");
        try {
            const resp = await HomeService.robot(payload);
            context.commit("dataSuccess", resp);
            return resp;
        } catch (e) {
            if (e instanceof ResponseError) {
                context.commit("dataError", {
                    errorMessage: e.errorMessage,
                    responseErrorCode: e.errorCode
                });
            }
            return e.message;
        }
    },
    changeFullscreenStatus(context, payload) {
        context.commit("fullscreenStatus", payload)
    },
    changePreviewList(context, payload) {
        context.commit("previewList", payload)
    },
    changePreviewIndex(context, payload) {
        context.commit("previewIndex", payload)
    },
    changePreviewStatus(context, payload) {
        context.commit("previewStatus", payload)
    }
};

const mutations = {
    dataRequest(state: {
        responseError: string;
        responseErrorCode: number;
    }) {
        state.responseError = "";
        state.responseErrorCode = 0;
    },
    dataSuccess(state: { responseData: string }, payload: any) {
        state.responseData = payload;
    },
    dataError(state: {
        responseError: any;
        responseErrorCode: any;
        }, {errorCode, errorMessage}: any) {
        state.responseError = errorMessage;
        state.responseErrorCode = errorCode;
    },
    fullscreenStatus(state, payload) {
        state.fullscreenStatus = payload
    },
    previewList(state, payload) {
        state.previewList = payload
    },
    previewIndex(state, payload) {
        state.previewIndex = payload
    },
    previewStatus(state, payload) {
        state.previewStatus = payload
    }
}

export const home = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
