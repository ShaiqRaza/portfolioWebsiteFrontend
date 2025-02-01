import { useState, useEffect } from "react"
import axios from 'axios'
import Masonry from 'react-masonry-css'
const breakpointColumns = {
    default: 4,
    580: 3,
    400: 2
}

const Doc = ({document, setImageClicked}) =>{
    return (
        <div className="py-2 flex flex-col gap-2">
            <img src={document.image} alt="Image!" className="max-h-[70vh] min-h-[10vh] h-auto" onClick={()=>{setImageClicked(document)}}/>
            <p className="text-white font-bold text-xl">{document.title}</p>
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
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 z-50">
                    <div className="flex flex-col gap-4 justify-center items-center w-auto h-full">
                        <button onClick={()=>{setImageClicked(null)}} className="absolute top-0 right-0 text-2xl p-2 text-gray-500 hover:text-white mr-2">X</button>
                        <img src={imageClicked.image} alt="Image!" className="max-h-[70vh] max-w-[60vw]"/>
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