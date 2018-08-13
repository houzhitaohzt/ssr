/**
 * @author: houzhitao
 * @since: 2018-05-31 14:29
 */

import Api from "./Api";
import { USER_API, CITY_API } from "./Config";

console.log(' %c NODE_ENV=' + process.env.NODE_ENV , 'color: pink;');

// if(process.env.NODE_ENV === "development"){
//     Api.USER_API = WebData.wshifuUserApi;
//     Api.CITY_API = WebData.wshifuCityApi;
// }else{
//     Api.USER_API = USER_API;
//     Api.CITY_API = CITY_API;
// }

Api.USER_API = USER_API;
Api.CITY_API = CITY_API;

export default Api;