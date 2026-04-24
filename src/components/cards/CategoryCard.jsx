import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const slugify = (text) =>
    text
        .toLowerCase()
        .replace(/&/g, "and")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

export default function CategoryCard({ category }) {
    return (
        <Link
            href={`/category/${slugify(category.name)}`}
            className="group flex flex-col items-center rounded-lg bg-transparent p-2 sm:p-3 text-center transition-transform duration-300"
        >
            <div className="flex w-full items-center justify-center">
                <div className="relative w-28 sm:w-32 aspect-square">
                    <div className={`absolute inset-0 rounded-full bg-gradient-to-r from-primary/15 to-primary/5 shadow-sm ring-1 ring-slate-100`} />
                    <div className="absolute inset-0 z-10 flex items-center justify-center">
                        <div className="relative h-[120%] w-[120%]">
                            <Image
                                src={category.image}
                                alt={category.name}
                                fill
                                sizes="112px"
                                className="object-contain transition-transform duration-300 group-hover:scale-110"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-center gap-3 px-4 pt-1 sm:p-2">
                <p className="line-clamp-2 text-xs sm:text-base font-medium text-slate-700">
                    {category.name}
                </p>

                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-transparent text-slate-500 transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-white">
                    <ArrowUpRight size={18} />
                </span>
            </div>
        </Link>
    );
}
