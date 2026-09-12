import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const search = searchParams.get('search') || '';
  const state = searchParams.get('state') || '';
  const minFees = searchParams.get('minFees');
  const maxFees = searchParams.get('maxFees');
  const minRating = searchParams.get('minRating');
  const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
  const limit = parseInt(searchParams.get('limit') || '9');

  // Build the Prisma "where" clause dynamically based on which filters are present
  const where: any = {};

  if (search) {
    where.name = { contains: search, mode: 'insensitive' };
  }
  if (state) {
    where.state = state;
  }
  if (minFees || maxFees) {
    where.fees = {};
    if (minFees) where.fees.gte = parseInt(minFees);
    if (maxFees) where.fees.lte = parseInt(maxFees);
  }
  if (minRating) {
    where.rating = { gte: parseFloat(minRating) };
  }

  const skip = (page - 1) * limit;

  // Run both queries in parallel — data + total count for pagination
  const [colleges, total] = await Promise.all([
    prisma.college.findMany({
      where,
      skip,
      take: limit,
      orderBy: { rating: 'desc' },
    }),
    prisma.college.count({ where }),
  ]);

  return NextResponse.json({
    colleges,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  });
}