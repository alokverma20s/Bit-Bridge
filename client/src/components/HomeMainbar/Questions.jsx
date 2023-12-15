import moment from 'moment'
import React from 'react'
import {Link} from 'react-router-dom'

const Questions = ({question}) => {
  return (
    <div className='display-question-container'>
        <div className='display-question-details'>
            <Link to={`/Questions/${question._id}`}className='question-title-link'>{question.questionTitle}</Link>
            <div className='display-tags-time'>
                <div className='display-tags'>
                    {
                        question?.questionTags?.map((tag) => (
                            // <Link to={`/Tags/${tag._id}`}>
                                <p className="all-tags" key={tag._id} onClick={() => {window.location.href="/Tags/"+tag._id}}>{tag.tagName}</p>
                            // </Link>
                        ))
                    }
                </div>
                <div className='display-time'>
                <p>
                    Asked {moment(question.askedOn).fromNow()} by {question.userId.name}
                </p>
                </div>
                
            </div>
        </div>
        <div className='display-votes-ans'>
            <p>{question.upVote.length - question.downVote.length}</p>
            <p>votes</p>
        </div>
        <div className='display-votes-ans'>
            <p>{question.noOfAnswers}</p>
            <p>answers</p>
        </div>
    </div>
  )
}

export default Questions