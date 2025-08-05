import {createSlice} from "@reduxjs/toolkit";

export const registrosSlice = createSlice ({
    name:"registrosSlice",
    initialState: {
        registros : [],
        filteredRegistros: [],
    },
    reducers:{
        onLoadRegistros : (state,action) =>{
            const {payload} = action;
            state.registros = payload;
            
        },
        onAddRegistro : (state, action) => {
            const {payload} = action;
            state.registros = [payload, ...state.registros]

            // Actualizar también la lista filtrada para reflejar el cambio
            state.filteredRegistros = [...state.registros]; 
            
        }, 
        onDeleteRegistro: (state, action) => {
            const {payload} = action;
            //payload es el id del registro que se va a eliminar
            const filteredRegistros  = state.registros.filter((r) => r.id !== payload);
            state.registros = filteredRegistros;      
            
            // Actualizar también la lista filtrada para reflejar el cambio
            state.filteredRegistros = state.registros.filter((r) => r.id !== payload); 
        },
        onFilterRegistros: (state, action) => {
            const { payload } = action; // "op1", "op2" o "op3"
            let filtered = [];
      
            switch (payload) {
              case "op2": // Últimos 7 días
                filtered = state.registros.filter((registro) => {
                  const today = new Date();
                  const sevenDaysAgo = new Date();
                  sevenDaysAgo.setDate(today.getDate() - 7);
                  return new Date(registro.fecha) >= sevenDaysAgo;
                });
                break;
              case "op3": // Últimos 30 días
                filtered = state.registros.filter((registro) => {
                  const today = new Date();
                  const thirtyDaysAgo = new Date();
                  thirtyDaysAgo.setDate(today.getDate() - 30);
                  return new Date(registro.fecha) >= thirtyDaysAgo;
                });
                break;
              default: // "op1" (Todos)
                filtered = state.registros;
                break;
            }
      
            state.filteredRegistros = filtered;
          },

    }
});

export const {onLoadRegistros , onAddRegistro, onDeleteRegistro, onFilterRegistros} = registrosSlice.actions
export default registrosSlice.reducer