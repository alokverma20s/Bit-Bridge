import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createContest } from "../../services/operations/contestAPI";
import { useNavigate } from "react-router-dom";
import { getProblemList } from "../../services/operations/ProblemAPI";
import { MdDelete } from "react-icons/md";
import { duration } from "moment";

const CreateContest = () => {
  const User = useSelector((state) => state.currentUserReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [contestData, setContestData] = useState({
    name: "",
    description: "",
    startTime: "",
    endTime: "",
    duration:"",
    author: User?.result?._id,
    contestProblems: [],
  });

  const handleAddProblem = (problem) => {
    // Create a copy of contestData to avoid mutating the state directly
    const updatedContestData = { ...contestData };
    const problemObject = JSON.parse(problem)

    // Push the new problem into the contestProblems array
    updatedContestData.contestProblems.push(problemObject);

    // Update the state with the new contestData
    setContestData(updatedContestData);

    setProblems(problems.filter((p) => JSON.stringify(p) !== problem));
  };
  // console.log(contestData);
  const [loading, setLoading] = useState(false);
  const [problems, setProblems] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedContestData = { ...contestData };
    updatedContestData.contestProblems = updatedContestData.contestProblems.map((problem) => problem._id);


    dispatch(createContest(setLoading, updatedContestData, navigate));
  };


  const handleDelete = (problem)=>{
    const updatedContestData = {...contestData};
    updatedContestData.contestProblems = updatedContestData.contestProblems.filter(p=>p !== problem);
    setContestData(updatedContestData);
    problems.push(problem)
    problems.sort((a,b)=>a.seq-b.seq)

  }
  useEffect(() => {
    dispatch(getProblemList(setLoading, setProblems));
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="relative flex flex-col rounded-xl bg-gray-200 p-6 bg-clip-border text-gray-700 shadow-none">
        <h4 className="block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
          Create Contest
        </h4>
        <p className="mt-1 block font-sans text-base font-normal leading-relaxed text-gray-700 antialiased">
          Enter contest details.
        </p>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        >
          <div className="mb-4 flex flex-col gap-6">

            {/* Contest Name */}
            <div className="relative h-11 w-full min-w-[200px]">
              <input
                type="text"
                onChange={(e) => {
                  setContestData({ ...contestData, name: e.target.value });
                }}
                className="h-full w-full rounded-md border border-blue-gray-200 bg-white px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-primary-300 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                placeholder=" "
              />
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-primary-300 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-primary-300 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-primary-300 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Contest's Name
              </label>
            </div>

            {/* Contest Description */}
            <div className="relative h-11 w-full min-w-[200px]">
              <input
                type="text"
                onChange={(e) => {
                  setContestData({
                    ...contestData,
                    description: e.target.value,
                  });
                }}
                className="peer h-full w-full rounded-md border border-blue-gray-200 bg-white px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-primary-300 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                placeholder=" "
              />
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-primary-300 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-primary-300 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-primary-300 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Description
              </label>
            </div>

            {/* Contest Duration */}
            <div className="relative h-11 w-full min-w-[200px]">
              <input
                type="text"
                onChange={(e) => {
                  setContestData({
                    ...contestData,
                    duration: e.target.value,
                  });
                }}
                className="peer h-full w-full rounded-md border border-blue-gray-200 bg-white px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-primary-300 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                placeholder=" "
              />
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-primary-300 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-primary-300 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-primary-300 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Duration in minutes
              </label>
            </div>

            {/* Contest Start */}
            <div className="relative h-11 w-full min-w-[200px]">
              <input
                type="datetime-local"
                onChange={(e) => {
                  setContestData({ ...contestData, startTime: e.target.value });
                }}
                className="peer h-full w-full rounded-md border border-blue-gray-200 bg-white px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-primary-300 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                placeholder=" "
              />
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-primary-300 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-primary-300 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-primary-300 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Start Time
              </label>
            </div>

            {/* Contest End */}
            <div className="relative h-11 w-full min-w-[200px]">
              <input
                type="datetime-local"
                onChange={(e) => {
                  setContestData({ ...contestData, endTime: e.target.value });
                }}
                className="peer h-full w-full rounded-md border border-blue-gray-200 bg-white px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-primary-300 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                placeholder=" "
              />
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-primary-300 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-primary-300 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-primary-300 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                End Time
              </label>
            </div>
          </div>

          {/* Contest Problems */}
          <div>
            {contestData.contestProblems.length > 0 && (
              <div className="text-xl font-semibold mb-4">Selected Problem</div>
            )}
            {contestData.contestProblems.length > 0 &&
              contestData.contestProblems.map((problem) => (
                <div className="mb-1 flex justify-between items-center bg-gray-400 p-2 rounded-md" key={problem}>
                  <p>{`${problem.seq} ${problem.name}`}</p> <MdDelete className="text-xl cursor-pointer" onClick={()=> handleDelete(problem)}/></div>
              ))}
            <select
              className="w-full p-2 rounded-md mt-4"
              onChange={(e) => handleAddProblem(e.target.value)}
            >
              <option value="1">Select Problem</option>
              {loading ? (
                <option>Loading...</option>
              ) : (
                problems.map((problem) => (
                  <option
                    key={problem._id}
                    value={JSON.stringify(problem)}
                  >{`${problem.seq} ${problem.name}`}</option>
                ))
              )}
            </select>
          </div>

          
          {/* Add new Problem */}

          <span
            onClick={() => navigate("/contest/addProblem")}
            className="text-xs font-sans text-primary-500 cursor-pointer ml-1 hover:underline"
          >
            Add New Problem?
          </span>

          {/* Submit Button */}
          <button
            className="mt-6 block w-full select-none rounded-lg bg-primary-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-black shadow-md shadow-primary-2 transition-all hover:shadow-lg hover:shadow-primary-500 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="submit"
            data-ripple-light="true"
          >
            Create Contest
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateContest;
