import {createSlice} from "@reduxjs/toolkit";

export const userSlice = createSlice ({
    name : "userSlice",
    initialState: {
        userData: JSON.parse(localStorage.getItem("userData")) || null
    },
    reducers:{
        //tiene funciones:
        //recibe un state : el estado actual
        //necesita un payload (apikey y iduser) entonces lo que tb va a recibir es una accion
        //dentro de la accion voy a recibir el payload
        onLogin: (state, action) => {
            const {payload} = action; //destructuring
            state.userData = payload;
            //el estado actual del userData, que en un inicio era null, ahora es lo que se envio al payload
            localStorage.setItem("userData", JSON.stringify(payload));
        },
        onLogout: (state)=>{
            state.userData = null;
            localStorage.removeItem("userData");
        },
        onSignUp : (state, action) => {
            const {payload} = action;
            state.userData = payload;
            localStorage.setItem("userData", JSON.stringify(payload));
        }
        
    }

});

export const {onLogin, onLogout, onSignUp} = userSlice.actions;
export default userSlice.reducer