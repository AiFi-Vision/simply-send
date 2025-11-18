import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";

dayjs.extend(isToday);
dayjs.extend(isYesterday);

// Format Currency
export function formatAmount(value, fab = 0) {
  const numericValue = parseFloat(value);
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: fab,
    maximumFractionDigits: 2,
  }).format(numericValue);
}

// Get Short UserName
export function getAvatarName(name = "") {
  const firstName = name.split(" ")[0] || "Unknown";
  const lastName = name.split(" ")[1] || "Unknown";
  return firstName[0].toUpperCase() + lastName[0].toUpperCase();
}

// Return Curreny Images Path
export const currencyImages = {
  DEFAULT: require("@/assets/images/currency/USD.png"),
  USD: require("@/assets/images/currency/USD.png"),
  AUD: require("@/assets/images/currency/AUD.png"),
  AUE: require("@/assets/images/currency/AUE.png"),
  GBP: require("@/assets/images/currency/GBP.png"),
  GHC: require("@/assets/images/currency/GHC.png"),
  XOF: require("@/assets/images/currency/XOF.png"),
  NGN: require("@/assets/images/currency/NGN.png"),
  // Add other currency codes here
};

export const bankImages = {
  DEFAULT: require("@/assets/images/bank/bank_5.png"),
  "Fidelity Bank PLC": require("@/assets/images/bank/bank_5.png"),
  "First Bank of Nigeria": require("@/assets/images/bank/bank_6.png"),
  // Add other bank codes here
};

export function formatTimeDifference(timestamp) {
  const now = dayjs();
  const time = dayjs(timestamp);

  if (time.isToday()) {
    const diffInMinutes = now.diff(time, "minute");
    const diffInHours = now.diff(time, "hour");

    if (diffInMinutes < 1) return "Now";
    if (diffInMinutes < 60) return `${diffInMinutes} min`;
    if (diffInHours < 2) return "1 hour";
    return time.format("h:mmA"); // like 12:23PM
  }

  if (time.isYesterday()) {
    return "Yesterday";
  }

  return time.format("D MMM"); // like 18 Jan
}
