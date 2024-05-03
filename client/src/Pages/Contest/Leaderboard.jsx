import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getLeaderboard } from '../../services/operations/contestAPI';
import Loader from "../../components/Loader/Loader";

const Leaderboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const contestId = useParams().id;
    const [loading, setLoading] = useState(true);
    const [leaderboard, setLeaderboard] = useState([]);
    const [currentUserData, setCurrentUserData] = useState({})
    const currentUser = useSelector((state) => state.currentUserReducer);
    
    
    
    useEffect(() => {
        if(!currentUser?.result){
            navigate('/auth');
        }
        dispatch(getLeaderboard(setLoading, setLeaderboard, contestId));
    }, []);

    useEffect(() => {
        setCurrentUserData(leaderboard.find(user => user.user._id === currentUser?.result?._id));
    }, [leaderboard, currentUserData]);
    return (
    <div className='mt-16'>
        <h1 className='text-3xl font-bold text-center text-primary-600'>Leaderboard</h1>
        <div className='mt-10'>
            { leaderboard.length > 0 ?
            <div>
            {   loading ? <div className='w-full h-[90vh] flex justify-center items-center'><Loader /></div> :
                <table className='w-full'>
                    <thead>
                        <tr>
                            <th className='text-xl font-semibold text-center'>Rank</th>
                            <th className='text-xl font-semibold text-center'>Name</th>
                            <th className='text-xl font-semibold text-center'>Email</th>
                            <th className='text-xl font-semibold text-center'>Score</th>
                            <th className='text-xl font-semibold text-center'>Finish Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentUserData && 
                        <tr key={currentUserData?._id} className='border-b-primary-600 border-b mb-2'>
                            <td className='text-lg font-semibold text-center'>{currentUserData?.ranks}</td>
                            <td className='text-lg font-semibold text-center'>{currentUserData?.user.name}</td>
                            <td className='text-lg font-semibold text-center'>{currentUserData?.user.email}</td>
                            <td className='text-lg font-semibold text-center'>{currentUserData?.score}</td>
                            <td className='text-lg font-semibold text-center'>{new Date(currentUserData?.lastSubmission).toLocaleTimeString()}</td>
                        </tr>}
                            
                        {
                            leaderboard.map((user, index) => (
                                <tr key={user._id} className='border-b-primary-600 border-b mb-2'>
                                    <td className='text-lg font-semibold text-center'>{user.ranks}</td>
                                    <td className='text-lg font-semibold text-center'>{user.user.name}</td>
                                    <td className='text-lg font-semibold text-center'>{user.user.email}</td>
                                    <td className='text-lg font-semibold text-center'>{user.score}</td>
                                    <td className='text-lg font-semibold text-center'>{new Date(user.lastSubmission).toLocaleTimeString()}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            }</div> :
                <div className="flex justify-center items-center w-screen h-[78vh]">
                    <p className='text-primary-700 font-bold text-3xl'>No Data Available...</p>
                </div>
            }
        </div>
    </div>
  )
}

export default Leaderboard