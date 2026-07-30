import React from 'react';
import { CATEGORIES } from '../data/mockData';
import { ArrowUpRight } from 'lucide-react';

interface PopularCategoriesProps {
  onSelectCategory: (categoryName: string) => void;
}

export const PopularCategories: React.FC<PopularCategoriesProps> = ({ onSelectCategory }) => {
  return (
    <section id="categories" className="w-full py-16 bg-[#F8F6F2]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold tracking-widest text-[#6B7280] uppercase mb-2 block">
              EKSPLORASI KOLEKSI
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-tight">
              Kategori Populer
            </h2>
          </div>
          <p className="text-sm text-[#6B7280] max-w-md">
            Pilih kategori favorit Anda dan temukan produk terbaik dengan desain minimalis & modern.
          </p>
        </div>

        {/* 4 Modern Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.name)}
              className="group relative h-80 rounded-[20px] overflow-hidden bg-white border border-[#ECEAE5] soft-shadow cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl flex flex-col justify-end p-6"
            >
              {/* Background Image with Zoom on Hover */}
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                referrerPolicy="no-referrer"
              />

              {/* Gradient Overlay for Legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity duration-300 group-hover:from-black/85" />

              {/* Card Content Overlay */}
              <div className="relative z-10 text-white flex flex-col items-start space-y-1.5">
                
                

                {/* Category Name */}
                <div className="w-full flex items-center justify-between">
                  <h3 className="text-2xl font-black text-white tracking-tight">
                    {cat.name}
                  </h3>
                  <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white transition-all duration-300 group-hover:bg-white group-hover:text-[#111111] group-hover:scale-110">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>

                {/* Subtitle */}
                <p className="text-xs text-gray-200 line-clamp-2 pt-1 font-normal opacity-90">
                  {cat.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
