import authReducer from "./reducers/authReducer";
import cartReducer from "./reducers/cartReducer";
import homeReducer from "./reducers/homeReducer";

const rootReducers = {
    home: homeReducer,
    auth: authReducer,
    cart: cartReducer
}

export default rootReducers