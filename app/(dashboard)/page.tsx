
import { DataGrid } from "@/components/data-grid";
import { DataCharts } from "@/components/DataCharts";
import { Filters } from "@/components/Filters";
import { Suspense } from "react";

 const  DashboardPage = ()=> {
  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-28">
      <div className="mb-10">
          <Filters />
      </div>
      <DataGrid />
      <DataCharts />
    </div>
  );
}

const HomePage = () => {
  return (
  <Suspense fallback={<div>Loading filters...</div>}>
    <DashboardPage/>
  </Suspense>
  )
}

export default HomePage;
