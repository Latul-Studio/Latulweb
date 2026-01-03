import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    theme: 'light', // 'light' | 'dark'
    isMobileMenuOpen: false,
    globalModal: {
        isOpen: false,
        type: null, // e.g., 'CONTACT_SUCCESS', 'LOGIN'
        data: null
    }
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.theme = state.theme === 'light' ? 'dark' : 'light';
        },
        setTheme: (state, action) => {
            state.theme = action.payload;
        },
        toggleMobileMenu: (state) => {
            state.isMobileMenuOpen = !state.isMobileMenuOpen;
        },
        openModal: (state, action) => {
            state.globalModal.isOpen = true;
            state.globalModal.type = action.payload.type;
            state.globalModal.data = action.payload.data || null;
        },
        closeModal: (state) => {
            state.globalModal.isOpen = false;
            state.globalModal.type = null;
            state.globalModal.data = null;
        }
    },
});

export const { toggleTheme, setTheme, toggleMobileMenu, openModal, closeModal } = uiSlice.actions;
export default uiSlice.reducer;
