import React, { useEffect } from 'react'
import Loader from '../../components/Loader/Loader.jsx'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar.jsx'
import { useState } from 'react'
import { FaFilePdf } from "react-icons/fa";
import { getAllResources, addResource } from '../../services/operations/resourcesAPI.js';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast';
const BASE_URL = process.env.REACT_APP_BASE_URL;

const SubjectResource = () => {
  const User = useSelector((state) =>( state.currentUserReducer))
  
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [resources, setResources] = useState(undefined);
  const [subjectName, setSubjectName] = useState(undefined);
  const { subjectId } = useParams();
  const dispatch = useDispatch();
  // const subjectId = "6559b7667aad4a8fff67f68e";


  const [file, setFile] = useState()
  const [resourceName, setResourceName]=useState(undefined);
  const [description, setDescription] = useState();
  const authorId = User?.result._id;
  const userId = User?.result._id;

  function handleChange(event) {
    setFile(event.target.files[0])
  }
  
  function handleSubmit(event) {
    event.preventDefault()
    setUploading(true);

    if(!file){
      toast.error("Please select a file to upload");
      setUploading(false);
      return;
    }
    if(!resourceName){
      toast.error("Please enter a resource name");
      setUploading(false);
      return;
    }
    if(!authorId) {
      toast.error("Please login to upload resource");
      setUploading(false);
      return;
    }
    const formData = new FormData();
    formData.append('file', file);
    formData.append('resourceName', resourceName);
    formData.append('description', description);
    formData.append('authorId', authorId);
    formData.append('subjectId', subjectId);
    formData.append('userId', userId);
    console.log(formData);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    const url = `${BASE_URL}/resources/${subjectId}`
    // dispatch(addResource(formData, config));
    axios.post(url, formData).then((response) => {
      console.log(response.data);
      toast.success(response.data.message);
      setUploading(false);
    });

  }


  useEffect(() => {
    dispatch(getAllResources(subjectId, setLoading, setResources, setSubjectName, dispatch));
    // console.log(resources);
  }, [dispatch, subjectId, toast]);

  return (
    <div className='home-container-1'>
      <LeftSidebar />
      <div className='home-container-2'>
        <div>
          {
            loading ? <div className='loader-position'><Loader /></div> :
              <div className="main-bar">
                <div className="main-bar-header">
                  <h1>{subjectName} resources</h1>
                </div>
                {
                  resources.length == 0 && <p>No Resources available.</p>
                }
                <div className="resource-container">

                  {
                    resources.map((resource) => (
                      <div key={resource?._id} className="resource-card">
                        <div className="resource-card-header">
                          <h3>{resource?.resourceName} ({resource?.page} pages)</h3>
                        </div>
                        <div className="resource-card-body">
                          <Link to={resource?.pdfFileURL} target="_blank"><p id='link-to-pdf'><FaFilePdf size={100} /> {resource?.originalName}</p></Link>
                          {/* <p>{resource?.description}</p> */}
                          <p>Posted by {resource?.author.name} <br />{moment(resource?.uploadedOn).fromNow()}</p>
                        </div>
                      </div>
                    ))
                  }
                </div>

                <div className='add-resource-container'>
                  <h3>Add Resource</h3>
                  <form onSubmit={handleSubmit}>
                    
                    <p>Enter Resource name</p>
                    <input type="text" name="resourceName" id="" onChange={(e)=>setResourceName(e.target.value)}/>
                    <p>Enter a very short description(optional)</p>
                    <input type="text" name="description" id="" onChange={(e)=>setDescription(e.target.value)}/>
                    <p>Upload a file in pdf format</p>
                    <input type="file" onChange={handleChange} />
                    <button type="submit">Upload</button>
                    {uploading && <span> Uploading.... please wait</span>}
                  </form>
                </div>

              </div>
          }
        </div>
      </div>
    </div>
  )
}

export default SubjectResource