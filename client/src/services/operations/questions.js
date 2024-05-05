import toast from "react-hot-toast";

import { apiConnector } from "../apiConnector"
import {questionEndpoints} from "../apis"

const {GETQUESTION_API} = questionEndpoints;

export const getQuestions = async (setLoading, setQuestion,id) => {
    try {
        setLoading(true);
        const {data} = await apiConnector("GET", GETQUESTION_API + id);
        setQuestion(data);
        setLoading(false);
    } catch (error) {
        setLoading(false);
        toast.error("Couldn't fetch questions");
    }
}

