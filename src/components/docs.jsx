import { useState, useEffect } from "react"
import axios from 'axios'
import Masonry from 'react-masonry-css'
const breakpointColumns = {
    default: 4,
    580: 3,
    400: 2
}

const Doc = ({document}) =>{
    return (
        <div className="py-2 flex flex-col gap-2">
            <img src={document.image} alt="Image!" className="max-h-[30vh] min-h-[10vh] h-auto"/>
            <p className="text-white font-bold text-xl">{document.title}</p>
        </div>
    )
}

const Docs = ()=>{

    const [docs, setDocs] = useState(null);

    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/doc/get-all`)
        .then((response)=>{
            setDocs(response.data.data)
        })
        .catch((err)=>{
            return (
                <h1 className="text-5xl">Some error occured.</h1>
            )
        })
    }, [])

    return (
        <Masonry className="px-[5vw] w-full min-h-[80vh] h-auto lg:pt-[17vh] sm:pt-[16vh] pt-[13vh] bg-gray-900 flex gap-2" breakpointCols={breakpointColumns}>
            {
                docs?.map(doc=>{
                    return (
                        <Doc document={doc} key={doc._id}/>
                    )
                })
            }
        </Masonry>
    )
}

export default Docs