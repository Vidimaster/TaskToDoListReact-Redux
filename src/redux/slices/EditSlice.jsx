import { createSlice } from "@reduxjs/toolkit";
import { ListState } from '../../data/typescrypt.ts';

const initialState = {
    items: [

    ],
    total: 0,
    mode: ListState.show_all
}



const changeSlice = createSlice({
    name: 'item_action',
    initialState,
    reducers: {
        toggleItem: (state, action) => {

            let index = state.items.findIndex(item => item.id === action.payload);
            if (index !== -1) {
                state.items[index].state === "inactive" ? state.items[index].state = "active" : state.items[index].state = "inactive";
            }
        },
        addItem: (state, action) => {
            state.items.push({ id: crypto.randomUUID(), text: action.payload, state: "active" })
        },

        deleteItemAll: (state, action) => {
            state.items = state.items.filter(item => item.state !== "inactive");
        },

        setInitial: (state, action) => {
            state.items = action.payload.items
        },

        setDisplayList: (state, action) => {
            state.mode = action.payload
        },

    }
});

export const selectItems = state => state.item_action;
export const selectTotal = state => state.item_action.total;
export const selectMode = state => state.item_action.mode;
export const selectAcitveListLenght = state => state.item_action.items.filter(value => value.state === "active").length;

export const { toggleItem, deleteItem, deleteItemAll, setTotal, setInitial, addItem, setDisplayList } = changeSlice.actions;
export default changeSlice.reducer; 