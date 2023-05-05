import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    search: "",
    classHeaderSearch: "header-controls-search-form form-inline invisible",
    url: "http://localhost:7070/api/items",
    checkedCategories: "",
    cart: [],
    sumPrice: 0

};

export const masterSlice = createSlice({
    name: 'master',
    initialState,
    reducers: {

        setSearch: (state, action) => {
            state.search = action.payload
        },
        setClassHeaderSearch: (state) => {
            if (state.classHeaderSearch === "header-controls-search-form form-inline invisible") {
                state.classHeaderSearch = "header-controls-search-form form-inline"
            } else { state.classHeaderSearch = "header-controls-search-form form-inline invisible" }
        },
        setCheckedCategories: (state, action) => {
            if (action.payload !== "") {
                if (state.search !== "") {
                    state.url = 'http://localhost:7070/api/items?categoryId=' + action.payload + '&q=' + state.search;
                    state.checkedCategories = action.payload;
                } else {
                    state.url = 'http://localhost:7070/api/items?categoryId=' + action.payload;
                    state.checkedCategories = action.payload;
                }
            } else {
                if (state.search !== "") {
                    state.url = 'http://localhost:7070/api/items?q=' + state.search;
                    state.checkedCategories = "";

                } else {
                    state.url = 'http://localhost:7070/api/items';
                    state.checkedCategories = "";
                }
            }

        },
        addToCart: (state, action) => {
            if (state.cart.find(item => item.id === action.payload.id)) {

                let index = state.cart.findIndex(item => item.id === action.payload.id);
                state.cart[index].quantity += action.payload.quantity;
                state.cart[index].sum += action.payload.sum;
                state.sumPrice += action.payload.sum;
            }
            else {
                state.cart = [...state.cart, action.payload];
                state.sumPrice += action.payload.quantity * action.payload.price
            }

        },
        deleteFromCart: (state, action) => {
            state.cart = state.cart.filter(item => item.id !== action.payload.id);
            state.sumPrice = state.sumPrice - action.payload.sum
        }

    }
})


export const {
    setSearch,
    rerenderCatalog,
    setClassHeaderSearch,
    setCheckedCategories,
    addToCart,
    deleteFromCart
} = masterSlice.actions

export default masterSlice.reducer