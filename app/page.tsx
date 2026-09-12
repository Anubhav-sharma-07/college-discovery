'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { addToCompare, isInCompare, getCompareList } from '@/lib/compareStore';

type College = {
  id: string;
  name: string;
  location: string;
  state: string;
  fees: number;
  rating: number;
  exam: string;
  placementAvg: number;
};

export default function ListingPage() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [search, setSearch] = useState('');
  const [minRating, setMinRating] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [compareCount, setCompareCount] = useState(0);

  useEffect(() => {
    setCompareCount(getCompareList().length);
  }, []);

  useEffect(() => {
    const fetchColleges = async () => {
      setLoading(true);
      const params = new URLSearchParams({
        search,
        minRating,
        page: page.toString(),
        limit: '9',
      });
      const res = await fetch(`/api/colleges?${params}`);
      const data = await res.json();
      setColleges(data.colleges);
      setTotalPages(data.totalPages);
      setLoading(false);
    };

    // debounce search so we don't fire a request on every keystroke
    const timer = setTimeout(fetchColleges, 300);
    return () => clearTimeout(timer);
  }, [search, minRating, page]);

  const handleAddCompare = (c: College) => {
    const added = addToCompare({
      id: c.id,
      name: c.name,
      location: c.location,
      fees: c.fees,
      rating: c.rating,
      placementAvg: c.placementAvg,
    });
    if (added) setCompareCount(getCompareList().length);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Find Your College</h1>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search college name..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className="border rounded px-4 py-2 flex-1"
        />
        <select
          value={minRating}
          onChange={(e) => { setMinRating(e.target.value); setPage(1); }}
          className="border rounded px-4 py-2"
        >
          <option value="">All Ratings</option>
          <option value="4.5">4.5+</option>
          <option value="4.0">4.0+</option>
          <option value="3.5">3.5+</option>
        </select>
      </div>

      {/* Sticky compare bar */}
      {compareCount > 0 && (
        <div className="sticky top-2 z-10 bg-black text-white rounded px-4 py-3 mb-4 flex justify-between items-center">
          <span>{compareCount} college{compareCount > 1 ? 's' : ''} selected</span>
          <Link href="/compare" className="underline font-semibold">
            Compare Now →
          </Link>
        </div>
      )}

      {/* Results */}
      {loading ? (
        <div className="grid grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="border rounded p-4 h-40 animate-pulse bg-gray-100" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {colleges.map((c) => (
            <div key={c.id} className="border rounded p-4 hover:shadow-md transition">
              <h3 className="font-bold text-lg">{c.name}</h3>
              <p className="text-gray-600 text-sm">{c.location}, {c.state}</p>
              <p className="mt-2">Fees: ₹{c.fees.toLocaleString()}</p>
              <p>Rating: ⭐ {c.rating}</p>
              <p>Avg Placement: ₹{(c.placementAvg / 100000).toFixed(1)}L</p>
              <button
                onClick={() => handleAddCompare(c)}
                disabled={isInCompare(c.id)}
                className="mt-3 w-full border rounded py-1.5 text-sm font-medium disabled:opacity-50"
              >
                {isInCompare(c.id) ? 'Added ✓' : 'Add to Compare'}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center gap-4 mt-8">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-4 py-2 border rounded disabled:opacity-40"
        >
          Prev
        </button>
        <span className="py-2">Page {page} of {totalPages}</span>
        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="px-4 py-2 border rounded disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}