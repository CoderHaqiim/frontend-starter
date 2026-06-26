import { FormObjectTypes } from "../types/types"

export type HttpOptions = RequestInit
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export async function http(url: string, body?:FormObjectTypes, options?: HttpOptions){
    try{
        const res = await fetch(`${baseUrl}${url}`, {
            credentials:"include",
            headers: {
                "Content-Type": "application/json",
                ...options?.headers,
            },
            ...options,
            body: body? JSON.stringify(body) : undefined
        })

        if(res.ok){
           return res.json()
        }else{
            throw new Error("error occured during fetch")
        }
    }catch(error){
        console.log("error occured during fetch")
        throw error
    }
}
