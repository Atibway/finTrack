"use client"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { transactions as transactionShema } from "@/db/schema"
import { Loader2, Plus } from "lucide-react"
import { columns} from "./colums"
import { DataTable } from "@/components/data-table"
import { Skeleton } from "@/components/ui/skeleton"
import { useNewTransaction } from "@/features/transactions/hooks/use-new-transaction"
import { useBulkDeleteTransactions } from "@/features/transactions/api/use-bult-delete-transactions"
import { usegetTransactions } from "@/features/transactions/api/use-get-transactions"
import { useState } from "react"
import { ImportCard } from "./ImportCard"
import { UploadButton } from "./UploadButton"

enum VARIANTS {
  LIST = "LIST",
  IMPORT = "IMPORT"
}

const INITIAL_IMPORT_RESULTS = {
  data: [],
  errors: [],
  meta: {}
}

const TransactionsPage = () => {
  const [variant, setVariant] = useState<VARIANTS>(VARIANTS.LIST)
   const [importResults, setImportResults] = useState(INITIAL_IMPORT_RESULTS);

   const onUpload = (results: typeof INITIAL_IMPORT_RESULTS) => {
    console.log("onUpload triggered", results);
    setImportResults(results);
    setVariant(VARIANTS.IMPORT);
    console.log("hello upload");
  };

  const onCancelImport = ()=> {
    setImportResults(INITIAL_IMPORT_RESULTS)
    setVariant(VARIANTS.LIST)
  }

    const newTransaction = useNewTransaction()
    const deleteTransactions = useBulkDeleteTransactions();
    const transactionsQuery = usegetTransactions()
    const transactions = transactionsQuery.data || []

    const isDisabled = transactionsQuery.isLoading || deleteTransactions.isPending

    const onsubmitImport = async (
values: typeof transactionShema.$inferInsert[]
    )=> {

    }

    if(transactionsQuery.isLoading){
return (
  <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
    <Card className="border-none drop-shadow-sm">
    <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
      <Skeleton className="h-8 w-48"/>
      <Skeleton className="h-8 w-full lg:w-20 "/>
    </CardHeader>
    <CardContent>
      <div className="h-[500px] w-full flex items-center justify-center">
<Loader2 className="size-6 text-slate-300 animate-spin"/>
      </div>
    </CardContent>
    </Card>
  </div>
)
    }

    if(variant === VARIANTS.IMPORT){
return (
  <>
  <div>
  <ImportCard
  data={importResults.data}
  onCancel={onCancelImport}
  onSubmit={onsubmitImport}
  />
  </div>
  </>
)
    }

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
    <Card className="border-none drop-shadow-sm">
    <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
      <CardTitle className="text-xl line-clamp-1">Transaction History</CardTitle>
      <div className="flex flex-col lg:flex-row gap-y-2 items-center gap-x-2">
      <Button
       className="w-full lg:w-auto"
      onClick={newTransaction.onOpen}
       size="sm">
        <Plus className="size-4 mr-2" />
        Add new
      </Button>
      <UploadButton
      onUpload={onUpload}
      />
      </div>
    </CardHeader>
    <CardContent>
    <DataTable
     filterKey="payye" 
     columns={columns} 
     data={transactions} 
     onDelete={(row)=> {
      const ids = row.map((r)=> r.original.id)
      deleteTransactions.mutate({ids})
     }}
     disabled={isDisabled}
     />
    </CardContent>
  </Card>
    </div>
  
  )
}

export default TransactionsPage