import React from 'react';
import { Truck, ShieldCheck, Headphones } from 'lucide-react';
import { FEATURE_ITEMS } from '../data/mockData';

export const Features: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'truck':
        return <Truck className="w-6 h-6 text-[#111111]" />;
      case 'shield':
        return <ShieldCheck className="w-6 h-6 text-[#111111]" />;
      case 'headphones':
        return <Headphones className="w-6 h-6 text-[#111111]" />;
      default:
        return <Truck className="w-6 h-6 text-[#111111]" />;
    }
  };

  return (
    <section className="w-full py-8 md:py-12 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURE_ITEMS.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-[#EFECE6] p-7 text-center flex flex-col items-center shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] transition-all duration-300 group cursor-default"
            >
              {/* Circular light-gray icon background */}
              <div className="w-14 h-14 rounded-full bg-[#F5F4F0] flex items-center justify-center mb-4 group-hover:bg-[#111111] group-hover:text-white transition-colors duration-300">
                <div className="transition-transform duration-300 group-hover:scale-110 group-hover:text-white">
                  {getIcon(item.iconName)}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-base font-extrabold text-[#111111] mb-1.5 tracking-tight">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-sm text-gray-500 font-normal leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
