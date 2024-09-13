import React, { useState } from 'react'
import { FaFileWord } from "react-icons/fa6";
import axios from "axios";

export default function Home() {
  const [selectFile, setSelectFile]=useState(null);
  const [convert,setConvert]= useState("")
  const [downloadError,setDownloadError]=useState("")
  // console.log(selectFile);
  const handleFileChange = (e)=>{
  //  console.log(e.target.files[0]);
   setSelectFile(e.target.files[0]);
  }

   const handleSubmit= async(event)=>{
    event.preventDefault();
    if(!selectFile){
      setConvert("please select a file")
      return;
    }
    const formData =  new FormData();
    formData.append("file", selectFile);
    // ***************connect backend in frontend
     try {
       const response=await axios.post("http://localhost:3000/convertFile" ,formData ,{
         responseType:"blob",
       });
       console.log(response)
       const url = window.URL.createObjectURL(new Blob([response.data]))
       console.log(url)
       const link = document.createElement("a");
       console.log(link);
       link.href = url;
       console.log(link);
       link.setAttribute(
         "download",
         selectFile.name.replace(/\.[^/.]+$/, "") + ".pdf"
       );
       console.log(link)
       document.body.appendChild(link);
       console.log(link)
       link.click();
       link.parentNode.removeChild(link);
       setSelectFile(null);
       setDownloadError("")
       setConvert("File convert Successfully")
     }catch(error){
      console.error("There was an error converting the file!", error);
      setDownloadError("Error converting file");
     } 
   }
  
  return (
    <>
      <div className=' max-w-screen-2xl mx-auto container px-6 py-3 md:px-40'>
        <div className="flex h-screen items-center justify-center">
          <div className="border-2 border-dashed px-4 py-2 md:px-8 md:py-6 border-indigo-400 rounded-lg shadow-lg ">
          <h1 className=" text-3xl font-bold text-center mb-4">
              Convert Word to PDF Online
            </h1>
            <p className="text-sm text-center mb-5">
              Easily convert Word documents to PDF format online, without having
              to install any software.
            </p>

          
           <div className="flex flex-col items-center space-y-4">
            <input
              type='file'
               accept=".doc,.docx"
               onChange={handleFileChange}
               className="hidden"
               id="FileInput"
             />
              <label
                htmlFor="FileInput"
                className="w-full flex items-center justify-center px-4 py-6 bg-gray-100 text-gray-700 rounded-lg shadow-lg cursor-pointer border-blue-300 hover:bg-blue-700 duration-300 hover:text-white"
              >
                
                <FaFileWord className="text-3xl mr-3" hover:text-white />
                <span className="text-2xl mr-2  ">
                  {selectFile?selectFile.name:"Chose File"}
                  {/* {selectedFile ? selectedFile.name : "Choose File"} */}
                </span>

              </label>

              <button
              onClick={handleSubmit}
              disabled={!selectFile} className ="text-white bg-blue-500 hover:bg-blue-700 disabled:bg-gray-400 disabled:pointer-events-none duration-300 font-bold px-4 py-2 rounded-lg"
                 >Convert PDF</button>
                 {convert && (<div className='text-green-500 text-center'> {convert}</div>) }
                 {downloadError && (<div className='text-red-500 text-center'> {downloadError}</div>)}
           </div>
        </div>
        </div>
      </div>
    </>
  )
}
