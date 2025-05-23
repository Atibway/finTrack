"use client"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { useState } from "react"
import { ImportTable } from "./import-table"
import { convertAmountToMiliunits } from "@/lib/utils"
import { format, parse } from "date-fns"


const dateFormat = "yyyy-MM-dd HH:mm:ss"
const outputFormat = "yyyy-MM-dd"

const requiredOptions = [
    "amount",
    "date",
    "payee",
]

interface SelectedColumsState {
    [key: string]: string | null
}

type Props = {
    data: string[][];
    onCancel: () => void;
    onSubmit: (data: any) => void;
  };
  
  export const ImportCard = ({
    data,
    onCancel,
    onSubmit,
  }: Props) => {
    const [selectedColums, setSelectedColumns] = useState<SelectedColumsState>({})

    const headers = data[0]
    const body = data.slice(1)

    const onTableHeadSelectChange = (
        columnIndex: number, 
        value: string | null
    ) => {
        setSelectedColumns((prev) => {
          const newSelectedColumns = { ...prev };

          for (const key in newSelectedColumns) {
            if (newSelectedColumns[key] === value) {
              newSelectedColumns[key] = null;
            }
          }

          if(value === "skip"){
value = null
          }

          newSelectedColumns[`column_${columnIndex}`] = value;
          return newSelectedColumns;
        });
      };
      
      const progress = Object.values(selectedColums).filter(Boolean).length;

      const handleContinue = ()=> {
        const getColumnInde= (column: string)=> {
          return column.split("_")[1]
        }

        const mappedData = {
          headers: headers.map((_header, index)=> {
         const columnIndex = getColumnInde(`column_${index}`);
         return selectedColums[`column_${columnIndex}`] || null
          }),
          body: body.map((row)=> {
            const transformedRow = row.map((cell, index)=> {
              const columnIndex = getColumnInde(`column_${index}`);

              return selectedColums[`column_${columnIndex}`]? cell: null
            });

            return transformedRow.every((item)=> item === null)
            ? []
            : transformedRow
          }).filter((row)=> row.length > 0)
        }

        const arrayOfData = mappedData.body.map((row) => {
          return row.reduce((acc: any, cell, index) => {
            const header = mappedData.headers[index];
            if (header !== null) {
              acc[header] = cell;
            }
            return acc;
          }, {});
        });
        
        const formatedData = arrayOfData.map((item)=> ({
          ...item,
          amount: convertAmountToMiliunits(parseFloat(item.amount)),
          date: format(parse(item.date, dateFormat, new Date()), outputFormat)
        }))
        
      onSubmit(formatedData)
      }

    return (
        <div className="max-w-screen-2xl mx-auto w-full pb-10 ">
        <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">Import Transaction</CardTitle>
          <div className="flex flex-col lg:flex-row gap-y-2 items-center gap-x-2">
        
          <Button
          onClick={onCancel}
           size="sm"
           className="w-full lg:w-auto"
           >
            Cancel
          </Button>
        
        <Button
        className="w-full lg:w-auto"
        size={"sm"}
        disabled={progress < requiredOptions.length}
        onClick={handleContinue} 
        >
            Continue ({progress}/ {requiredOptions.length})
        </Button>
          </div>
        </CardHeader>
        <CardContent>
        <ImportTable
        headers={headers}
        body={body}
        selectedColumns={selectedColums}
        onTableHeadSelectChange={onTableHeadSelectChange}
        />
        </CardContent>
      </Card>
        </div>
    );
  };
  