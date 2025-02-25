import { Suspense } from "react";
import TransactionsPageComponent from "./TransactionsPageComponent";


const TransactionsPage = () => {
  return (
  <Suspense fallback={<div>Loading filters...</div>}>
    <TransactionsPageComponent/>
  </Suspense>
  )
}

export default TransactionsPage;