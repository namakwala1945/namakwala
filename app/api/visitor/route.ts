import { NextResponse } from "next/server";

type VisitorLog = {
  timestamp: number; // store visit time
};

let logs: VisitorLog[] = []; // resets when server restarts

export async function GET() {
  const now = Date.now();
  logs.push({ timestamp: now });

  const today = new Date();
  const currentDay = today.getDate();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  let dayCount = 0;
  let monthCount = 0;
  let yearCount = 0;

  logs.forEach((log) => {
    const d = new Date(log.timestamp);
    if (d.getFullYear() === currentYear) {
      yearCount++;
      if (d.getMonth() === currentMonth) {
        monthCount++;
        if (d.getDate() === currentDay) {
          dayCount++;
        }
      }
    }
  });

  return NextResponse.json({
    total: logs.length,
    today: dayCount,
    month: monthCount,
    year: yearCount,
  });
}
