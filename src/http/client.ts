
export type HttpOptions = RequestInit
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export async function http<Type>(url: string, body?:any, options?: HttpOptions):Promise<Type>{
    
    const {headers, ...restOptions} = options || {}
    try{
        const res = await fetch(`${baseUrl}${url}`, {
            // credentials:"include",
            headers: {
                "Content-Type": "application/json",
                ...headers,
            },
            ...restOptions,
            body: body? JSON.stringify(body) : undefined
        })

        if(res.ok){
           return (await res.json()) as Type
        }else{
            throw new Error("error occured during fetch")
        }
    }catch(error){
        console.log("error occured during fetch")
        throw error
    }
}
