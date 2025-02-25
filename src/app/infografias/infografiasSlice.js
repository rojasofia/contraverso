import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    infografias: [],
    isLoadingInfografias: false,
    errorInfografias: null
}

const infografiasSlice = createSlice({
    name: 'infografias',
    initialState: initialState,
    reducers: {
        infografiasRequest: (state) => {
            state.isLoadingInfografias = true;
            state.errorInfografias = null;
        },
        fillInfografias: (state, action) => {
            state.infografias = action.payload;
            state.isLoadingInfografias = false;
            state.errorInfografias = null;
        },
        infografiasFail: (state, action) => {
            state.errorInfografias = action.payload;
            state.isLoadingInfografias = false;
        },
        editInfo: (state, action) => {
            state.isLoadingInfos = false;
            state.infos = state.infos.map((item) =>
              action.payload.id == item.id ? { ...item, ...action.payload } : item
            );
            state.successRequest = "editInfo";
          },

    }
})

export const { infografiasRequest, fillInfografias, infografiasFail, editInfo } =
infografiasSlice.actions;

export default infografiasSlice.reducer;