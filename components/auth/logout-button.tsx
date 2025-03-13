"use client"

import { logout } from "@/actions/logout";
import { redirect } from "next/navigation";
import { useState } from "react";
import LoadingPage from "../LoadingPage";


interface LogoutButtonProps {
    children?: React.ReactNode;
}

export const LogoutButton = ({
    children
}: LogoutButtonProps)=> {
    const [loading, setIsLoading]= useState(false);

const onClick = ()=> {
    setIsLoading(true)
    logout().then(
        redirect("/login")
       
    ).finally(() => {
        setIsLoading(false);
    })
};

if(loading){

    return (
        <>
        {loading && <LoadingPage message="Signing you out..." />}
        </>
    )
}

return (
    <span onClick={onClick} className="curser-pointer">
        {children}
    </span>
)
}