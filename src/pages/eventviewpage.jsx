import { useParams } from "react-router-dom"
import { useContext } from "react"
import { CompleteDataContext } from "../context/completeData"
import { useEffect } from "react"

export default function Viewdetails(){
    const {completeData}=useContext(CompleteDataContext)
    const {id}=useParams()
   console.log(completeData)
 
   const currentUser= completeData.filter((items)=> {items.id==id})
     
console.log(currentUser)

    return(
        <div>
            welcome
        </div>
    )
}