import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { string_data } from '../../data/static_data.jsx'

const initialState = {

}

let result;
function fetchMyData(i) {
    return new Promise((resolve, reject) => {
        result = setTimeout(() => resolve(string_data.items), i * 1000);
        setTimeout(reject, 5000);
    });
}

const fetchProducts = createAsyncThunk('todos/fetchProducts', async (num) => {
    return await fetchMyData(num);
})

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state, action) => {
                clearTimeout(result);
                return "fetching data...";
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                return action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                return "no data...";
            });
    }
})

export const selectItems = state => state.todos;
export const { showItems } = todosSlice.actions;
export { fetchProducts };
export default todosSlice.reducer; 