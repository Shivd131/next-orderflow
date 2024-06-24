'use client'
import { addItem, editItem, deleteItem } from '@/lib/features/inventory/inventorySlice';
import { RootState } from '../../lib/store';
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';

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
      <h1>Inventory</h1>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.name} - Stock: {item.stock}
            <button onClick={() => handleEditItem(item.id)}>Edit</button>
            <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <button onClick={handleAddItem}>Add Item</button>
    </div>
  )
}

export default InventoryView