import { configureStore } from "@reduxjs/toolkit";

import todosSlice from "./services/ShowList";
import changeSlice from "../redux/slices/EditSlice";

const store = configureStore({
    reducer: {
        item_action: changeSlice,
        todos: todosSlice,
    }
});
export default store;