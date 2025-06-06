"use client";

import { Button } from "../ui/button";
import {FcGoogle} from "react-icons/fc"
import {FaGithub} from "react-icons/fa"
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export const Social =()=> {
const searchParams = useSearchParams();
const callbackUrl = searchParams.get("callbackUrl")
    const onClick = (provider: "google" | "github")=>{
signIn(provider, {
    callbackUrl: callbackUrl || "/"
})
    }

    return (
        <div className="flex items-center w-full gap-x-2">
<Button
size={"lg"}
className="w-full"
variant={"outline"}
onClick={()=> onClick("google")}
>
<FcGoogle className="h-5 w-5"/>
</Button>
<Button
size={"lg"}
className="w-full"
onClick={()=> onClick("github")}
>
<FaGithub className="h-5 w-5"/>
</Button>
        </div>
    )
}