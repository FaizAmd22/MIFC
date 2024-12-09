import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Definisikan tipe untuk state tema
interface ThemeState {
  theme: 'light' | 'dark'; // Bisa memilih 'light' atau 'dark'
}

// State awal
const initialState: ThemeState = {
  theme: 'light', // Default tema adalah 'light'
};

// Membuat slice tema
const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    // Aksi untuk mengubah tema
    toggleTheme(state) {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    // Aksi untuk set tema secara eksplisit
    setTheme(state, action: PayloadAction<'light' | 'dark'>) {
      state.theme = action.payload;
    },
  },
});

// Ekspor aksi dan reducer
export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;