const PROTOCOL_HTTPS = 'https://';
const PROTOCOL_WSS = 'wss://';

export const API_ORIGIN = 'norma.nomoreparties.space/api/';
export const API_ORIGIN_HTTPS = PROTOCOL_HTTPS + API_ORIGIN;
export const API_ORIGIN_WSS = PROTOCOL_WSS + API_ORIGIN;

export const API_INGREDIENTS = API_ORIGIN_HTTPS + 'ingredients';
export const API_ORDERS = API_ORIGIN_HTTPS + 'orders';
export const API_FORGOT_PASSWORD = API_ORIGIN_HTTPS + 'password-reset';
export const API_RESET_PASSWORD = API_ORIGIN_HTTPS + 'password-reset/reset';
export const API_LOGIN = API_ORIGIN_HTTPS + 'auth/login';
export const API_REGISTER = API_ORIGIN_HTTPS + 'auth/register';
export const API_LOGOUT = API_ORIGIN_HTTPS + 'auth/logout';
export const API_TOKEN = API_ORIGIN_HTTPS + 'auth/token';
export const API_USER = API_ORIGIN_HTTPS + 'auth/user';

export const API_WS_ORDERS_ALL = PROTOCOL_WSS + 'norma.nomoreparties.space/orders/all';
export const API_WS_ORDERS_USER = PROTOCOL_WSS + 'norma.nomoreparties.space/orders';

export const MODAL_DETAILS = 'modal-details';
export const MODAL_ORDER = 'modal-order';

export const ACCESS_TOKEN_LIFETIME = 1000*60*20;
export const NUMBER_BUNS_IN_BURGERS = 2;
export const MAX_IDS_ORDER = 10;
