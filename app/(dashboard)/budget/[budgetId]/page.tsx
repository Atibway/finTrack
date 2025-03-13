import { BudgetDetailComponent } from "./_components/budgetIdComponent"


const page = async ({params}: {params: {budgetId: string}}) => {
  return (
    <>
    <BudgetDetailComponent 
    id={params.budgetId}
    />
    </>
  )
}

export default page