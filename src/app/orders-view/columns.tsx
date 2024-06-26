import React, { useState } from 'react';
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { ViewOrderDialog } from './ViewOrderDialog';

export type Order = {
    id: number;
    customer: string;
    items: { id: number; name: string; quantity: number }[];
    status: 'Pending' | 'Completed';
};

const ActionsCell = ({ row }: any) => {
    const order = row.original;
    const [isDialogOpen, setIsDialogOpen] = useState(false);

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
                        Copy Order ID
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
                        View Order
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <ViewOrderDialog order={order} isOpen={isDialogOpen} onOpenChange={setIsDialogOpen} />
        </>
    );
};

export const columns: ColumnDef<Order>[] = [
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
        accessorKey: "customer",
        header: ({ column }) => (
            <Button
                variant="ghost"
                className="relative -left-4"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Customer
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
    },
    {
        accessorKey: "items",
        header: ({ column }) => (
            <Button
                variant="ghost"
                className="relative -left-6"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Items
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => row.original.items.length,
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.original.status;
            const statusStyle = status === 'Pending' ? 'text-red-400' : (status === 'Completed' ? 'text-green-400' : '');
            return (
                <span className={statusStyle}>{status}</span>
            );
        }
    },
    {
        id: "actions",
        header: "Actions",
        cell: ActionsCell,
    },
];
