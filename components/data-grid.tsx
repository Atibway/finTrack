"use client";

import { useGetSummary } from "@/features/summary/api/use-get-summary";
import { formatDateRange } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import {FaPiggyBank} from "react-icons/fa"
import {FaArrowTrendDown, FaArrowTrendUp} from "react-icons/fa6"
import { Datacard, DataCardLoading } from "./Datacard";

export const DataGrid = () => {
    const {data, isLoading} = useGetSummary()
  const params = useSearchParams();
  const to = params.get("to") || undefined;
  const from = params.get("from") || undefined;

  const dateRangeLabel = formatDateRange({to, from})
  if(isLoading){
    return (

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mb-8">
        <DataCardLoading/>
        <DataCardLoading/>
        <DataCardLoading/>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1  lg:grid-cols-3 gap-8 pb-2 mb-8">
      <Datacard
      title="Remaining"
      value={data?.remainingAmount}
      percentageChange={data?.remainingChange}
      icon={FaPiggyBank}
      dateRange={dateRangeLabel}
      />
      <Datacard
      title="Income"
      value={data?.incomeChange}
      percentageChange={data?.incomeChange}
      icon={FaArrowTrendUp}
      dateRange={dateRangeLabel}
      />
      <Datacard
      title="Expenses"
      value={data?.expensesAmount}
      percentageChange={data?.expensesChange}
      icon={FaArrowTrendDown}
      dateRange={dateRangeLabel}
      />
    </div>
  );
};

