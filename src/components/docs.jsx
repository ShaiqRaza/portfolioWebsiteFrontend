import { useState, useEffect } from "react"
import axios from 'axios'
import Masonry from 'react-masonry-css'
const breakpointColumns = {
    default: 4,
    768: 3,
    580: 2,
}

const Doc = ({document, setImageClicked}) =>{

    const [docHovered, setDocHovered] = useState(false);

    return (
        <div className="pb-2 flex flex-col sm:gap-2 gap-1">
            <img onMouseEnter={()=>{setDocHovered(true)}} onMouseLeave={()=>{setDocHovered(false)}} src={document.image} alt="Image!" className="max-h-[70vh] min-h-[10vh] h-auto cursor-pointer rounded-sm hover:brightness-50" onClick={()=>{setImageClicked(document)}}/>
            <p className={`font-semibold capitalize sm:text-base text-xs text-white absolute px-2 ${docHovered ? "opacity-100" : "opacity-0"}`}>Click to Expand</p>
            <p className={`font-bold capitalize sm:text-base text-xs ${docHovered ? "text-gray-400" : "text-white"}`}>{document.title}</p>
        </div>
    )
}

const Docs = ()=>{

    const [docs, setDocs] = useState(null);
    const [imageClicked, setImageClicked] = useState(null);

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
        <>  {
                imageClicked &&
                <div className="fixed w-full h-full bg-black bg-opacity-80 z-50">
                    <div className="flex flex-col sm:gap-3 gap-2 justify-center items-center w-auto h-full">
                        <button onClick={()=>{setImageClicked(null)}} className="absolute sm:top-2 right-4 top-4 text-2xl text-gray-500 hover:text-white">X</button>
                        <div className="flex flex-col sm:gap-3 gap-2 justify-center items-center h-full">
                            <p className="text-white font-bold capitalize sm:text-lg text-sm">{imageClicked.title}</p>
                            <img src={imageClicked.image} alt="Image!" className="rounded-md drop-shadow-lg max-h-[70vh] sm:max-w-[60vw] max-w-[90vw]"/>
                        </div>
                    </div>
                </div>
            }
            <Masonry className="px-[5vw] w-full min-h-[80vh] h-auto lg:pt-[17vh] sm:pt-[16vh] pt-[13vh] bg-gray-900 flex gap-2" breakpointCols={breakpointColumns}>
                {
                    docs?.map(doc=>{
                        return (
                            <Doc document={doc} key={doc._id} setImageClicked={setImageClicked}/>
                        )
                    })
                }
            </Masonry>
        </>
    )
}

export default Docs