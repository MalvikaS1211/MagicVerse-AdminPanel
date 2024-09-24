
    export const isAuthenticated = (state) => {
        if (state.auth) return true;
        return false;
    };
    