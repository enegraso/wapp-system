// src/features/families/familiesSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialFamilies = {
  loading: 'idle',
  families: [],
};

export const familiesSlice = createSlice({
  name: "families",
  initialState: initialFamilies,
  reducers: {
    allFamilies: (state, action) => {
      state.families = action.payload;
    },
    addFamily: (state, action) => {
      state.families.push(action.payload);
    },
    updateFamily: (state, action) => {
      const { id, name, description } = action.payload;
      const familyToUpdate = state.families.find((family) => family.id === id);
      if (familyToUpdate) {
        familyToUpdate.name = name;
        familyToUpdate.description = description;
      }
    },
    deleteFamily: (state, action) => {
      const id = action.payload;
      state.families = state.families.filter((family) => family.id !== id);
    },
  },
});

export const { allFamilies, addFamily, updateFamily, deleteFamily } = familiesSlice.actions;
export default familiesSlice.reducer; // Asegúrate de exportar el reducer por defecto
