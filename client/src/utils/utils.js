/* 
    Created this file to store utility functions that may be used in several
    places. Logout is now used in both headers. There may be more functions
    that could be added.
*/

export const logout = () => {
    console.log("clicked");
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("account");
};
