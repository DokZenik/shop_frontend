// import React from 'react';
import Cookie from "js-cookie"

const SetCookie = (cookieName, usrin) => {
    Cookie.set(cookieName, usrin)

};

export default SetCookie;