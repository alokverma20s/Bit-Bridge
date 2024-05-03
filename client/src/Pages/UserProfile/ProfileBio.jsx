import React, { useEffect, useState } from "react";
import QuestionList from "../../components/HomeMainbar/QuestionList";
import { useDispatch } from "react-redux";
import { profileQuestions } from "../../services/operations/authAPI";
import Loader from "../../components/Loader/Loader";
import { useLocation } from "react-router-dom";

const ProfileBio = ({ currentProfile }) => {
  const dispatch = useDispatch();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();

  useEffect(() => {
    dispatch(
      profileQuestions(
        location.pathname.split("/")[2],
        setQuestions,
        setLoading,
      ),
    );
  }, []);
  return (
    <div>
      <div>
        {currentProfile?.tags ? (
          <>
            <h4 className="mt-4 text-[16px] font-bold">Tags watched</h4>
            <div className="flex gap-2 py-1">
            {currentProfile?.tags.map((tag) => (
              <span key={tag} className="bg-primary-600 text-white p-1 font-bold rounded">
                {tag}
              </span>
            ))}
            </div>
          </>
        ) : (
          <p>0 tags watched</p>
        )}
      </div>
      <div>
        {currentProfile?.about ? (
          <>
            <h4 className="text-[16px] font-bold">About</h4>
            <p className="text-primary-700 text-[16px] font-semibold">{currentProfile?.about}</p>
          </>
        ) : (
          <p>No bio found</p>
        )}
      </div>
      <div className="user-questions-section" style={{ marginTop: "40px" }}>
        {questions?.questionAsked?.length !== 0 ? (
          <h2 className="text-[24px] text-primary-600">Questions asked</h2>
        ) : (
          <p>No question asked till now</p>
        )}
        {loading ? (
          <div className="loader-position">
            <Loader />
          </div>
        ) : (
          <QuestionList questionList={questions?.questionAsked} />
        )}
      </div>
    </div>
  );
};

export default ProfileBio;
