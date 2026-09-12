'use client';

import { useEffect, useState } from 'react';
import { getCompareList, removeFromCompare, CompareCollege } from '@/lib/compareStore';

export default function ComparePage() {
  const [list, setList] = useState<CompareCollege[]>([]);

  useEffect(() => {
    setList(getCompareList());
  }, []);

  const handleRemove = (id: string) => {
    removeFromCompare(id);
    setList(getCompareList());
  };

  if (list.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold mb-2">No colleges selected</h1>
        <p className="text-gray-600">Go to Listing or Predictor and add colleges to compare.</p>
      </div>
    );
  }

  const rows: { label: string; key: keyof CompareCollege; format?: (v: any) => string }[] = [
    { label: 'Location', key: 'location' },
    { label: 'Fees', key: 'fees', format: (v) => `₹${v.toLocaleString()}` },
    { label: 'Rating', key: 'rating', format: (v) => `⭐ ${v}` },
    { label: 'Avg Placement', key: 'placementAvg', format: (v) => `₹${(v / 100000).toFixed(1)}L` },
  ];

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Compare Colleges</h1>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="text-left p-3 border-b"></th>
              {list.map((c) => (
                <th key={c.id} className="text-left p-3 border-b min-w-[200px]">
                  <div className="flex justify-between items-start">
                    <span className="font-bold">{c.name}</span>
                    <button
                      onClick={() => handleRemove(c.id)}
                      className="text-gray-400 hover:text-red-600 text-sm"
                    >
                      ✕
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.key}>
                <td className="p-3 border-b font-medium text-gray-600">{row.label}</td>
                {list.map((c) => (
                  <td key={c.id} className="p-3 border-b">
                    {row.format ? row.format(c[row.key]) : c[row.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}