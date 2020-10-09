import {combineReducers} from "redux";
import {vkuiReducer} from './vk/reducers';

export default combineReducers({
    vkui: vkuiReducer
});