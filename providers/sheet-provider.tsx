"use client"

import { EditAccountSheet } from "@/features/accounts/components/edit-account-sheet";
import { NewAccountSheet } from "@/features/accounts/components/new-account-sheet"
import { EditCategorySheet } from "@/features/categories/components/edit-category-sheet";
import { NewCategorySheet } from "@/features/categories/components/new-categoryt-sheet";
import { EditTransactionSheet } from "@/features/transactions/components/edit-transaction-sheet";
import { NewTransactionSheet } from "@/features/transactions/components/new-transaction-sheet";
import { useMountedState } from "react-use"


export const SheetProvider = ()=>{
const isMounted = useMountedState();

if(!isMounted) return null;
    return (
        <>
        <EditAccountSheet/>
        <NewAccountSheet/>
        
        <EditCategorySheet/>
        <NewCategorySheet/>

        <NewTransactionSheet/>
        <EditTransactionSheet/>
        </>
    )
}