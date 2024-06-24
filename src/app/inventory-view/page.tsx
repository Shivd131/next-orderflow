'use client';

import { editItem, deleteItem } from '@/lib/features/inventory/inventorySlice';
import { RootState } from '../../lib/store';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from "@/components/ui/button";

import { columns } from "./columns";
import { DataTable } from '@/components/ui/data-table';
import { AddItemDialog } from './AddItemDialog';

const InventoryView = () => {
  const items = useSelector((state: RootState) => state.inventory.items);
  const dispatch = useDispatch();

  const handleEditItem = (id: number) => {
    const updatedItem = { id, name: "Updated Item", stock: 25 };
    dispatch(editItem(updatedItem));
  };

  const handleDeleteItem = (id: number) => {
    dispatch(deleteItem(id));
  };

  return (
    <div>
      <div className='flex justify-between items-center bg-white  px-3 py-4 border-b border-slate-300'>
        <div className='flex items-center gap-10 '>
          <h2 className='text-xl font-semibold'>Inventory</h2>
        </div>

        <AddItemDialog />
      </div>
      <div className='p-3 '>
        <h2 className='font-semibold'>Product List</h2>
        <DataTable columns={columns} data={items} />
      </div>
    </div>
  );
};

export default InventoryView;
