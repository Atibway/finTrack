import { Suspense } from "react";
import TransactionsPageComponent from "./TransactionsPageComponent";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import DataTableSkeleton from "@/components/loadings/data-table-skeleton";



const TransactionsPage = () => {
  return (
  <Suspense fallback={<div className="max-w-screen-2xl mx-auto w-full pb-10">
    <Card className="border-none drop-shadow-sm">
    <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
      <Skeleton className="h-8 w-48"/>
      <div className="flex gap-x-2">
      <Skeleton className="h-8 w-full lg:w-20 "/>
      <Skeleton className="h-8 w-full lg:w-20 "/>
      </div>
    </CardHeader>
    <CardContent>
     <DataTableSkeleton/>
    </CardContent>
    </Card>
  </div>}>
    <TransactionsPageComponent/>
  </Suspense>
  )
}

export default TransactionsPage;