import React from 'react';
import { ArrowRight } from 'lucide-react';
import heroImage from '../assets/images/luxury_hero_products_1785407289565.jpg';

interface HeroProps {
  onShopNow: () => void;
  onViewCollection: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onShopNow, onViewCollection }) => {
  return (
    <section id="hero" className="w-full py-12 md:py-16 bg-white overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Side: Typography & CTAs (6 Columns on LG) */}
          <div className="lg:col-span-6 flex flex-col items-start space-y-6">
            
            {/* High Impact Headline matching screenshot */}
            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold text-[#111111] leading-[1.12] tracking-tight">
              Temukan Produk <br />
              <span className="text-[#2E6A38]">Terbaik</span> untukmu
            </h1>

            {/* Subheading Description */}
            <p className="text-base sm:text-lg text-[#6B7280] leading-relaxed max-w-xl font-normal">
              Koleksi produk premium dengan kualitas terbaik, desain modern, dan harga terbaik untuk semua kebutuhan Anda.
            </p>

            {/* CTA Buttons - Rounded Pill style as in screenshot */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2 w-full sm:w-auto">
              {/* Primary CTA */}
              <button
                onClick={onShopNow}
                className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl bg-[#111111] text-white text-sm font-semibold hover:bg-[#222222] transition-all duration-200 cursor-pointer active:scale-95 w-full sm:w-auto shadow-sm"
              >
                <span>Belanja Sekarang</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>

              {/* Secondary CTA */}
              <button
                onClick={onViewCollection}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-white text-[#111111] text-sm font-semibold border border-gray-200 hover:bg-gray-50 transition-all duration-200 cursor-pointer active:scale-95 w-full sm:w-auto"
              >
                <span>Lihat Koleksi</span>
              </button>
            </div>

          </div>

          {/* Right Side: Studio Image Container with soft beige border & shadow (6 Columns on LG) */}
          <div className="lg:col-span-6 relative flex justify-center items-center">
            <div className="relative w-full aspect-[4/3] rounded-[36px] bg-[#FAF8F5] border-4 border-[#F5F2EC] p-3 shadow-[0_20px_50px_rgba(0,0,0,0.06)] overflow-hidden group">
              <img
                src={heroImage}
                alt="Luxury Product Photoshoot - Backpack, Sneakers, Hoodie, Smart Watch, Sunglasses, Shopping Bag"
                className="w-full h-full object-cover rounded-[28px] transition-transform duration-500 ease-out group-hover:scale-[1.01]"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

