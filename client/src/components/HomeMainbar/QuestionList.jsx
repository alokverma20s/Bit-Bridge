import React from 'react'
import Questions from './Questions'

const QuestionList = ({questionList}) => {
  questionList?.sort((question1, question2) =>{
    if((question1.upVote.length - question1.downVote.length) < (question2.upVote.length - question2.downVote.length))
      return 1;
    else
      return -1;
  })
  return (
    <div>
      {
        questionList?.map((question) => (
          <Questions key={question._id} question={question} />
        ))
      }
    </div>
  )
}

export default QuestionList