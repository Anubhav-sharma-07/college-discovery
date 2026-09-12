'use client';

import { useState } from 'react';
import { addToCompare, isInCompare } from '@/lib/compareStore';

type PredictResult = {
  id: string;
  name: string;
  location: string;
  fees: number;
  rating: number;
  placementAvg: number;
  cutoffRank: number;
  category: 'reach' | 'match' | 'safe';
};

const categoryStyles: Record<string, string> = {
  reach: 'bg-red-100 text-red-700',
  match: 'bg-yellow-100 text-yellow-700',
  safe: 'bg-green-100 text-green-700',
};

export default function PredictorPage() {
  const [exam, setExam] = useState('JEE');
  const [rank, setRank] = useState('');
  const [results, setResults] = useState<PredictResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [, forceRerender] = useState(0);

  const handlePredict = async () => {
    if (!rank) return;
    setLoading(true);
    const res = await fetch(`/api/predict?exam=${exam}&rank=${rank}`);
    const data = await res.json();
    setResults(data.results);
    setLoading(false);
  };

  const handleAddCompare = (c: PredictResult) => {
    addToCompare({
      id: c.id,
      name: c.name,
      location: c.location,
      fees: c.fees,
      rating: c.rating,
      placementAvg: c.placementAvg,
    });
    forceRerender((n) => n + 1); // re-render to update "Added ✓" state
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">College Predictor</h1>
      <p className="text-gray-600 mb-6">Enter your exam and rank to see colleges you're likely to get into.</p>

      <div className="flex gap-4 mb-8">
        <select
          value={exam}
          onChange={(e) => setExam(e.target.value)}
          className="border rounded px-4 py-2"
        >
          <option value="JEE">JEE</option>
          <option value="BITSAT">BITSAT</option>
          <option value="VITEEE">VITEEE</option>
          <option value="WBJEE">WBJEE</option>
        </select>
        <input
          type="number"
          placeholder="Your rank"
          value={rank}
          onChange={(e) => setRank(e.target.value)}
          className="border rounded px-4 py-2 flex-1"
        />
        <button
          onClick={handlePredict}
          className="bg-black text-white px-6 py-2 rounded font-medium"
        >
          Predict
        </button>
      </div>

      {loading && <p>Finding matches...</p>}

      {!loading && results.length > 0 && (
        <div className="space-y-3">
          {results.map((c) => (
            <div key={c.id} className="border rounded p-4 flex justify-between items-center">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold">{c.name}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${categoryStyles[c.category]}`}>
                    {c.category.toUpperCase()}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{c.location} · Cutoff rank: {c.cutoffRank}</p>
                <p className="text-sm">Fees: ₹{c.fees.toLocaleString()} · ⭐ {c.rating}</p>
              </div>
              <button
                onClick={() => handleAddCompare(c)}
                disabled={isInCompare(c.id)}
                className="border rounded px-4 py-1.5 text-sm font-medium disabled:opacity-50 shrink-0"
              >
                {isInCompare(c.id) ? 'Added ✓' : 'Add to Compare'}
              </button>
            </div>
          ))}
        </div>
      )}

      {!loading && rank && results.length === 0 && (
        <p className="text-gray-500">No matches found. Try a different rank.</p>
      )}
    </div>
  );
}