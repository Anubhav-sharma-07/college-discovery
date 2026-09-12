import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const exam = searchParams.get('exam');
  const rank = searchParams.get('rank');

  if (!exam || !rank) {
    return NextResponse.json(
      { error: 'exam and rank are required' },
      { status: 400 }
    );
  }

  const userRank = parseInt(rank);

  // Matching logic: a college is a realistic option if the user's rank
  // is close to or better than the college's cutoff — not just "better than"
  // We use a tolerance band so students see "reach", "match", and "safe" options
  const colleges = await prisma.college.findMany({
    where: {
      exam: exam,
      cutoffRank: { gte: Math.floor(userRank * 0.7) }, // includes slightly harder colleges too
    },
    orderBy: { cutoffRank: 'asc' },
    take: 15,
  });

  // Categorize each result relative to the user's rank
  const results = colleges.map((c) => {
    let category: 'reach' | 'match' | 'safe';
    if (c.cutoffRank < userRank * 0.9) category = 'reach';
    else if (c.cutoffRank <= userRank * 1.3) category = 'match';
    else category = 'safe';

    return { ...c, category };
  });

  return NextResponse.json({ results, userRank, exam });
}