/* eslint-disable react-refresh/only-export-components */
import axiosInstance from ".";
import { ApiClient } from "./apiConstant";

export const loginUser = async (data, navigate) => {
  try {
    const res = await axiosInstance.post(`${ApiClient.login}`, data);
    console.log("log response ==>", res);
    if (res.status == 200) {
      navigate("/dashboard");
        console.log("log response ==>", res);
      localStorage.setItem("token", res.data?.accessToken);
      localStorage.setItem("user",JSON.stringify(res.data?.user))
    }
  } catch (error) {
    console.error(error);
  }
};


export const registerUser = async (data, navigate) => {
  try {
    
    const res = await axiosInstance.post(`${ApiClient.register}`, data);
    console.log("register response ==>", res);

    if (res.status === 201 || res.status === 200) {
      // ✅ Store token & user (if returned)
     

      // ✅ Success message
      alert("Registration successful!");

      // ✅ Redirect to login or dashboard
      navigate("/login"); // or navigate("/dashboard")
    }else{
        alert(res?.data?.message)
    }
  } catch (error) {
   
    alert(error.message);
  }
};

export const addChapter = async (data) => {
  try {
    
    const res = await axiosInstance.post(`${ApiClient.addchapter}`, data);
    console.log("register response ==>", res);

    if (res.status === 201 || res.status === 200) {
     
      alert("New Chapter Added");

      //  navigate("/problems")
    }else{
        alert(res?.data?.message)
    }
  } catch (error) {
   
    alert(error.message);
  }
};

export const addProblems = async (data, id) => {
  try {
     const res = await axiosInstance.post(
      `${ApiClient.addProblem}${id}`,  
      data
    );
    console.log("register response ==>", res);

    if (res.status === 201 || res.status === 200) {
      // ✅ Store token & user (if returned)
      

      // ✅ Success message
      alert("problems added");

      // ✅ Redirect to login or dashboard
      // navigate("/login"); // or navigate("/dashboard")
    }else{
        alert(res?.data?.message)
    }
  } catch (error) {
   
    alert(error.message);
  }
};

export const toggleProblemAPI = async (chapterId, problemId) => {
  try {
    const url = `${ApiClient.markedAsCompleted}/${chapterId}/problems/${problemId}/toggle`;

    const res = await axiosInstance.patch(url);

    console.log("Toggle Response ==>", res);

    if (res.status === 200) {
      alert("Problem status updated!");
      return res.data;
    } else {
      alert(res?.data?.message);
    }
  } catch (error) {
    alert(error.message);
  }
};

export const getAllChapters = async () => {
  try {
    const res = await axiosInstance.get(`${ApiClient.getAllChapters}`);

    if (res.status === 200) {
      console.log("Fetched chapters ==>", res.data);
      return res.data;  // return data to component
    } else {
      alert(res?.data?.message);
    }
  } catch (error) {
    alert(error.message);
  }
};


/* ------------------ STATISTICS ------------------ */

export const getOverallStatistics = async () => {
  try {
    const res = await axiosInstance.get(ApiClient.overallStats);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getTopicWiseProgress = async () => {
  try {
    const res = await axiosInstance.get(ApiClient.topicWiseStats);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getAchievements = async () => {
  try {
    const res = await axiosInstance.get(ApiClient.achievements);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};




