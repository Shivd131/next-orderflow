import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { IoIosAddCircleOutline } from "react-icons/io"
import { addItem } from '@/lib/features/inventory/inventorySlice'
import { toast } from 'sonner'

export function AddItemDialog() {
    const dispatch = useDispatch()
    const [name, setName] = useState("")
    const [stock, setStock] = useState(0)
    const [open, setOpen] = useState(false)

    const handleAddItem = () => {
        const newItem = { id: parseInt((Math.random() * 100000).toString()), name, stock }
        dispatch(addItem(newItem))
        setName("")
        setStock(0)
        setOpen(false)
        toast("Item Added Successfully")
    }

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
                        Enter the details for the new product. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="stock" className="text-right">
                            Stock
                        </Label>
                        <Input
                            id="stock"
                            type="number"
                            value={stock}
                            onChange={(e) => setStock(Number(e.target.value))}
                            className="col-span-3"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleAddItem} type="button">Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
