"use client"
import * as React from "react"
import { ColumnDef, ColumnFiltersState, SortingState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, } from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "./ui/table"
import { ArrowLeft, ArrowRight } from "lucide-react"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            columnFilters,
        },
    })

    return (
        <div className="rounded-md">
            <div className="flex pt-2 pb-4 w-full justify-between">
                <input
                    placeholder="Filter coins..."
                    value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                    onChange={(event: any) =>
                        table.getColumn("name")?.setFilterValue(event.target.value)
                    }
                    className="focus:outline-none w-[150px] md:max-w-[360px] text-white bg-[#141414] sm:ml-0 ml-2  px-5 py-2 rounded-md ring-2 ring-[#454545] font-semibold text-sm gap-2 flex"
                />
                <div className="max-w-fit flex gap-4">
                    <button className="disabled:bg-[#333333] disabled:hover:cursor-not-allowed text-white bg-[#141414] px-5 py-2 rounded-md ring-2 ring-[#454545] font-semibold text-sm gap-2 flex" disabled={!table.getCanPreviousPage()} onClick={() => table.previousPage()}>
                        <ArrowLeft className="inline-block my-auto" size={18} />
                        <h2 className="my-auto">Previous</h2>
                    </button>
                    <button className="disabled:bg-[#333333] mr-2 sm:mr-0 disabled:hover:cursor-not-allowed text-white bg-[#141414] px-5 py-2 rounded-md ring-2 ring-[#454545] font-semibold text-sm gap-2 flex" disabled={!table.getCanNextPage()} onClick={() => table.nextPage()}>
                        <h2 className="my-auto">Next</h2>
                        <ArrowRight className="inline-block my-auto" size={18} />
                    </button>
                </div>
            </div>
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id} className="max-w-fit">
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody className="overflow-hidden">
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}