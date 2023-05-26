export interface item{
    id: string,
    name:string,
    category:string,
    image:Blob,
    description: string,
    price:number,
    status: string,
    isPosted: boolean,
    sellerID:string,
    firstName:string,
    lastName:string,
}

export interface userInfo{
    id:string,
    username:string,
    password:string,
    firstName:string,
    lastName:string,
    phone:string
}
export interface displayScreen{
    homeScreen:boolean,
    createItemScreen:boolean,
    myInventoryScreen:boolean
}