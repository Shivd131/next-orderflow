import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type OrderItem = {
    id: number;
    name: string;
    quantity: number;
};

type Order = {
    id: number;
    customer: string;
    items: OrderItem[];
    status: 'Pending' | 'Completed' | 'Cancelled';
};

type OrdersState = {
    orders: Order[];
};

const initialState: OrdersState = {
    orders: [
        {
            id: 1,
            customer: "Customer A",
            items: [
                { id: 1, name: "Item 1", quantity: 5 },
                { id: 2, name: "Item 2", quantity: 3 },
            ],
            status: "Pending",
        },
        {
            id: 2,
            customer: "Customer B",
            items: [
                { id: 1, name: "Item 1", quantity: 2 },
                { id: 3, name: "Item 3", quantity: 1 },
            ],
            status: "Completed",
        },
    ],
};

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        addOrder: (state, action: PayloadAction<Order>) => {
            state.orders.push(action.payload);
        },
        updateOrder: (state, action: PayloadAction<Order>) => {
            const index = state.orders.findIndex(order => order.id === action.payload.id);
            if (index !== -1) {
                state.orders[index] = action.payload;
            }
        },
        deleteOrder: (state, action: PayloadAction<number>) => {
            state.orders = state.orders.filter(order => order.id !== action.payload);
        },
    },
});

export const { addOrder, updateOrder, deleteOrder } = ordersSlice.actions;

export default ordersSlice.reducer;
