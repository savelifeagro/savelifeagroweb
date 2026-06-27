import React from 'react';
import { allProducts } from '../products';

export default function ProductComparisonTable() {
  return (
    <div className="w-full overflow-x-auto pb-4">
      <div className="min-w-[800px]">
        <table className="w-full text-left border-collapse bg-white rounded-2xl overflow-hidden shadow-sm border border-[#EADEC9]/50">
          <thead className="bg-cream-foundation/50">
            <tr>
              <th className="p-4 md:p-6 font-label-bold text-xs uppercase tracking-widest text-deep-forest border-b border-[#EADEC9]/50 w-1/4">Product</th>
              <th className="p-4 md:p-6 font-label-bold text-xs uppercase tracking-widest text-deep-forest border-b border-[#EADEC9]/50">Primary Use</th>
              <th className="p-4 md:p-6 font-label-bold text-xs uppercase tracking-widest text-deep-forest border-b border-[#EADEC9]/50">Suitable Crops</th>
              <th className="p-4 md:p-6 font-label-bold text-xs uppercase tracking-widest text-deep-forest border-b border-[#EADEC9]/50">Application Stage</th>
              <th className="p-4 md:p-6 font-label-bold text-xs uppercase tracking-widest text-deep-forest border-b border-[#EADEC9]/50">Dose</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EADEC9]/30">
            {allProducts.map((product) => (
              <tr key={product.id} className="hover:bg-cream-foundation/20 transition-colors">
                <td className="p-4 md:p-6 font-bold text-deep-forest flex items-center gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-[#F5EDE0] rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center p-1 border border-[#EADEC9]/50">
                    <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
                  </div>
                  {product.name}
                </td>
                <td className="p-4 md:p-6 text-sm text-on-surface-variant font-medium">
                  {product.type}
                </td>
                <td className="p-4 md:p-6 text-sm text-on-surface-variant">
                  <div className="flex flex-wrap gap-1">
                    {product.suitableCrops.slice(0, 2).map(c => (
                      <span key={c} className="bg-cream-foundation text-[10px] px-2 py-1 rounded-md">{c}</span>
                    ))}
                    {product.suitableCrops.length > 2 && (
                      <span className="bg-cream-foundation text-[10px] px-2 py-1 rounded-md">+{product.suitableCrops.length - 2}</span>
                    )}
                  </div>
                </td>
                <td className="p-4 md:p-6 text-sm text-on-surface-variant">
                  {product.applicationStage}
                </td>
                <td className="p-4 md:p-6 text-sm font-label-bold text-primary">
                  {product.dose}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
