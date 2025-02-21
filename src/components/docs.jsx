import { useState, useEffect } from "react"
import axios from 'axios'
import Masonry from 'react-masonry-css'
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useOutletContext } from "react-router-dom"
const breakpointColumns = {
    default: 4,
    768: 3,
    580: 2,
}

const Doc = ({document, setImageClicked, isLogged, handleDocDeletion}) =>{

    const [docHovered, setDocHovered] = useState(false);

    return (
        <div className="pb-2 flex flex-col sm:gap-2 gap-1">
            <div className="relative">
                <img onMouseEnter={()=>{setDocHovered(true)}} onMouseLeave={()=>{setDocHovered(false)}} src={document.image} alt="Image!" className="max-h-[70vh] min-h-[10vh] h-auto cursor-pointer rounded-sm hover:brightness-50" onClick={()=>{setImageClicked(document)}}/>
                {
                    isLogged &&
                    <MdOutlineDeleteOutline onClick={()=>handleDocDeletion(document._id)} className="absolute z-20 text-white hover:text-red-600 cursor-pointer bg-gray-900 right-[-4px] top-[-4px] rounded-full p-1" size={22}/>
                }
                <p className={`font-semibold capitalize sm:text-base text-xs text-white absolute top-1 left-1 ${docHovered ? "opacity-100" : "opacity-0"}`}>Click to Expand</p>
            </div>
            <p className={`font-bold capitalize sm:text-base text-xs ${docHovered ? "text-gray-400" : "text-white"}`}>{document.title}</p>
        </div>
    )
}

const Docs = ()=>{

    const [docs, setDocs] = useState(null);
    const [imageClicked, setImageClicked] = useState(null);
    const { isLogged } = useOutletContext();
    const [addDoc, setAddDoc] = useState(false);

    const handleAddDocument = (e)=>{
        e.preventDefault();
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/doc/create`, {title: e.target[0].value, image: e.target[1].files[0]}, {headers:{'Content-Type': 'multipart/form-data'}})
        .then((response)=>{
            setDocs([...docs, response.data.data])
            setAddDoc(false)
        })
    }
    const handleDocDeletion = (ID)=>{
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/doc/delete/${ID}`)
        .then(()=>{
            setDocs(docs.filter(doc => doc._id != ID))
        })
    }

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
        <> 
            {
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
            {
                addDoc &&
                <form onSubmit={handleAddDocument} className="h-screen w-screen fixed bg-black bg-opacity-80 z-50 top-0 right-0 flex justify-center items-center">
                    <div className='sm:w-[400px] w-[80%] bg-gray-800 p-6 rounded-md flex flex-col gap-4'>
                        <h2 className='text-2xl text-sky-500 font-bold'>Add Document</h2>
                        <input name="title" type='text' placeholder="Enter title" required className='outline-none w-full hover:border hover:border-cyan-500 p-2 rounded-md bg-gray-700 text-white'/>
                        <label htmlFor="doc-image" className="cursor-pointer w-full p-2 rounded-md border border-cyan-500 hover:text-cyan-500 bg-gray-700 flex justify-center text-gray-200">Add Image</label>
                        <input type="file" required accept="image/*" className="hidden" name="image" id="doc-image"/>
                        <div className='w-full flex gap-2'>
                            <button onClick={()=>{setAddDoc(false)}} className='bg-red-500 hover:bg-red-600 text-white rounded-md p-2 w-1/2'>Cancel</button>
                            <button type='submit' className='bg-cyan-500 hover:bg-cyan-600 text-white rounded-md p-2 w-1/2'>Add</button>
                        </div>
                    </div>
                </form>
            }
            <div className="lg:pt-[17vh] sm:pt-[16vh] pt-[13vh] bg-gray-900 flex flex-col gap-5">
                {
                    isLogged &&
                    <div className="w-full flex justify-center">
                        <button onClick={()=>{setAddDoc(true)}} className="sm:text-sm text-xs font-semibold text-white hover:text-cyan-500">Add Document</button>
                    </div>
                } 
                <Masonry className="px-[5vw] w-full min-h-[70vh] h-auto flex gap-2" breakpointCols={breakpointColumns}>
                    {
                        docs?.map(doc=>{
                            return (
                                <Doc document={doc} handleDocDeletion={handleDocDeletion} isLogged={isLogged} key={doc._id} setImageClicked={setImageClicked}/>
                            )
                        })
                    }
                </Masonry>
            </div>
        </>
    )
}

export default Docs