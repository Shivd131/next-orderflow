'use client';
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
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IoIosAddCircleOutline } from "react-icons/io";
import { addItem } from '@/lib/features/inventory/inventorySlice';
import { toast } from 'sonner';
import { useFormik } from 'formik';
import { validate } from './validation/validate';

export function AddItemDialog() {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

    const formik = useFormik({
        initialValues: {
            name: '',
            stock: 0,
        },
        validate,
        onSubmit: (values) => {
            const newItem = { id: parseInt((Math.random() * 100000).toString()), ...values };
            dispatch(addItem(newItem));
            formik.resetForm();
            setOpen(false);
            toast("Item Added Successfully");
        },
    });

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button onClick={() => setOpen(true)} className='bg-[#04B4FC] text-white hover:bg-slate-100 hover:shadow-sm hover:border' variant="outline">
                    <IoIosAddCircleOutline className='fill size-5' /> Add new Product
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add New Product</DialogTitle>
                    <DialogDescription>
                        Enter the details for the new product. Click save when you are done.
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
