import mongoose from "mongoose";
import Contest from "../models/contest.js";

const createContest = async (req, res) => {
  const {
    name,
    author,
    description,
    startTime,
    endTime,
    duration,
    contestProblems,
  } = req.body;
  try {
    console.log(name, author, startTime, endTime, duration, contestProblems);
    const contest = await Contest.create({
      name,
      author,
      description,
      startTime,
      endTime,
      duration,
      problems: contestProblems,
    });
    return res.status(201).json({
      success: true,
      contest,
      message: "Contest created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Something went wrong, while creating contest.",
    });
  }
};

const getContest = async (req, res) => {
  try {
    const contest = await Contest.find();
    return res.status(200).json({
      success: true,
      contest,
      message: "Contest fetched Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Something went wrong, while fetch contest list.",
    });
  }
};

const getContestById = async (req, res) => {
  const { id } = req.params;
  try {
    const contest = await Contest.findById(id, {
      name: true,
      author: true,
      description: true,
      startTime: true,
      endTime: true,
      duration: true,
      problems: true,
    }).populate("problems", {
      name: true,
      seq: true,
    }).populate("author", {
      name: true,
    });
    return res.status(200).json({
      success: true,
      contest,
      message: "Contest fetched Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Something went wrong, while fetch contest list.",
    });
  }
};

const updateContest = async (req, res) => {
  const { id } = req.params;
  try {
    const contest = await Contest.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(200).json({
      success: true,
      contest,
      message: "Contest updated Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Something went wrong, while updating contest.",
    });
  }
};

const deleteContest = async (req, res) => {
  const { id } = req.params;
  try {
    await Contest.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: "Contest deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Something went wrong, while deleting contest.",
    });
  }
};

export {
  createContest,
  getContest,
  getContestById,
  updateContest,
  deleteContest,
};
