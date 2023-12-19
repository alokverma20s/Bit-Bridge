import toast from 'react-hot-toast';
import * as api from '../api'
import { setCurrentUser } from './currentUser';

export const signUp = (authData, navigate)=> async (dispatch) =>{
    try {
        const { data } = await api.signUp(authData);
        dispatch({type: 'AUTH', data})
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))));
        navigate('/');
        toast.success("Account created successfully.");
    } catch (error) {
        toast.error("Something went wrong...");
        console.log(error);
    }
}
export const logIn = (authData, navigate)=> async (dispatch) =>{
    try {
        const { data } = await api.logIn(authData);
        dispatch({type: 'AUTH', data})
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))));

        navigate('/');
        toast.success("Logged In successfully.");
    } catch (error) {
        toast.error("Invalid Credentials...")
        console.log(error);
    }
}