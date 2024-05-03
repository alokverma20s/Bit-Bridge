import React, { useEffect } from 'react'
import {useLocation, useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux'
import './HomeMainbar.css';
import QuestionList from './QuestionList';
import toast from 'react-hot-toast';
import Loader from '../Loader/Loader';
import Select from 'react-select';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAllQuestions } from '../../actions/question';
import { Pagination } from '@mui/material';
import Searchbar from '../Navbar/Searchbar';


const HomeMainbar = () => {

    const dispatch = useDispatch();
    const user=1;
    const navigate=useNavigate()
    const [sortingCriteria, setSortingCriteria] = useState("upvotes");
    const [keyword, setKeyword] = useState("");
    const [page, setPage] = useState("1");
    const optionList = [{label : "Newest to oldest", value: "nto"}, {label: "Oldest to newest", value: "otn"}, {label: "Upvotes", value: "upvotes"}];
    
    const checkAuth=()=>{
        if(user==null){
            toast.error("Login or Signup to ask a question");
            navigate('/Auth');
        }
        else{
            navigate('/AskQuestion');
        }
    }
    const questionList = useSelector( state => state.questionsReducer)?.data?.questionList;
    const docCount = useSelector(state=> state.questionsReducer)?.data?.docCount;
    console.log(questionList);
    const location = useLocation();

    function handleSelect1(data){
        setSortingCriteria(data.value);
    }

    useEffect(()=>{
        const timer = setTimeout(() => {
            dispatch(fetchAllQuestions(keyword, sortingCriteria, page))
        }, 1000);
        return () => clearTimeout(timer);
    }, [sortingCriteria, keyword, page, dispatch])

  return (
    <div className='main-bar'>
        <div className='main-bar-header'>
            {
                location.pathname==='/' ? <h1>Top Questions</h1> : <h1>All Questions</h1>
            }
            {/* <div className=' flex flex-row'></div> */}
            <Searchbar setKeyword={setKeyword}></Searchbar>
            <Select className=' w-3/12' options={optionList} placeholder="Sort by: Upvotes" onChange={handleSelect1} defaultValue={"upvotes"}/>
            {/* {docCount>0 && <Pagination count={docCount%50==0? Math.floor(docCount/50): 1+ Math.floor(docCount/50) } variant="outlined" color="secondary" onChange={(e, pageNumber)=>setPage(`${pageNumber}`)}/>} */}
            
            
            <button onClick={checkAuth} className='ask-btn bg-[#6974C6] px-[10px] py-[15px] rounded-[20px] text-white text-[16px]'>Ask Question</button>
        </div>
        <div>
            {
                questionList === null?
                <div className='loader-position'><Loader/></div>
                :
                <div>
                    <p className='questionNumber m-2'>{questionList?.length} of {docCount} questions</p>
                    <QuestionList questionList={questionList}></QuestionList>
                </div>
            }
        </div>
        {docCount>0 && <Pagination className='flex justify-center mt-6' count={docCount%50==0? Math.floor(docCount/50): 1+ Math.floor(docCount/50) } variant="outlined" color="primary" onChange={(e, pageNumber)=>setPage(`${pageNumber}`)}/>}
    </div>
  )
}

export default HomeMainbar;