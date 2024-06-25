'use client';

import { editItem, deleteItem } from '@/lib/features/inventory/inventorySlice';
import { RootState } from '../../lib/store';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from "@/components/ui/button";

import { columns } from "./columns";
import { DataTable } from '@/components/ui/data-table';
import { AddItemDialog } from './AddItemDialog';

const InventoryView = () => {
  const items = useSelector((state: RootState) => state.inventory.items);
  const dispatch = useDispatch();
  const [filter, setFilter] = useState<'all' | 'inStock' | 'outOfStock'>('all');

  const handleFilterChange = (newFilter: 'all' | 'inStock' | 'outOfStock') => {
    setFilter(newFilter);
  };

  const filteredItems = items.filter(item => {
    if (filter === 'inStock') {
      return item.stock > 0;
    } else if (filter === 'outOfStock') {
      return item.stock === 0;
    }
    return true;
  });

  return (
    <div>
      <div className='flex justify-between items-center bg-white px-3 py-4 border-b border-slate-300'>
        <div className='flex items-center gap-10 '>
          <h2 className='text-xl font-semibold'>Inventory</h2>
        </div>
        <AddItemDialog />
      </div>
      <div className='p-3'>
        <h2 className='font-semibold'>Product List</h2>
        <div className="flex gap-4 mb-4">
          <Button
            className='bg-[#04B4FC] focus:bg-black'
            onClick={() => handleFilterChange('all')}
          >
            All Items
          </Button>
          <Button
            className='bg-[#04B4FC] focus:bg-black'
            onClick={() => handleFilterChange('inStock')}
          >
            In Stock
          </Button>
          <Button
            className='bg-[#04B4FC] focus:bg-black'
            onClick={() => handleFilterChange('outOfStock')}
          >
            Out of Stock
          </Button>
        </div>
        <DataTable columns={columns} data={filteredItems} />
      </div>
    </div>
  );
};

export default InventoryView;
