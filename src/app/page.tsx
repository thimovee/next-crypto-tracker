import { getAllCoinsData } from "@/lib/getAllCoinsData";
import { columns } from "@components/columns"
import { DataTable } from "@components/data-table"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Cryptocurrencies',
  description: 'Track over 200+ cryptocurrencies',
}

async function getData(): Promise<CoinData[]> {
  const data = await getAllCoinsData();
  return data.data
}

export default async function Page() {
  const data = await getData()
  return (
    <div className="container mx-auto pt-4">
      <DataTable columns={columns} data={data} />
    </div>
  )
}