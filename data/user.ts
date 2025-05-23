import { db } from "@/db/drizzle";
import {  users } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getUserByEmail = async (email: string  )=>{

    try {
        const [result] = await db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1)

        return result
    } catch (error) {
       return null; 
    }
}
export const getUserById = async (id: string )=>{

    try {
        const [user] = await db
           .select()
           .from(users)
           .where(eq(users.id, id))
           .limit(1)
        return user
    } catch (error) {
       return null; 
    }
}