;
import Link from 'next/link';
import allCategories from '../../../data/category';
import { ArrowRight, ChevronRight } from 'lucide-react';


export default function SideBar() {
    const categories = allCategories;

    return (
        <div className='lg:sticky top-24 rounded-2xl max-h-[90vh] overflow-x-auto hidden lg:block [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-gray-300'>
            <aside
                className={`-translate-x-full lg:translate-x-0 lg:relative inset-y-0 lg:bg-transparent z-40 w-60 `}
            >
                <div className="bg-white rounded-lg shadow-md p-4 lg:sticky lg:top-24">
                    
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Categories</h2>
                    <div className="space-y-2">
                        {categories.map((category, index) => (
                            <Link
                                key={index} category={category}
                                href={`/category/${category.name.toLowerCase()
                                            .replace(/&/g, 'and')
                                            .replace(/[^a-z0-9]+/g, '-')
                                            .replace(/(^-|-$)/g, '')}`}
                                className="w-full cursor-pointer flex items-center justify-between py-1 hover:bg-teal-50 rounded-lg transition-colors group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className='w-8 mx-auto'><span className="text-md">{category.icon}</span></div>
                                    <span className="text-gray-700 group-hover:text-primary text-sm ">
                                        {category.name}
                                    </span>
                                </div>
                                <span className="text-sm">
                                    <ChevronRight size={16}/>
                                </span>
                            </Link>
                        ))}
                    </div>

                </div>
            </aside>
        </div>
    )
}
