/**
 * @author: houzhitao
 * @since: 2018-05-30 18:02
 * description: 所有store 注入到一起
 */

import homeStore from "../screens/Home/store/homestore";
import loginStore from "../screens/Login/store/loginStore";
import joblogStore from "../screens/JobLog/store/joblogStore";

export default {
    homeStore,
    loginStore,
    joblogStore
};