import React, { useEffect, useState } from 'react'
import { getContestById } from '../../services/operations/contestAPI';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const ContestPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const contestId = useParams().id;
    const [loading, setLoading] = useState(false);
    const [contest, setContest] = useState([]);

    const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        let hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const amOrPm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12; // Convert hour to 12-hour format
        hours = String(hours).padStart(2, "0");
    
        return `${day}/${month}/${year} ${hours}:${minutes} ${amOrPm}`;
      };

    useEffect(() => {
        dispatch(getContestById(setLoading, setContest, contestId ));
    }, []);
    console.log(contest);
  return (
    <div className='mt-20'>
        <h1 className='text-3xl font-bold text-center'>{contest.name}</h1>
        <div className='text-xl font-semibold text-center'>{contest.description}</div>
        <div className='flex justify-center gap-4'>
            <div className='text-lg font-semibold'>Starts At: {formatDate(new Date(contest.startTime))}</div>
            <div className='text-lg font-semibold'>Ends At: {formatDate(new Date(contest.endTime))}</div>
        </div>

        <div className='mt-10'>
            <div className='text-2xl font-semibold text-center'>Problems</div>
            <div className='flex flex-wrap justify-center gap-4'>
                {
                    contest.problems?.map(problem => (
                        <div key={problem._id} className='min-w-[300px] max-w-[300px] p-5 bg-[#092540] rounded-3xl text-center cursor-pointer' onClick={()=>navigate(`/contest/${contestId}/${problem._id}`)}>
                            <h2 className='text-2xl font-semibold text-white'>{problem.name}</h2>
                            <p className='text-md text-white mt-5'>{problem.description}</p>
                        </div>
                    ))
                }
            </div>
        </div>

    </div>
  )
}

export default ContestPage