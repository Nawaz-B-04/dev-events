import Link from "next/link"
export default async function Users(){
   
    return(
        <>
        <h1>List of Users</h1>
        <ul>
            <Link href={`/users/`} className="block">user 1</Link>
            <Link href={`/users/`} className="block">user 2</Link>
            <Link href={`/users/`} className="block">user 3</Link> 
        </ul>
        </>
    )
}