"use client"
import Image from "next/image"
import { ColumnDef } from "@tanstack/react-table"
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { ArrowUpDown } from "lucide-react";
import Link from "next/link";
import { formatPrice } from "@/lib/formatPrice";

export const columns: ColumnDef<CoinData>[] = [
    {
        accessorKey: "cmc_rank",
        header: ({ column }) => {
            return (
                <button
                    className="flex"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    #
                </button>
            )
        },
        cell: (cell) => (
            <div className="text-neutral-400 ">{cell.row.original.cmc_rank}</div>
        )
    },
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <button
                    className="flex"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Name
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                </button>
            )
        },
        cell: (cell) => (
            <Link href={`coin/${cell.row.original.id}`} className="py-3 flex gap-[6px] font-semibold min-w-[200px]">
                <Image alt={cell.row.original.name} src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${cell.row.original.id}.png`} width={24} height={24} className="rounded-full max-w-[24px] max-h-[24px] object-cover" />
                {cell.row.original.name} <span className="text-[#cfd6e4] font-medium">{cell.row.original.symbol}</span></Link>
        )
    },
    {
        accessorKey: "quote.USD.price",
        header: ({ column }) => {
            return (
                <button
                    className="flex"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Price
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                </button>
            )
        },
        cell: (cell) => (
            <span className="text-right pr-4">${formatPrice(cell.row.original.quote.USD.price)}</span>
        )

    },
    {
        accessorKey: "quote.USD.percent_change_1h",
        header: ({ column }) => {
            return (
                <div className="text-center hidden lg:flex">
                    <button
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        1h %
                    </button>
                </div>
            )
        },
        cell: (cell) => (
            <span className={cell.row.original.quote.USD.percent_change_1h < 0 ? 'text-red-500 hidden lg:flex' : 'text-green-500 hidden lg:flex'}>
                <span className="flex justify-center">
                    {cell.row.original.quote.USD.percent_change_1h < 0 ? (
                        <AiFillCaretDown className="my-auto" />
                    ) : (
                        <AiFillCaretUp className="my-auto" />
                    )}
                    {cell.row.original.quote.USD.percent_change_1h.toFixed(2)}%
                </span>
            </span>
        )
    },
    {
        accessorKey: "quote.USD.percent_change_24h",
        header: ({ column }) => {
            return (
                <div className="text-center hidden sm:flex">
                    <button
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        24h %
                    </button>
                </div>
            )
        },
        cell: (cell) => (
            <span className={cell.row.original.quote.USD.percent_change_24h < 0 ? 'text-red-500 hidden sm:flex' : 'text-green-500 hidden sm:flex'}>
                <span className="flex justify-center">
                    {cell.row.original.quote.USD.percent_change_24h < 0 ? (
                        <AiFillCaretDown className="my-auto" />
                    ) : (
                        <AiFillCaretUp className="my-auto" />
                    )}
                    {cell.row.original.quote.USD.percent_change_24h.toFixed(2)}%
                </span>
            </span>
        )
    },
    {
        accessorKey: "quote.USD.percent_change_7d",
        header: ({ column }) => {
            return (
                <div className="text-center hidden md:flex">
                    <button
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        7d %
                    </button>
                </div>
            )
        },
        cell: (cell) => (
            <span className={cell.row.original.quote.USD.percent_change_7d < 0 ? 'text-red-500 hidden md:flex' : 'text-green-500 hidden md:flex'}>
                <span className="flex justify-center">
                    {cell.row.original.quote.USD.percent_change_7d < 0 ? (
                        <AiFillCaretDown className="my-auto" />
                    ) : (
                        <AiFillCaretUp className="my-auto" />
                    )}
                    {cell.row.original.quote.USD.percent_change_7d.toFixed(2)}%
                </span>
            </span>
        )
    },
    {
        accessorKey: "quote.USD.market_cap",
        header: ({ column }) => {
            return (
                <div className="text-center hidden md:flex">
                    <button
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Marketcap
                    </button>
                </div>
            )
        },
        cell: (cell) => (
            <span className="text-end hidden md:flex">${Math.floor(cell.row.original.quote.USD.market_cap).toLocaleString()}</span>
        )
    },
    {
        accessorKey: "quote.USD.volume_24h",
        header: ({ column }) => {
            return (
                <button
                    className="lg:flex hidden"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Volume (24h)
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                </button>
            )
        },
        cell: (cell) => (
            <span>
                <span className="lg:flex flex-col hidden">
                    <span>${Math.floor(cell.row.original.quote.USD.volume_24h).toLocaleString()}</span>
                    <span className=" text-xs text-[#cfd6e4] flex gap-2">{Math.round(cell.row.original.quote.USD.volume_24h / cell.row.original.quote.USD.price).toLocaleString()} {cell.row.original.symbol}</span>
                </span>
            </span>
        )
    },
    {
        accessorKey: "circulating_supply",
        header: ({ column }) => {
            return (
                <button
                    className="xl:flex hidden"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Circulating Supply
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                </button>
            )
        },
        cell: (cell) => (
            <span className="text-end xl:flex hidden">{Math.floor(cell.row.original.circulating_supply).toLocaleString()} {cell.row.original.symbol}</span>
        )
    },
]
