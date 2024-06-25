import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from 'sonner'
import { RootState } from '@/lib/store'
import { editItem } from '@/lib/features/inventory/inventorySlice'

interface EditItemDialogProps {
    itemId: number
    onClose: () => void
}

export function EditItemDialog({ itemId, onClose }: EditItemDialogProps) {
    const dispatch = useDispatch()
    const item = useSelector((state: RootState) =>
        state.inventory.items.find(item => item.id === itemId)
    )

    const [name, setName] = useState(item ? item.name : "")
    const [stock, setStock] = useState(item ? item.stock : 0)

    useEffect(() => {
        if (item) {
            setName(item.name)
            setStock(item.stock)
        }
    }, [item])

    const handleEditItem = () => {
        if (item) {
            const updatedItem = { id: item.id, name, stock }
            dispatch(editItem(updatedItem))
            toast("Item Updated Successfully")
            onClose()
        }
    }

    return (
        <Dialog open={true} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Product</DialogTitle>
                    <DialogDescription>
                        Edit the details for the product. Click save when you are done.
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
                    <Button onClick={handleEditItem} type="button">Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
