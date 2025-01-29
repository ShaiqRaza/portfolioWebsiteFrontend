import { useState, useEffect } from "react"
import axios from 'axios'

const Doc = ({document}) =>{
    return (
        <div className="w-full columns-2 sm:columns-3 lg:columns-4 gap-1">
            
        </div>
    )
}

const Docs = ()=>{

    const [docs, setDocs] = useState(null);

    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/doc/get-all`)
        .then((response)=>{
            setDocs(response)
        })
        .catch((err)=>{
            return (
                <h1 className="text-5xl">Some error occured.</h1>
            )
        })
    }, [])

    return (
        <div className="px-[5vw] w-full min-h-[80vh] h-auto lg:pt-[17vh] sm:pt-[16vh] pt-[13vh] bg-gray-900 flex flex-col gap-1"></div>
    )
}

export default Docs