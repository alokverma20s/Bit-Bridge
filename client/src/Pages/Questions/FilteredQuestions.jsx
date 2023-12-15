import React from 'react'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar';
import { useSelector } from 'react-redux';
import QuestionList from '../../components/HomeMainbar/QuestionList';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

const FilteredQuestions = () => {
  const {searchText} = useParams();
  let filteredQuestionArray=[];
  const questions = useSelector((state) => state.questionsReducer);
  const questionList = questions?.data
  // console.log(questionList);

  const unnecessaryWords = [
    "a",
    "the",
    "is",
    "how",
    "but",
    "what",
    "how",
    "where",
    "are",
    "to",
    "."
  ];

  const tempWords = searchText?.split(" ");
  const words = tempWords.map(str => str.toLowerCase())
  const necessaryWords = words?.filter(
    (word) => !unnecessaryWords?.includes(word)
  );

  const filteredQuestion = new Set(); 

  for(let q = 0; q < questionList?.length; q++){
    necessaryWords?.forEach(word => {
      const questionTitleNonLowerCase = questionList[q]?.questionTitle.split(" ")
      const lowerCasequestionTitle = questionTitleNonLowerCase?.map(splitWord => splitWord?.toLowerCase())
      const lowerCasequestionTitleString = lowerCasequestionTitle?.join(" ")
      if(lowerCasequestionTitleString?.includes(word)){
        filteredQuestion.add(questionList[q])
      }
    })
  }

  for(let q = 0; q < questionList?.length; q++){
    necessaryWords?.forEach(word => {
      const tagsArray = questionList[q]?.questionTags
      const tagStrings = tagsArray.map(tagObject => tagObject.tagName)
      const tagStringsLowerCase = tagStrings.map(tagString => tagString?.toLowerCase())
      tagStringsLowerCase.forEach(tag => {
        if(tag === word){
          filteredQuestion.add(questionList[q])
        }
      })
    })
  }

  filteredQuestionArray = Array.from(filteredQuestion)

  // console.log(filteredQuestionArray)


  return (
    <div className='home-container-1'>
      <LeftSidebar />
      <div className='home-container-2'>
      <div className='main-bar'>
        <div className='main-bar-header'>
            {
                // location.pathname==='/' ? <h1>Top Questions</h1> : <h1>All Questions</h1>
            }
            {/* <button onClick={checkAuth} className='ask-btn'>Ask Question</button> */}
        </div>
        <div>
            {
                filteredQuestionArray===null?
                <h1>No results found</h1>:
                <div>
                    <p>{filteredQuestionArray.length} questions </p>
                    <QuestionList questionList={filteredQuestionArray}></QuestionList>
                </div>
            }
        </div>
    </div>
      </div>
    </div>
  )
}

export default FilteredQuestions