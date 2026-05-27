/** Prepaid minute packages — validity only in UI; billing at plan per-minute rate + GST. */
export const minuteRechargePackages = [
  { minutes: 1000, validity: "15 days" },
  { minutes: 5000, validity: "2 months" },
  { minutes: 7500, validity: "3 months" },
  { minutes: 10000, validity: "4 months" },
  { minutes: 12500, validity: "5 months" },
  { minutes: 15000, validity: "6 months" },
  { minutes: 17500, validity: "7 months" },
  { minutes: 20000, validity: "8 months" },
  { minutes: 22500, validity: "9 months" },
  { minutes: 25000, validity: "10 months" },
] as const;
