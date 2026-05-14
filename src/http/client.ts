import { FormObjectTypes } from "../types/types"

export type HttpOptions = RequestInit
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export async function http(url: string, body?:FormObjectTypes, options?: HttpOptions){
    const jsonBody = JSON.stringify(body)
    console.log(jsonBody)
    try{
        const res = await fetch(`${baseUrl}${url}`, {
            ...options,
            body: body? JSON.stringify(body) : undefined
        })

        if(res.ok){
           return res.json()
        }else{
            throw new Error("error occured during fetch")
        }
    }catch(error){
        console.log("Server error")
        throw error
    }
}