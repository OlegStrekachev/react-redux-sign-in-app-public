import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentModal: null,
  itemId: null,
  itemName: null,
};

export const modalSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    openModal(state, action) {
      state.currentModal = action.payload.modalType;
      state.itemId = action.payload.itemId;
      state.itemName = action.payload.itemName;
      state.itemDays = action.payload.itemDays;
      state.itemAge = action.payload.itemAge;
    },
    closeModal(state) {
      state.currentModal = null;
      state.itemId = null;
      state.itemName = null;
      state.itemDays = null;
      state.itemAge = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
