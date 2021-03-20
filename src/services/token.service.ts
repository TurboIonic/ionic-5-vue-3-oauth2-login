const USER_KEY = "current_user";
const TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";
const UserService = {
    getUser() {
        return localStorage.getItem(USER_KEY) ? JSON.parse(<string>localStorage.getItem(USER_KEY)) : {};
    },

    saveUser(currentUser: any) {
        localStorage.setItem(USER_KEY, JSON.stringify(currentUser));
    },

    removeUser() {
        localStorage.removeItem(USER_KEY);
    },
}
const TokenService = {
    getToken() {
        return localStorage.getItem(TOKEN_KEY);
    },

    saveToken(accessToken: string) {
        localStorage.setItem(TOKEN_KEY, accessToken);
    },

    removeToken() {
        localStorage.removeItem(TOKEN_KEY);
    },

    getRefreshToken() {
        return localStorage.getItem(REFRESH_TOKEN_KEY);
    },

    saveRefreshToken(refreshToken: string) {
        localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    },

    removeRefreshToken() {
        localStorage.removeItem(REFRESH_TOKEN_KEY);
    }
};

export { TokenService, UserService };
