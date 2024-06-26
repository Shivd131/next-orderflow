import React, { useState } from 'react';
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useDispatch } from 'react-redux';
import { deleteItem } from '@/lib/features/inventory/inventorySlice';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { EditItemDialog } from "./EditItemDialog";

export type Product = {
    id: number;
    name: string;
    stock: number;
};

const ActionsCell = ({ row }: any) => {
    const order = row.original;
    const [editItemId, setEditItemId] = useState<number | null>(null);
    const dispatch = useDispatch();

    const handleDeleteItem = (id: number) => {
        dispatch(deleteItem(id));
        toast("Item deleted successfully");
    };

    const handleEditDialogClose = () => {
        setEditItemId(null);
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem
                        onClick={() => {
                            navigator.clipboard.writeText(order.id.toString());
                            toast("ID copied successfully!");
                        }}
                    >
                        Copy Product ID
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setEditItemId(order.id)}>Edit Item</DropdownMenuItem>
                    <DropdownMenuItem
                        className="text-red-500"
                        onClick={() => handleDeleteItem(order.id)}
                    >
                        Delete Item
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            {editItemId === order.id && (
                <EditItemDialog itemId={editItemId!} onClose={handleEditDialogClose} />
            )}
        </>
    );
};

export const columns: ColumnDef<Product>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "name",
        header: ({ column }) => (
            <Button
                variant="ghost"
                className="relative -left-4"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Name
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
    },
    {
        accessorKey: "stock",
        header: ({ column }) => (
            <Button
                variant="ghost"
                className="relative -left-6"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Stock
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
    },
    {
        id: "actions",
        header: "Actions",
        cell: ActionsCell,
    },
];
