import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    talleres: [],
    isLoadingTalleres: false,
    errorTalleres: null
}

const talleresSlice = createSlice({
    name: 'talleres',
    initialState: initialState,
    reducers: {
        talleresRequest: (state) => {
            state.isLoadingTalleres = true;
            state.errorTalleres = null;
        },
        fillTalleres: (state, action) => {
            state.talleres = action.payload;
            state.isLoadingTalleres = false;
            state.errorTalleres = null;
        },
        talleresFail: (state, action) => {
            state.errorTalleres = action.payload;
            state.isLoadingTalleres = false;
        },
        editTaller: (state, action) => {
            state.isLoadingTalles = false;
            state.talles = state.talles.map((item) =>
              action.payload.id == item.id ? { ...item, ...action.payload } : item
            );
            state.successRequest = "editTaller";
          },

    }
})

export const { talleresRequest, fillTalleres, talleresFail, editTaller } =
talleresSlice.actions;

export default talleresSlice.reducer;
