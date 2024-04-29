import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete, MdEdit } from "react-icons/md";
import { deleteContest } from "../../services/operations/contestAPI";
import { useNavigate } from "react-router-dom";

const Card = ({ contest }) => {
  const User = useSelector((state) => state.currentUserReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const currentTime = new Date();
  const startTime = new Date(contest.startTime);
  const endTime = new Date(contest.endTime);
  // console.log("startTime", new Date(contest.startTime) , "currentTime", currentTime, "endTime" , new Date(contest.endTime));

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

  const handleDeleteContest = () => {
    dispatch(deleteContest( setLoading ,contest._id, navigate));
  };
  const handleEdit = () => {
    navigate(`/contest/editContest/${contest._id}`);
  };

  return (
    // <div className="min-w-[300px] flex flex-col rounded-3xl bg-[#092540] p-10 text-center">
    <div className="contest-card">
      {(User?.result?._id === contest?.author) && (
        <div className="flex items-center justify-end gap-3">
          <button onClick={()=>handleEdit()} className="border border-white p-1 rounded-md">
            <MdEdit className="text-white text-2xl" />
          </button>
          <button onClick={() => handleDeleteContest()} className="border-[0.125px] border-white p-1 rounded-md">
            <MdDelete className="text-white text-2xl" />
          </button>
        </div>
      )}
      <h2 className="text-3xl font-bold leading-tight text-primary-600">
        {contest?.name}
      </h2>
      <p className="mt-5 text-md leading-8">
        Starts At: {formatDate(startTime)} <br />
        Ends At: {formatDate(endTime)}
      </p>
      {new Date(contest.endTime) >= currentTime ? (
        <div className="mt-6 flex flex-col lg:flex-row items-center justify-center gap-4">
          <button
            className="flex items-center justify-center gap-2 rounded-full bg-primary-600 px-5 py-3 text-lg font-medium text-white hover:bg-primary-700"
            disabled={
              (
                new Date(contest.startTime) > currentTime
                  ? true
                  : new Date(contest.endTime) < currentTime
              )
                ? true
                : false
            }
            onClick={() => navigate(`/contest/${contest._id}`)}
          >
            <span> Start </span>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M6.00156 13.4016L4.60156 12.0016L8.60156 8.00156L4.60156 4.00156L6.00156 2.60156L11.4016 8.00156L6.00156 13.4016Z"
                  fill="white"
                />
              </svg>
            </span>
          </button>
          <button className="flex items-center justify-center gap-2 rounded-full border border-white/50 px-5 py-3 text-lg font-medium text-white bg-primary-400 hover:bg-primary-500">
            <span>Instruction</span>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M6.00156 13.4016L4.60156 12.0016L8.60156 8.00156L4.60156 4.00156L6.00156 2.60156L11.4016 8.00156L6.00156 13.4016Z"
                  fill="white"
                />
              </svg>
            </span>
          </button>
        </div>
      ) : (
        <div className="mt-5 text-md leading-8  ">
          The Contest is Over now
        </div>
      )}
    </div>
  );
};

export default Card;
