import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slices/userSlice";
import { registrosSlice } from "./slices/registrosSlice";
import { actividadesSlice } from "./slices/actividadesSlice";


export const store = configureStore({
    reducer:{
        userSlice: userSlice.reducer,
        registrosSlice : registrosSlice.reducer,
        actividadesSlice : actividadesSlice.reducer,
    }
})