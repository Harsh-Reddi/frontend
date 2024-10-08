import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import api from "../../api/api";

export const get_category = createAsyncThunk(
    'product/get_category',
    async(_,{rejectWithValue, fulfillWithValue}) => {
        try {
            const {data} = await api.get('/home/get-categories')
            // console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
//End Method

export const get_products = createAsyncThunk(
    'product/get_products',
    async(_,{rejectWithValue, fulfillWithValue}) => {
        try {
            const {data} = await api.get('/home/get-products')
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
//End Method

export const price_range_products = createAsyncThunk(
    'product/price_range_products',
    async(_,{rejectWithValue, fulfillWithValue}) => {
        try {
            const {data} = await api.get('/home/price-range-latest-products')
            console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
//End Method

export const query_products = createAsyncThunk(
    'product/query_products',
    async(query ,{rejectWithValue, fulfillWithValue}) => {
        try {
            const {data} = await api.get(`/home/query-products?category=${query.category}&&rating=${query.rating}
            &&lowPrice=${query.low}&&highPrice=${query.high}&&sortPrice=${query.sortPrice}&&pageNumber=${query.pageNumber}&&searchValue=${query.searchValue ? query.searchValue : ''}`)
            console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
//End Method

export const homeReducer = createSlice({
    name: "home",
    initialState: {
        categories : [],
        products : [],
        totalProduct : 0,
        parPage: 3,
        latest_product: [],
        topRated_product: [],
        discount_product: [],
        priceRange : {
            low: 0,
            high: 100
        }
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
        .addCase(get_category.fulfilled, (state, {payload}) => {
            state.categories = payload.categories
        })
        .addCase(get_products.fulfilled, (state, {payload}) => {
            state.products = payload.products
            state.latest_product = payload.latest_product
            state.topRated_product = payload.topRated_product
            state.discount_product = payload.discount_product
        })
        .addCase(price_range_products.fulfilled, (state, {payload}) => {
            state.latest_product = payload.latest_product
            state.priceRange = payload.priceRange
        })
        .addCase(query_products.fulfilled, (state, {payload}) => {
            state.products = payload.products
            state.totalProduct = payload.totalProduct
            state.parPage = payload.parPage
        })
    }

})

export default homeReducer.reducer