import { notFound } from 'next/navigation'
import { getAllCoinsData } from '@/lib/getAllCoinsData'
import { getCoin } from '@/lib/getCoinData'
import Image from 'next/image'
import { formatPrice } from '@/lib/formatPrice'
import { Modal } from '@components/ui/Dialog'
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/Tabs'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@components/ui/accordion"

export async function generateMetadata({ params }: { params: { id: string } }) {
    const { id } = params
    const { data } = await getCoin(id)
    const coin = data[id] as CoinData

    if (!coin) {
        return {
            title: 'Coin not found'
        }
    }
    return {
        title: coin.name,
        description: `${coin.name} is trading at ${formatPrice(coin.quote.USD.price)}`
    }
}

export default async function Coin({ params }: { params: { id: string } }) {
    const { id } = params
    const { data } = await getCoin(id)

    if (!data) {
        return notFound()
    }
    const coin = data[id] as CoinData


    const percentageChange = (num: number) => {
        const multi = num / 100 + 1
        const newPrice = coin.quote.USD.price * multi
        return formatPrice(newPrice)
    }
    return (
        <section className="w-10/12 sm:max-w-fit mx-auto mt-20 text-white">
            <div className="flex flex-col">
                <div className="flex gap-10">
                    <div className="flex flex-col gap-4 min-w-[300px] w-full sm:max-w-fit">
                        <div className="flex items-center gap-3">
                            <Image className="rounded-full" src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${coin.id}.png`} alt={coin.name} width={32} height={32} />
                            <h1 className="text-2xl font-bold">{coin.name}</h1>
                            <button className="p-1 px-2 bg-[#323546] text-[#a1a7bb] font-semibold text-xs rounded-md">{coin.symbol}</button>
                            <button className="p-1 px-2 bg-[#858ca2] font-semibold text-xs rounded-md max-w-fit">Rank #{coin.cmc_rank}</button>
                        </div>
                        <div className="flex flex-col sm:hidden">
                            <p className="text-[#a1a7bb] text-xs font-medium mb-2">{coin.name} Price <small>({coin.symbol})</small></p>
                            <div className="flex gap-4">
                                <h2 className="font-bold text-xl md:text-2xl lg:text-[32px] leading-8">${formatPrice(coin.quote.USD.price)}</h2>
                                {coin.quote.USD.percent_change_24h < 0 ? (
                                    <span className="bg-[#ea3943] font-semibold px-2 py-1 rounded-md flex items-center text-sm"><AiFillCaretDown />{coin.quote.USD.percent_change_24h.toFixed(2)}%</span>
                                ) : (
                                    <span className="bg-[#16c784] font-semibold px-2 py-1 rounded-md flex items-center text-sm"><AiFillCaretUp />{coin.quote.USD.percent_change_24h.toFixed(2)}%</span>
                                )}
                            </div>
                        </div>
                        <Accordion type="single" collapsible className="ml-2 w-full flex sm:hidden bg-[#323546] rounded-md text-sm font-semibold">
                            <AccordionItem value="item-1">
                                <AccordionTrigger>More stats</AccordionTrigger>
                                <AccordionContent>
                                    <div className="flex flex-col gap-2 text-xs pr-2">
                                        <div className="flex w-full justify-between">
                                            <p className="text-[#a1a7bb] font-medium mb-2">Market Cap</p>
                                            <p className="font-bold">${formatPrice(coin.quote.USD.market_cap)}</p>
                                        </div>
                                        <div className="flex gap-4 justify-between">
                                            <p className="text-[#a1a7bb] font-medium mb-2">Volume (24h)</p>
                                            <p className="font-bold">${formatPrice(coin.quote.USD.volume_24h)}</p>
                                        </div>
                                        <div className="flex gap-4 justify-between">
                                            <p className="text-[#a1a7bb] font-medium mb-2">Circulating Supply</p>
                                            <p className="font-bold ">{coin.circulating_supply} {coin.symbol}</p>
                                        </div>
                                        <div className="flex gap-4 justify-between">
                                            <p className="text-[#a1a7bb] font-medium mb-2">Total Supply</p>
                                            <p className="font-bold">{coin.total_supply} {coin.symbol}</p>
                                        </div>
                                        <div className="flex gap-4 justify-between">
                                            <p className="text-[#a1a7bb] font-medium mb-2">Max Supply</p>
                                            <p className="font-bold">{coin.max_supply ? `${coin.max_supply} ${coin.symbol}` : '∞'}</p>
                                        </div>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                        <p className="text-[#a1a7bb] text-xs">Tags:</p>
                        <div className="flex flex-wrap gap-2 w-full sm:max-w-[300px]">
                            {coin.tags.slice(0, 4).map((tag, index) => (
                                <button key={index} className="p-[2px] px-[6px] bg-[#323546] text-[#a1a7bb] font-semibold text-xs rounded-md">{tag}</button>
                            ))}
                            <Modal
                                title={`${coin.name} Tags`}
                                trigger={<div className="p-[2px] px-[6px] bg-[#3861fb1a] text-[#6188ff] font-semibold text-xs rounded-md w-full sm:max-w-fit">View all</div>}
                                content={
                                    <div className="flex flex-wrap gap-2 max-w-[360px]">
                                        {coin.tags.map((tag, index) => (
                                            <button key={index} className="p-[2px] px-[6px] bg-[#323546] text-[#a1a7bb] font-semibold text-xs rounded-md">{tag}</button>
                                        ))}
                                    </div>
                                }
                            />
                        </div>
                    </div>
                    <div className="hidden flex-col max-w-fit max-h-fit sm:flex">
                        <p className="text-[#a1a7bb] text-xs font-medium mb-2">{coin.name} Price <small>({coin.symbol})</small></p>
                        <div className="flex gap-4">
                            <h2 className="font-bold text-xl md:text-2xl lg:text-[32px] leading-8">${formatPrice(coin.quote.USD.price)}</h2>
                            {coin.quote.USD.percent_change_24h < 0 ? (
                                <span className="bg-[#ea3943] font-semibold px-2 py-1 rounded-md flex items-center text-sm"><AiFillCaretDown />{coin.quote.USD.percent_change_24h.toFixed(2)}%</span>
                            ) : (
                                <span className="bg-[#16c784] font-semibold px-2 py-1 rounded-md flex items-center text-sm"><AiFillCaretUp />{coin.quote.USD.percent_change_24h.toFixed(2)}%</span>
                            )}
                        </div>
                        <div className="mt-8 mb-4">
                            <Tabs defaultValue='1h'>
                                <TabsList className="max-w-[200px] text-xs font-semibold">
                                    <TabsTrigger value='1h'>1H</TabsTrigger>
                                    <TabsTrigger value='1d'>1D</TabsTrigger>
                                    <TabsTrigger value='7d'>7D</TabsTrigger>
                                    <TabsTrigger value='30d'>30D</TabsTrigger>
                                </TabsList>
                                <TabsContent value='1h'>
                                    <div className="flex gap-2">
                                        <span className="font-semibold text-slate-200">${percentageChange(coin.quote.USD.percent_change_1h)}</span>
                                        {coin.quote.USD.percent_change_1h < 0 ? (
                                            <span className="text-[#ea3943] font-semibold flex items-center"><AiFillCaretDown />{coin.quote.USD.percent_change_1h.toFixed(2)}%</span>
                                        ) : (
                                            <span className="text-[#16c784] font-semibold flex items-center"><AiFillCaretUp />{coin.quote.USD.percent_change_1h.toFixed(2)}%</span>
                                        )}
                                    </div>
                                </TabsContent>
                                <TabsContent value='1d'>
                                    <div className="flex gap-2">
                                        <span className="font-semibold text-slate-200">${percentageChange(coin.quote.USD.percent_change_24h)}</span>
                                        {coin.quote.USD.percent_change_24h < 0 ? (
                                            <span className="text-[#ea3943] font-semibold flex items-center"><AiFillCaretDown />{coin.quote.USD.percent_change_24h.toFixed(2)}%</span>
                                        ) : (
                                            <span className="text-[#16c784] font-semibold flex items-center"><AiFillCaretUp />{coin.quote.USD.percent_change_24h.toFixed(2)}%</span>
                                        )}
                                    </div>
                                </TabsContent>
                                <TabsContent value='7d'>
                                    <div className="flex gap-2">
                                        <span className="font-semibold text-slate-200">${percentageChange(coin.quote.USD.percent_change_7d)}</span>
                                        {coin.quote.USD.percent_change_7d < 0 ? (
                                            <span className="text-[#ea3943] font-semibold flex items-center"><AiFillCaretDown />{coin.quote.USD.percent_change_7d.toFixed(2)}%</span>
                                        ) : (
                                            <span className="text-[#16c784] font-semibold flex items-center"><AiFillCaretUp />{coin.quote.USD.percent_change_7d.toFixed(2)}%</span>
                                        )}
                                    </div>
                                </TabsContent>
                                <TabsContent value='30d'>
                                    <div className="flex gap-2">
                                        <span className="font-semibold text-slate-200">${percentageChange(coin.quote.USD.percent_change_30d)}</span>
                                        {coin.quote.USD.percent_change_30d < 0 ? (
                                            <span className="text-[#ea3943] font-semibold flex items-center"><AiFillCaretDown />{coin.quote.USD.percent_change_30d.toFixed(2)}%</span>
                                        ) : (
                                            <span className="text-[#16c784] font-semibold flex items-center"><AiFillCaretUp />{coin.quote.USD.percent_change_30d.toFixed(2)}%</span>
                                        )}
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </div>
                    </div >
                </div>
                <div className="w-full border-t border-[#323546] pt-6  hidden sm:flex text-xs justify-center px-4 ">
                    <div className="min-w-[180px] flex flex-col gap-10">
                        <div className="flex flex-col gap-1">
                            <span className="font-medium text-[#a1a7bb]">Market Cap</span>
                            <span className="font-semibold">${formatPrice(coin.quote.USD.market_cap)}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="font-medium text-[#a1a7bb]">24h Volume / Market Cap</span>
                            <span className="font-semibold">{(coin.quote.USD.volume_24h / coin.quote.USD.market_cap).toFixed(4)}</span>
                        </div>
                    </div>
                    <div className="min-w-[200px] border-[#323546] border-x flex flex-col px-[10px] gap-10">
                        <div className="flex flex-col gap-1">
                            <span className="font-medium text-[#a1a7bb]">Fully Diluted Market Cap</span>
                            <span className="font-semibold">${coin.quote.USD.fully_diluted_market_cap.toLocaleString()}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="font-medium text-[#a1a7bb]">Volume 24h</span>
                            <span className="font-semibold">${coin.quote.USD.volume_24h.toLocaleString()}</span>
                        </div>
                    </div>
                    <div className="max-h-fit min-w-[210px] flex flex-col pl-3 pr-4">
                        <div className="flex flex-col gap-1">
                            <span className='font-medium text-[#a1a7bb]'>Circulating Supply</span>
                            <span className="font-semibold">{formatPrice(coin.circulating_supply)} {coin.symbol}</span>
                        </div>
                        <div className="flex justify-between mt-10 mb-2">
                            <span className='font-medium text-[#a1a7bb]'>Max Supply</span>
                            <span className="font-semibold">{coin.max_supply === null ? <div>--</div> : <div>{coin.max_supply.toLocaleString()}</div>}</span>
                        </div>
                        <div className="flex justify-between gap-2">
                            <span className='font-medium text-[#a1a7bb]'>Total Supply</span>
                            <span className="font-semibold">{coin.total_supply.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </div >
            <div className="w-full h-96 border border-[#323546] rounded-md mt-10 flex flex-col items-center">
                {/* Price history not available in updated api */}
                <span className='font-medium text-[#a1a7bb] text-xs max-w-fit my-auto'>Chart data not available</span>
            </div>
            <Link href="/" className="max-w-fit mt-4 hover:bg-[#191919] bg-[#141414] px-5 py-2 rounded-md ring-2 ring-[#454545] font-semibold text-sm gap-2 flex">
                <ArrowLeft className="inline-block my-auto" size={18} />
                <h2 className="my-auto">Back to all coins</h2>
            </Link>
        </section >
    )
}

export async function generateStaticParams() {
    const data = await getAllCoinsData();
    const coins = data.data;

    return coins.map((coin: { id: { toString: () => any } }) => ({
        params: {
            id: coin.id.toString()
        }
    }))
}