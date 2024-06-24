import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Item {
    id: number;
    name: string;
    stock: number;
}

interface InventoryState {
    items: Item[];
}

const initialState: InventoryState = {
    items: [
        { id: 1, name: "Item 1", stock: 20 },
        { id: 2, name: "Item 2", stock: 15 },
        { id: 3, name: "Item 3", stock: 10 },
    ],
};

const inventorySlice = createSlice({
    name: 'inventory',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<Item>) => {
            state.items.push(action.payload);
        },
        editItem: (state, action: PayloadAction<Item>) => {
            const index = state.items.findIndex(item => item.id === action.payload.id);
            if (index !== -1) {
                state.items[index] = action.payload;
            }
        },
        deleteItem: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
    },
});

export const { addItem, editItem, deleteItem } = inventorySlice.actions;
export default inventorySlice.reducer;
