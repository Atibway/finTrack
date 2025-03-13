// src/app/actions/generateReport.ts
import { generatePDF, generateExcel, generateWord } from "./reportGenerators";
import { getTransactionsForDateRange } from "./getTransactions";

export async function generateReport(userId: string, startDate: Date, endDate: Date, reportFormat: "pdf" | "excel" | "word") {
  const transactions = await getTransactionsForDateRange(userId, startDate, endDate);

  if (reportFormat === "pdf") {
    return generatePDF(transactions);
  } else if (reportFormat === "excel") {
    return generateExcel(transactions);
  } else if (reportFormat === "word") {
    return generateWord(transactions);
  } else {
    throw new Error("Invalid report format");
  }
}
