//referred and built from https://ui.shadcn.com/docs/components/data-table
"use client"
import { ColumnDef } from "@tanstack/react-table"

export type Product = {
    id: number
    name: string
    stock: number
}

export const columns: ColumnDef<Product>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "stock",
        header: "Stock",
    },
] 