import { BudgetDetailComponent } from "./budgetIdComponent"

const page = async ({params}: {params: {budgetId: string}}) => {
  return (
    <>
    {/* <BudgetDetailComponent 
    id={params.budgetId}
    /> */}
    <div>
      Hello
    </div>
    </>
  )
}

export default page