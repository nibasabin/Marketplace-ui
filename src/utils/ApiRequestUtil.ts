export async function getDataFromAPI(endpoint:string){
    const baseURL = process.env.REACT_APP_MARKETPLACE_API_BASE_URL ?? 'Base URL missing';
    const url = baseURL.concat(endpoint);
    const result = await fetch(url,{
        method: "GET",
        headers:{
            Accept: "application/json",
            "Content-Type": "application/json",
        }
    }
        )
        return await result.json();
}

export async function postDataToAPI(endpoint:string,requestBody:object,){
    const baseURL = process.env.REACT_APP_MARKETPLACE_API_BASE_URL ?? 'Base URL missing';
    const url = baseURL.concat(endpoint);
    const result = await fetch(url,{
        method: "POST",
        headers:{
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body:JSON.stringify(requestBody)
    }
        )
        return await result.json();
}