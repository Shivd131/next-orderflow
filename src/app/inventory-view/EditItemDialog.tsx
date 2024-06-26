import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from 'sonner';
import { RootState } from '@/lib/store';
import { editItem } from '@/lib/features/inventory/inventorySlice';
import { useFormik } from 'formik';
import { validate } from './validation/validate';

interface EditItemDialogProps {
    itemId: number;
    onClose: () => void;
}

export function EditItemDialog({ itemId, onClose }: EditItemDialogProps) {
    const dispatch = useDispatch();
    const item = useSelector((state: RootState) =>
        state.inventory.items.find(item => item.id === itemId)
    );

    const formik = useFormik({
        initialValues: {
            name: item ? item.name : '',
            stock: item ? item.stock : 0,
        },
        enableReinitialize: true,
        validate,
        onSubmit: (values) => {
            if (item) {
                const updatedItem = { id: item.id, ...values };
                dispatch(editItem(updatedItem));
                toast("Item Updated Successfully");
                onClose();
            }
        },
    });

    return (
        <Dialog open={true} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Product</DialogTitle>
                    <DialogDescription>
                        Edit the details for the product. Click save when you are done.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={formik.handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input
                                id="name"
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="col-span-3"
                            />
                            {formik.touched.name && formik.errors.name && (
                                <div className="text-red-500 col-span-4 pl-9 text-xs">{formik.errors.name}</div>
                            )}
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="stock" className="text-right">
                                Stock
                            </Label>
                            <Input
                                id="stock"
                                name="stock"
                                type="number"
                                value={formik.values.stock}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="col-span-3"
                            />
                            {formik.touched.stock && formik.errors.stock && (
                                <div className="text-red-500 col-span-4 pl-9 text-xs">{formik.errors.stock}</div>
                            )}
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
