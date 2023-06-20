import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link"
import errorsvg from "../../../../public/errorsvg.svg"

export default function NotFound() {
    return (
        <section className="w-1/2 min-h-full text-white mx-auto my-32 text-center flex flex-col items-center gap-10">
            <h1 className="text-4xl font-bold">The coin you are looking for does not exist.</h1>
            <Image alt="Page not found" src={errorsvg} width={500} height={500} />
            <Link href="/" className="bg-[#141414] px-5 py-2 rounded-md ring-2 ring-[#454545] font-semibold text-sm gap-2 flex">
                <ArrowLeft className="inline-block my-auto" size={18} />
                <h2 className="my-auto">Back to home</h2>
            </Link>
        </section>
    )
}