'use client';

import { addItem, editItem, deleteItem } from '@/lib/features/inventory/inventorySlice';
import { RootState } from '../../lib/store';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from "@/components/ui/button";
import { IoIosAddCircleOutline } from "react-icons/io";
import { columns } from "./columns";
import { DataTable } from '@/components/ui/data-table';

const InventoryView = () => {
  const items = useSelector((state: RootState) => state.inventory.items);
  const dispatch = useDispatch();

  const handleAddItem = () => {
    const newItem = { id: Math.random(), name: "New Item", stock: 0 };
    dispatch(addItem(newItem));
  };

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
          <div>Search Bar</div>
        </div>

        <Button onClick={handleAddItem} className='bg-[#04B4FC] text-white hover:bg-slate-100 hover:shadow-sm hover:border' variant="outline">
          <IoIosAddCircleOutline className='fill size-5' /> Add new Product
        </Button>
      </div>
      <div className='p-3 '>
        <h2 className='font-semibold'>Product List</h2>
        <DataTable columns={columns} data={items} />
      </div>
    </div>
  );
};

export default InventoryView;
