// utils.ts
import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
dayjs.extend(weekOfYear);

export const aggregateEarnings = (
  rides: { date: string; amount: number }[],
  period: "daily" | "weekly" | "monthly"
) => {
  const map: Record<string, number> = {};

  rides.forEach((ride) => {
    const date = dayjs(ride.date);
    let key = "";

    if (period === "daily") key = date.format("YYYY-MM-DD");
    else if (period === "weekly") key = `Week ${date.week()} (${date.year()})`;
    else if (period === "monthly") key = date.format("YYYY-MM");

    map[key] = (map[key] || 0) + ride.amount;
  });

  return Object.entries(map)
    .map(([period, amount]) => ({ period, amount }))
    .sort((a, b) => (a.period > b.period ? 1 : -1));
};
