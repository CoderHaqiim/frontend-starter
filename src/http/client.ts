
export type HttpOptions = RequestInit
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
export async function http(url: string, options?: HttpOptions){
    try{
        const res = await fetch(url, {
            ...options
        })

        let response = null

        if(res.ok){
            response =await res.json()
            console.log(response)
        }
    }catch(error){
        console.error(error)
    }
}