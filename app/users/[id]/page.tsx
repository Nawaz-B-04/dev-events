export default async function UserDetails({params} : {params : Promise<{id:string}>}){
    const {id} = await params 

    return(
        <>
        <h1>User {id}</h1>
        </>
    )
}