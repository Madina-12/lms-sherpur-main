"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Course } from "@prisma/client"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, MoreHorizontal, Pencil } from "lucide-react"
import { cn } from "@/lib/utils"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { formatPrice } from "@/lib/format-price"


export const columns: ColumnDef<Course>[] = [
    {
        accessorKey: "title",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Title
                    <ArrowUpDown className="ml-4 h-4 w-4" />
                </Button>
            )
        }
    },
    {
        accessorKey: "price",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Price
                    <ArrowUpDown className="h-4 w-4 ml-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const price = parseFloat(row.getValue("price") || "0")
            const formatted = formatPrice(price)
            return <div>{formatted}</div>
        }
    },
    {
        accessorKey: "isPublished",
        header: ({ column }) => {
            <Button variant="ghost" onClick={() => {
                column.toggleSorting(column.getIsSorted() === "asc")
            }}>
                IsPublished
                <ArrowUpDown className="pl-4 w-4 h-4" />
            </Button>
        },
        cell: ({ row }) => {
            const isPublished = row.getValue("isPublished") || false;
            return (<Badge className={cn("bg-slate-500", isPublished && "bg-sky-700")}>
                {isPublished ? "Published" : "Draft"}
            </Badge>)
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const { id } = row.original;
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-4 w-4 p-0">
                            <span className=" sr-only">Open Menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <Link href={`/teacher/courses/${id}`}>
                            <DropdownMenuItem className=" cursor-pointer">
                                <Pencil className=" h-4 w-4 mr-2" />
                                Edit
                            </DropdownMenuItem>
                        </Link>
                    </DropdownMenuContent>

                </DropdownMenu>
            )
        }
    }
] 