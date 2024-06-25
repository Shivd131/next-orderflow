import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { updateOrder } from '@/lib/features/orders/ordersSlice';
import { Order } from '@/lib/features/orders/ordersSlice';
import { toast } from 'sonner';

interface ViewOrderDialogProps {
    order: Order;
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
}

export function ViewOrderDialog({ order, isOpen, onOpenChange }: ViewOrderDialogProps) {
    const dispatch = useDispatch();
    const [status, setStatus] = useState(order.status);

    const handleUpdateOrder = () => {
        const updatedOrder = { ...order, status };
        dispatch(updateOrder(updatedOrder));
        onOpenChange(false);
        toast("Order status updated successfully");
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Order Details</DialogTitle>
                    <DialogDescription>
                        View and update the details for the order. Click save when done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="flex items-center space-x-2">
                        <Label className="font-medium text-gray-700">Customer:</Label>
                        <span className="text-gray-900">{order.customer}</span>
                    </div>
                    <div>
                        <Label className="font-medium text-gray-700">Items:</Label>
                        <ul className="list-disc list-inside pl-4 text-gray-900">
                            {order.items.map(item => (
                                <li key={item.id} className="py-1">{item.name} - Quantity: {item.quantity}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Label className="font-medium text-gray-700">Status:</Label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value as 'Pending' | 'Completed')}
                            className="px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="Pending">Pending</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>
                </div>
                <DialogFooter>
                    <Button className='bg-[#04B4FC] text-white hover:bg-blue-600' onClick={handleUpdateOrder} type="button">
                        Save changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
