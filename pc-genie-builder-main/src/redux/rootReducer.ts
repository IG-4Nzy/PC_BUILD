import { combineReducers } from "@reduxjs/toolkit";
import { layoutReducer } from "./slice";

export default combineReducers({
  layoutReducer: layoutReducer
});
