import React, { useEffect, useState } from "react";
import { MdAdd, MdArrowForward, MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProblem } from "../../services/operations/ProblemAPI";

const AddProblem = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const User = useSelector( state => state.currentUserReducer);
  const [problemData, setProblemData] = useState({
    title: "",
    author: User?.result?._id,
    statement: "",
    examples: [],
    constraints: [],
    difficulty: "",
    topics: [],
    companies: [],
    testcases: [],
  });

  console.log(problemData);

  const [tempExample, setTempExample] = useState({
    input: "",
    output: "",
    explanation: "",
  });

  const [tempTestcase, setTempTestcase] = useState({
    input: "",
    output: "",
  });

  const [tempConstraint, setTempConstraint] = useState("");
  const [tempTopic, setTempTopic] = useState("");
  const [tempCompany, setTempCompany] = useState("");
  const [loading, setLoading] = useState(false);

  const addExample = (e) => {
    e.preventDefault();
    if (
      tempExample.input === "" ||
      tempExample.output === "" ||
      tempExample.explanation === ""
    )
      return alert("Please fill all the fields in Example");
    setProblemData({
      ...problemData,
      examples: [...problemData.examples, tempExample],
    });
    setTempExample({
      input: "",
      output: "",
      explanation: "",
    });
  };

  const handleDeleteConstraints = (constraint) => {
    const newConstraints = problemData.constraints.filter(
      (item) => item !== constraint
    );
    setProblemData({
      ...problemData,
      constraints: newConstraints,
    });
  };

  const handleDeleteTopics = (topic) => {
    const newTopics = problemData.topics.filter((item) => item !== topic);
    setProblemData({
      ...problemData,
      topics: newTopics,
    });
  }

  const handleDeleteCompanies = (company) => {
    const newCompanies = problemData.companies.filter((item) => item !== company);
    setProblemData({
      ...problemData,
      companies: newCompanies,
    });
  }

  const addTestcase = (e) => {
    e.preventDefault();
    if (
      tempTestcase.input === "" ||
      tempTestcase.output === ""
    )
      return alert("Please fill all the fields in Testcase");
    setProblemData({
      ...problemData,
      testcases: [...problemData.testcases, tempTestcase],
    });
    setTempTestcase({
      input: "",
      output: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(problemData);
    if (
      problemData.title === "" ||
      problemData.statement === "" ||
      problemData.examples.length === 0 ||
      problemData.constraints.length === 0 ||
      problemData.difficulty === "" ||
      problemData.topics.length === 0 ||
      problemData.companies.length === 0 ||
      problemData.testcases.length === 0
    )
      return alert("Please fill all the fields form the problem");
    dispatch(createProblem(setLoading, problemData, navigate));
  };

  return (
    <div className="flex justify-center mx-auto">
      <div className="mt-20 flex flex-col justify-center items-center w-[80vw]">
        <h1 className="text-4xl font-bold font-sans">Add Problem</h1>
        <form className="w-full" onSubmit={() => handleSubmit()}>
          <div className="my-10 flex flex-col gap-4">

            {/* Problem Title */}
            <div className="flex w-full justify-between items-center my-4">
              <label className="text-base font-sans font-medium">
                Problem Title :
              </label>
              <div className="w-[60%]">
                <input
                  type="text"
                  name="title"
                  onChange={(e) => {
                    setProblemData({ ...problemData, title: e.target.value });
                  }}
                  className=" w-full rounded-md border border-blue-gray-200 bg-black px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-primary-300  focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  placeholder="Enter the name of the contest"
                />
              </div>
            </div>


            {/* Problem Statement */}
            <div className="flex w-full justify-between items-start">
              <label className="text-base font-sans mt-4 font-medium">
                Problem Statement :
              </label>
              <div className="w-[60%]">
                <textarea
                  type="text"
                  name="title"
                  onChange={(e) => {
                    setProblemData({
                      ...problemData,
                      statement: e.target.value,
                    });
                  }}
                  className=" h-[200px] w-full resize-none rounded-md border border-blue-gray-200 bg-white px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-primary-300  focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  placeholder="Enter the description of the problem"
                />
              </div>
            </div>


            {/* Problem Example */}
            <div className="flex w-full justify-between items-start">
              <label className="text-base font-sans mt-4 font-medium">
                Problem Example :
              </label>
              <div className="flex items-start flex-col w-[60%] gap-2">
                {problemData.examples.length > 0 &&
                  problemData.examples.map((example, index) => (
                    <div key={index} className="flex flex-col w-full gap-2">
                      <div className="flex justify-between">
                        Input: {example.input} <br />
                        Output: {example.output} <br />
                        Explanation: {example.explanation}
                        <MdDelete
                          className="text-xl cursor-pointer mr-2"
                          onClick={() =>
                            setProblemData({
                              ...problemData,
                              examples: problemData.examples.filter(
                                (item, i) => i !== index
                              ),
                            })
                          }
                        />
                      </div>
                      <div className="h-[1px] bg-gray-300 w-full rounded-full" />
                    </div>
                  ))}
                <input
                  type="text"
                  name="input"
                  onChange={(e) =>
                    setTempExample({ ...tempExample, input: e.target.value })
                  }
                  value={tempExample.input}
                  className=" w-[100%] resize-none rounded-md border border-blue-gray-200 bg-white px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-primary-300  focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  placeholder="Input"
                />
                <input
                  type="text"
                  name="output"
                  onChange={(e) =>
                    setTempExample({ ...tempExample, output: e.target.value })
                  }
                  value={tempExample.output}
                  className=" w-[100%] resize-none rounded-md border border-blue-gray-200 bg-white px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-primary-300  focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  placeholder="Output"
                />
                <input
                  type="text"
                  name="explanation"
                  onChange={(e) =>
                    setTempExample({
                      ...tempExample,
                      explanation: e.target.value,
                    })
                  }
                  value={tempExample.explanation}
                  className=" w-[100%] resize-none rounded-md border border-blue-gray-200 bg-white px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-primary-300  focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  placeholder="Explanation"
                />
                <span
                  className="mt-6 block w-full cursor-pointer select-none rounded-lg bg-primary-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-black shadow-md shadow-primary-2 transition-all hover:shadow-lg hover:shadow-primary-500 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  onClick={(e) => addExample(e)}
                >
                  Add Example
                </span>
              </div>
            </div>


            {/* Constraints */}
            <div className="flex w-full justify-between items-start mt-6">
              <label className="text-base font-sans mt-4 font-medium">
                Problem Constraints :
              </label>
              <div className="w-[60%] flex flex-col items-center">
                {problemData.constraints.length > 0 &&
                  problemData.constraints.map((constraint, index) => (
                    <div key={index} className="w-full mb-2">
                      <div className="flex justify-between">
                        {constraint}
                        <MdDelete
                          className="text-xl cursor-pointer mr-2"
                          onClick={() => handleDeleteConstraints(constraint)}
                        />
                      </div>
                      <div className="h-[1px] bg-gray-300 w-full rounded-full" />
                    </div>
                  ))}
                <div className="w-full flex mt-4">
                  <input
                    type="text"
                    name="title"
                    onChange={(e) => {
                      setTempConstraint(e.target.value);
                    }}
                    value={tempConstraint}
                    autoComplete="off"
                    className="w-full resize-none rounded-md border border-blue-gray-200 bg-white px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-primary-300  focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                    placeholder="Enter the constraints of the problem"
                  />
                  <span
                    className=" ml-4 block h-full cursor-pointer select-none rounded-lg bg-primary-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-black shadow-md shadow-primary-2 transition-all hover:shadow-lg hover:shadow-primary-500 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    onClick={(e) => {
                      e.preventDefault();
                      if (tempConstraint === "")
                        return alert("Please fill the constraint");
                      setProblemData({
                        ...problemData,
                        constraints: [
                          ...problemData.constraints,
                          tempConstraint,
                        ],
                      });
                      setTempConstraint("");
                    }}
                  >
                    Add
                  </span>
                </div>
              </div>
            </div>

            {/* Difficulty */}
            <div className="flex w-full justify-between items-start mt-6">
              <label className="text-base font-sans mt-4 font-medium">
                Difficulty :
              </label>
              <div className="w-[60%] flex flex-col items-center">
                <select
                  name="difficulty"
                  onChange={(e) => {
                    console.log(e.target.value);
                    setProblemData({
                      ...problemData,
                      difficulty: e.target.value,
                    });}}
                  className="w-full resize-none rounded-md border border-blue-gray-200 bg-white px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-primary-300  focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  placeholder="Enter the constraints of the problem"
                >
                  <option value="">
                    Select the difficulty
                  </option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
            </div>

            {/* Topic */}
            <div className="flex w-full justify-between items-start mt-2">
              <label className="text-base font-sans mt-4 font-medium">
                Topics :
              </label>
              <div className="w-[60%] flex flex-col items-center">
                {problemData.topics.length > 0 &&
                  problemData.topics.map((topic, index) => (
                    <div key={index} className="w-full mb-2">
                      <div className="flex justify-between">
                        {topic}
                        <MdDelete
                          className="text-xl cursor-pointer mr-2"
                          onClick={() => handleDeleteTopics(topic)}
                        />
                      </div>
                      <div className="h-[1px] bg-gray-300 w-full rounded-full" />
                    </div>
                  ))}
                <div className="w-full flex mt-4">
                  <input
                    type="text"
                    name="title"
                    onChange={(e) => {
                      setTempTopic(e.target.value);
                    }}
                    value={tempTopic}
                    autoComplete="off"
                    className="w-full resize-none rounded-md border border-blue-gray-200 bg-white px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-primary-300  focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                    placeholder="Enter the constraints of the problem"
                  />
                  <span
                    className=" ml-4 block h-full cursor-pointer select-none rounded-lg bg-primary-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-black shadow-md shadow-primary-2 transition-all hover:shadow-lg hover:shadow-primary-500 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    onClick={(e) => {
                      e.preventDefault();
                      if (tempTopic === "")
                        return alert("Please fill the constraint");
                      setProblemData({
                        ...problemData,
                        topics: [
                          ...problemData.topics,
                          tempTopic,
                        ],
                      });
                      setTempTopic("");
                    }}
                  >
                    Add
                  </span>
                </div>
              </div>
            </div>


            {/* Company Name */}
            <div className="flex w-full justify-between items-start mt-2">
              <label className="text-base font-sans mt-4 font-medium">
                Companies :
              </label>
              <div className="w-[60%] flex flex-col items-center">
                {problemData.companies.length > 0 &&
                  problemData.companies.map((company, index) => (
                    <div key={index} className="w-full mb-2">
                      <div className="flex justify-between">
                        {company}
                        <MdDelete
                          className="text-xl cursor-pointer mr-2"
                          onClick={() => handleDeleteCompanies(company)}
                        />
                      </div>
                      <div className="h-[1px] bg-gray-300 w-full rounded-full" />
                    </div>
                  ))}
                <div className="w-full flex mt-4">
                  <input
                    type="text"
                    name="title"
                    onChange={(e) => {
                      setTempCompany(e.target.value);
                    }}
                    value={tempCompany}
                    className="w-full resize-none rounded-md border border-blue-gray-200 bg-white px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-primary-300  focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                    placeholder="Enter the constraints of the problem"
                  />
                  <span
                    className=" ml-4 block h-full select-none rounded-lg bg-primary-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-black shadow-md shadow-primary-2 transition-all hover:shadow-lg hover:shadow-primary-500 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    onClick={(e) => {
                      e.preventDefault();
                      if (tempCompany === "")
                        return alert("Please fill the constraint");
                      setProblemData({
                        ...problemData,
                        companies: [
                          ...problemData.companies,
                          tempCompany,
                        ],
                      });
                      setTempCompany("");
                    }}
                  >
                    Add
                  </span>
                </div>
              </div>
            </div>

            
            {/* TestCases */}
            <div className="flex w-full justify-between items-start mt-6">
              <label className="text-base font-sans mt-4 font-medium">
                Testcases :
              </label>
              <div className="flex items-start flex-col w-[60%] gap-2">
                {problemData.testcases.length > 0 &&
                  problemData.testcases.map((testcase, index) => (
                    <div key={index} className="flex flex-col w-full gap-2">
                      <div className="flex justify-between">
                        Input: {testcase.input} <br />
                        Output: {testcase.output}
                        <MdDelete
                          className="text-xl cursor-pointer mr-2"
                          onClick={() =>
                            setProblemData({
                              ...problemData,
                              testcases: problemData.testcases.filter(
                                (item, i) => i !== index
                              ),
                            })
                          }
                        />
                      </div>
                      <div className="h-[1px] bg-gray-300 w-full rounded-full" />
                    </div>
                  ))}
                <input
                  type="text"
                  name="inputTestcase"
                  onChange={(e) =>
                    setTempTestcase({ ...tempTestcase, input: e.target.value })
                  }
                  value={tempTestcase.input}
                  className=" w-[100%] resize-none rounded-md border border-blue-gray-200 bg-white px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-primary-300  focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  placeholder="Input"
                />
                <input
                  type="text"
                  name="output"
                  onChange={(e) =>
                    setTempTestcase({ ...tempTestcase, output: e.target.value })
                  }
                  value={tempTestcase.output}
                  className=" w-[100%] resize-none rounded-md border border-blue-gray-200 bg-white px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-primary-300  focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  placeholder="Output"
                />
                <span
                  className="mt-6 block w-full cursor-pointer select-none rounded-lg bg-primary-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-black shadow-md shadow-primary-2 transition-all hover:shadow-lg hover:shadow-primary-500 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  onClick={(e) => addTestcase(e)}
                >
                  Add Testcase
                </span>
              </div>
            </div>


            
            <button
              type="submit"
              onClick={(e) => handleSubmit(e)}
              className="mt-6 block w-full select-none rounded-lg bg-primary-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-black shadow-md shadow-primary-2 transition-all hover:shadow-lg hover:shadow-primary-500 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            >
              Submit
            </button>
            
            
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProblem;
