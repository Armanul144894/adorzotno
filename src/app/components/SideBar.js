'use client';
import Link from 'next/link';
import allCategories from '../../../data/category';


export default function SideBar() {
    const categories = allCategories;

    return (
        <div className='lg:sticky top-28 rounded-2xl max-h-[85vh] overflow-x-auto hidden lg:block'>
            <aside
                className={`-translate-x-full lg:translate-x-0 lg:relative inset-y-0 bg-white lg:bg-transparent z-40 w-64 lg:w-72 `}
            >
                <div className="bg-white rounded-lg shadow-md p-4 lg:sticky lg:top-24">
                    <div className="flex items-center justify-between mb-4 lg:hidden">
                        <h2 className="text-xl font-bold text-gray-800">Categories</h2>
                        {/* <button onClick={() => setSidebarOpen(false)}>
                            <X size={24} />
                        </button> */}
                    </div>
                    <h2 className="hidden lg:block text-xl font-bold text-gray-800 mb-4">Categories</h2>
                    <div className="space-y-2">
                        {categories.map((category, index) => (
                            <Link
                                key={index} category={category}
                                href={`/category/${category.name.toLowerCase()
                                            .replace(/&/g, 'and')
                                            .replace(/[^a-z0-9]+/g, '-')
                                            .replace(/(^-|-$)/g, '')}`}
                                className="w-full cursor-pointer flex items-center justify-between p-3 hover:bg-teal-50 rounded-lg transition-colors group"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">{category.icon}</span>
                                    <span className="text-gray-700 group-hover:text-teal-600 text-sm">
                                        {category.name}
                                    </span>
                                </div>
                                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                    {category.count}
                                </span>
                            </Link>
                        ))}
                    </div>

                </div>
            </aside>
        </div>
    )
}
