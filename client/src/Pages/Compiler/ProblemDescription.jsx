import React from "react";
import { question } from "./constants";
import "./styles.css";
import { FaTag, FaRegLightbulb } from "react-icons/fa";
import { GoOrganization } from "react-icons/go";

const ProblemDescription = () => {
  return (
    <div className="w-full">
      <h1 className="text-2xl font-semibold mb-3">{question.problemName}</h1>

      <span
        className={`${
          question.difficulty === "Easy"
            ? "text-green-600"
            : question.difficulty === "Medium"
            ? " text-yellow-500"
            : "text-red-500"
        } px-2 py-0.5 bg-slate-300 rounded-full`}
      >
        {question.difficulty}
      </span>
      <a
        href="#topic"
        className={` ml-3 px-2 cursor-pointer py-0.5 bg-slate-300 rounded-full scroll-smooth`}
      >
        <FaTag className="inline text-xs" />
        <span className="ml-1">Topic</span>
      </a>
      <a
        href="#company"
        className={` ml-3 px-2 cursor-pointer py-0.5 bg-slate-300 rounded-full`}
      >
        <GoOrganization className="inline text-xs" />
        <span className="ml-1">Company</span>
      </a>
      <a
        href="#hint"
        className={` ml-3 px-2 cursor-pointer py-0.5 bg-slate-300 rounded-full`}
      >
        <FaRegLightbulb className="inline text-xs" />
        <span className="ml-1">Hint</span>
      </a>

      <div className="mt-7">
        {question.problemStatement.map((statement, index) => (
          <p key={index} className="text-sm lg:text-base mb-1">
            {statement}
          </p>
        ))}
      </div>
      {question.example.map((example, index) => (
        <div key={index} className="my-4">
          <h2 className="text-sm lg:text-lg font-semibold">Example {index + 1}</h2>
          <div className="border-l-[3px] border-l-gray-200 px-3 my-2">
            <div>
              <span className="text-sm lg:text-base font-semibold">Input: </span>
              <span
                className="text-sm lg:text-base text-gray-600 font-mono bg-gray-100 px-2 rounded-md"
                dangerouslySetInnerHTML={{ __html: example.input }}
              ></span>
            </div>
            <div>
              <span className="text-sm lg:text-base font-semibold ">Ouput: </span>
              <span
                className="text-sm lg:text-base text-gray-600 font-mono bg-gray-100 px-2 rounded-md"
                dangerouslySetInnerHTML={{ __html: example.output }}
              ></span>
            </div>
          </div>
        </div>
      ))}
      <h2 className="text-sm lg:text-lg font-semibold mb-2">Constraints</h2>
      {question.constraints.map((constraint, index) => (
        <li
          key={index}
          className=" text-sm lg:text-base mb-1 ml-2 font-mono text-gray-600 "
        >
          <span
            className="bg-gray-100 px-2 rounded-md"
            dangerouslySetInnerHTML={{ __html: constraint }}
          ></span>
        </li>
      ))}
      <h2 className="text-sm lg:text-lg font-semibold">Follow Up</h2>
      <p
        className=" text-sm lg:text-base mb-5"
        dangerouslySetInnerHTML={{ __html: question.followUp }}
      ></p>
      {question?.topics && question.topics.length > 0 && (
        <details className="mb-5" id="topic">
          <summary className="text-lg font-semibold mb-3 cursor-pointer bg-gray-200 px-3 rounded-md">
            Topic
          </summary>
          {question.topics.map((topic, index) => (
            <span
              key={index}
              className="text-sm lg:text-base mx-1 px-2 py-1 bg-gray-100 rounded-lg"
            >
              {topic}
            </span>
          ))}
        </details>
      )}
      {question?.company && question.company.length > 0 && (
        <details className="mb-5" id="company">
          <summary className="text-lg font-semibold mb-3 cursor-pointer bg-gray-200 px-3 rounded-md">
            Company
          </summary>
          {question.company.map((company, index) => (
            <span
              key={index}
              className="text-sm lg:text-base leading-8 mx-1 px-2 py-1 bg-gray-100 rounded-lg"
            >
              {company}
            </span>
          ))}
        </details>
      )}
      {question?.hint && question.hint.length > 0 && (
        <details className="mb-5" id="hint">
          <summary className="text-lg font-semibold mb-3 cursor-pointer bg-gray-200 px-3 rounded-md">
            Hint
          </summary>
          {question.hint.map((hint, index) => (
            <li key={index} className="text-sm lg:text-base ml-2">
              {hint}
            </li>
          ))}
        </details>
      )}
    </div>
  );
};

export default ProblemDescription;
