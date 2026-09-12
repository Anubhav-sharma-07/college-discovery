import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const colleges = [
  { name: "IIT Bombay", location: "Mumbai", state: "Maharashtra", fees: 220000, rating: 4.9, exam: "JEE", cutoffRank: 500, placementAvg: 2100000, courses: ["B.Tech CSE", "B.Tech Mechanical"] },
  { name: "IIT Delhi", location: "New Delhi", state: "Delhi", fees: 220000, rating: 4.9, exam: "JEE", cutoffRank: 600, placementAvg: 2000000, courses: ["B.Tech CSE", "B.Tech Electrical"] },
  { name: "IIT Madras", location: "Chennai", state: "Tamil Nadu", fees: 210000, rating: 4.9, exam: "JEE", cutoffRank: 700, placementAvg: 2050000, courses: ["B.Tech CSE", "B.Tech Aerospace"] },
  { name: "IIT Kanpur", location: "Kanpur", state: "Uttar Pradesh", fees: 220000, rating: 4.8, exam: "JEE", cutoffRank: 900, placementAvg: 1950000, courses: ["B.Tech CSE", "B.Tech Mechanical"] },
  { name: "IIT Kharagpur", location: "Kharagpur", state: "West Bengal", fees: 210000, rating: 4.8, exam: "JEE", cutoffRank: 1000, placementAvg: 1900000, courses: ["B.Tech CSE", "B.Tech Civil"] },
  { name: "IIT Roorkee", location: "Roorkee", state: "Uttarakhand", fees: 220000, rating: 4.7, exam: "JEE", cutoffRank: 1500, placementAvg: 1750000, courses: ["B.Tech CSE", "B.Tech Electrical"] },
  { name: "IIT Guwahati", location: "Guwahati", state: "Assam", fees: 210000, rating: 4.6, exam: "JEE", cutoffRank: 2000, placementAvg: 1650000, courses: ["B.Tech CSE", "B.Tech Chemical"] },
  { name: "IIIT Hyderabad", location: "Hyderabad", state: "Telangana", fees: 350000, rating: 4.8, exam: "JEE", cutoffRank: 2500, placementAvg: 2500000, courses: ["B.Tech CSE", "B.Tech ECE"] },
  { name: "NIT Trichy", location: "Tiruchirappalli", state: "Tamil Nadu", fees: 150000, rating: 4.6, exam: "JEE", cutoffRank: 3000, placementAvg: 1400000, courses: ["B.Tech CSE", "B.Tech Civil"] },
  { name: "NIT Surathkal", location: "Mangalore", state: "Karnataka", fees: 155000, rating: 4.5, exam: "JEE", cutoffRank: 3500, placementAvg: 1350000, courses: ["B.Tech CSE", "B.Tech Mechanical"] },
  { name: "NIT Warangal", location: "Warangal", state: "Telangana", fees: 145000, rating: 4.5, exam: "JEE", cutoffRank: 3800, placementAvg: 1300000, courses: ["B.Tech CSE", "B.Tech ECE"] },
  { name: "Jadavpur University", location: "Kolkata", state: "West Bengal", fees: 20000, rating: 4.5, exam: "WBJEE", cutoffRank: 4000, placementAvg: 1100000, courses: ["B.Tech CSE", "B.Tech Civil"] },
  { name: "Delhi Technological University", location: "New Delhi", state: "Delhi", fees: 180000, rating: 4.4, exam: "JEE", cutoffRank: 5000, placementAvg: 1200000, courses: ["B.Tech CSE", "B.Tech Mechanical"] },
  { name: "NSIT Delhi", location: "New Delhi", state: "Delhi", fees: 175000, rating: 4.3, exam: "JEE", cutoffRank: 5500, placementAvg: 1150000, courses: ["B.Tech CSE", "B.Tech IT"] },
  { name: "NIT Rourkela", location: "Rourkela", state: "Odisha", fees: 140000, rating: 4.3, exam: "JEE", cutoffRank: 6000, placementAvg: 1100000, courses: ["B.Tech CSE", "B.Tech Metallurgy"] },
  { name: "IIIT Delhi", location: "New Delhi", state: "Delhi", fees: 300000, rating: 4.5, exam: "JEE", cutoffRank: 6500, placementAvg: 1600000, courses: ["B.Tech CSE", "B.Tech ECE"] },
  { name: "BITS Pilani", location: "Pilani", state: "Rajasthan", fees: 450000, rating: 4.7, exam: "BITSAT", cutoffRank: 8000, placementAvg: 1800000, courses: ["B.Tech CSE", "B.Tech Chemical"] },
  { name: "BITS Goa", location: "Goa", state: "Goa", fees: 440000, rating: 4.5, exam: "BITSAT", cutoffRank: 9500, placementAvg: 1600000, courses: ["B.Tech CSE", "B.Tech Mechanical"] },
  { name: "BITS Hyderabad", location: "Hyderabad", state: "Telangana", fees: 440000, rating: 4.4, exam: "BITSAT", cutoffRank: 10500, placementAvg: 1500000, courses: ["B.Tech CSE", "B.Tech Civil"] },
  { name: "NIT Calicut", location: "Calicut", state: "Kerala", fees: 135000, rating: 4.2, exam: "JEE", cutoffRank: 11000, placementAvg: 1000000, courses: ["B.Tech CSE", "B.Tech ECE"] },
  { name: "College of Engineering Pune", location: "Pune", state: "Maharashtra", fees: 90000, rating: 4.1, exam: "MHT-CET", cutoffRank: 12000, placementAvg: 950000, courses: ["B.Tech CSE", "B.Tech Mechanical"] },
  { name: "Thapar Institute", location: "Patiala", state: "Punjab", fees: 380000, rating: 4.2, exam: "JEE", cutoffRank: 13000, placementAvg: 1050000, courses: ["B.Tech CSE", "B.Tech Electrical"] },
  { name: "VIT Vellore", location: "Vellore", state: "Tamil Nadu", fees: 200000, rating: 4.2, exam: "VITEEE", cutoffRank: 15000, placementAvg: 900000, courses: ["B.Tech CSE", "B.Tech IT"] },
  { name: "SRM Chennai", location: "Chennai", state: "Tamil Nadu", fees: 250000, rating: 3.9, exam: "SRMJEEE", cutoffRank: 18000, placementAvg: 750000, courses: ["B.Tech CSE", "B.Tech Biotech"] },
  { name: "Manipal Institute of Technology", location: "Manipal", state: "Karnataka", fees: 380000, rating: 4.1, exam: "MET", cutoffRank: 20000, placementAvg: 850000, courses: ["B.Tech CSE", "B.Tech Aeronautical"] },
  { name: "Amity University", location: "Noida", state: "Uttar Pradesh", fees: 320000, rating: 3.7, exam: "Amity JEE", cutoffRank: 22000, placementAvg: 650000, courses: ["B.Tech CSE", "B.Tech IT"] },
  { name: "PES University", location: "Bangalore", state: "Karnataka", fees: 420000, rating: 4.0, exam: "PESSAT", cutoffRank: 25000, placementAvg: 950000, courses: ["B.Tech CSE", "B.Tech IT"] },
  { name: "Lovely Professional University", location: "Phagwara", state: "Punjab", fees: 180000, rating: 3.6, exam: "LPUNEST", cutoffRank: 30000, placementAvg: 550000, courses: ["B.Tech CSE", "B.Tech Mechanical"] },
  { name: "KIIT University", location: "Bhubaneswar", state: "Odisha", fees: 210000, rating: 3.9, exam: "KIITEE", cutoffRank: 28000, placementAvg: 700000, courses: ["B.Tech CSE", "B.Tech ECE"] },
  { name: "Chandigarh University", location: "Mohali", state: "Punjab", fees: 160000, rating: 3.5, exam: "CUCET", cutoffRank: 35000, placementAvg: 500000, courses: ["B.Tech CSE", "B.Tech IT"] },
  { name: "Galgotias University", location: "Greater Noida", state: "Uttar Pradesh", fees: 150000, rating: 3.4, exam: "GCET", cutoffRank: 40000, placementAvg: 450000, courses: ["B.Tech CSE", "B.Tech Mechanical"] },
  { name: "Vellore Institute (Bhopal)", location: "Bhopal", state: "Madhya Pradesh", fees: 190000, rating: 3.8, exam: "VITEEE", cutoffRank: 32000, placementAvg: 600000, courses: ["B.Tech CSE", "B.Tech Civil"] },
];

async function main() {
  await prisma.college.deleteMany();
  for (const c of colleges) {
    await prisma.college.create({ data: c });
  }
  console.log(`Seeded ${colleges.length} colleges.`);
}

main()
  .catch(console.error)
  .finally(async () => await prisma.$disconnect());