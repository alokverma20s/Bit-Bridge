import React, { useEffect, useState } from "react";
import Card from "./Card";
import { useDispatch } from "react-redux";
import { getContestList } from "../../services/operations/contestAPI";
import { useNavigate } from "react-router-dom";



const Contest = () => {
    const [loading, setLoading] = useState(false);
    const [contests, setContests] = useState([]);

    // console.log(contests);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getContestList(setLoading, setContests));
    }, []);

  return (
    <div className="flex flex-col flex-wrap justify-around items-center mt-20 bg-transparent gap-4 ">
        <div className="flex w-full justify-end pr-20">
            <button onClick={()=>navigate("/contest/createContest")} className="border-2 border-gray-600 p-2 rounded-md hover:bg-slate-300">
                Create Contest
            </button>
        </div>
        <div className="flex w-[90vw] flex-wrap lg:flex-nowrap justify-center gap-4">
            {
                contests.length > 0 ?
                contests.map(contest => <Card key={contest._id} contest={contest} />):
                <div className="text-3xl font-semibold">No Contest is available now....</div>
            
            }
        </div>
    </div>
  );
};

export default Contest;
