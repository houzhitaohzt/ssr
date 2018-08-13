/**
 * @author: houzhitao
 * @since: 2018-06-04 13:29
 */

const pathsConfig = {
    user_url: process.env.USER_URL,
    user_api: process.env.USER_API,
    city_api: process.env.CITY_API
};
//
// if(window.location.protocol == "https:"){
//     for(let [k, v] of Object.entries(pathsConfig)){
//         pathsConfig[k] = v.replace('http', 'https');
//     }
// };

export const USER_URL = pathsConfig.user_url;
export const USER_API = pathsConfig.user_api;
export const CITY_API = pathsConfig.city_api;

export const WWW_URL = process.env.WWW_URL;
export const WORKER_URL = process.env.WORKER_URL;
export const MASTER_URL = process.env.MASTER_URL;
export const SERVICE_URL = process.env.SERVICE_URL;
export const EVENT_URL = process.env.EVENT_URL;
export const FRONTEND_URL = process.env.FRONTEND_URL;
export const APP_URL = process.env.APP_URL;


