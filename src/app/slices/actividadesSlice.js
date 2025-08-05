import {createSlice} from "@reduxjs/toolkit";

export const actividadesSlice = createSlice ({
    name : "actividadesSlice",
    initialState: {
        actividades : []
    },
    reducers:{
        onGetActividades: (state, action) => {
            const {payload} = action;
            state.actividades = payload;
        },
    }

});

export const {onGetActividades} = actividadesSlice.actions;
export default actividadesSlice.reducer