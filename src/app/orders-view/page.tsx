// src/app/orders/page.tsx

'use client';

import { RootState } from '../../lib/store';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button } from "@/components/ui/button";
import { columns } from "./columns";
import { DataTable } from '@/components/ui/data-table';

const OrdersView = () => {
    const orders = useSelector((state: RootState) => state.orders.orders);
    const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');

    const handleFilterChange = (newFilter: 'all' | 'pending' | 'completed') => {
        setFilter(newFilter);
    };

    const filteredOrders = orders.filter(order => {
        if (filter === 'pending') {
            return order.status === 'Pending';
        } else if (filter === 'completed') {
            return order.status === 'Completed';
        }
        return true;
    });

    return (
        <div>
            <div className='flex justify-between items-center bg-white px-3 py-5 border-b border-slate-300'>
                <div className='flex items-center '>
                    <h2 className='text-xl font-semibold'>Orders</h2>
                </div>
            </div>
            <div className='p-3'>
                <h2 className='font-semibold'>Order List</h2>
                <div className="flex gap-4 mb-4">
                    <Button
                        className='bg-[#04B4FC] focus:bg-black'
                        onClick={() => handleFilterChange('all')}
                    >
                        All Orders
                    </Button>
                    <Button
                        className='bg-[#04B4FC] focus:bg-black'
                        onClick={() => handleFilterChange('pending')}
                    >
                        Pending
                    </Button>
                    <Button
                        className='bg-[#04B4FC] focus:bg-black'
                        onClick={() => handleFilterChange('completed')}
                    >
                        Completed
                    </Button>
                </div>
                <DataTable columns={columns} data={filteredOrders} parameter='customer' />
            </div>
        </div>
    );
};

export default OrdersView;
