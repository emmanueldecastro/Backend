import * as studentModel from "../models/StudentModels.js";

export const fetchstudents = async (req, res) => {
    try {
        const student = await studentModel.getstudents();
        res.status(200).json({success: true, message: student });
    } catch (e) {
        console.error(e);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export const createStudent = async (req, res) => {
    const { name, srcode, course } = req.body;
    try {
        const studentId = await studentModel.insertStudent(name, srcode, course);
        res.status(200).json({success: true, message: studentId});
    } catch (e) {
        console.log(e);
        res.status(500).json({success: false, message: "Internal Server Error"})
    }
}

export const editStudent = async (req, res) => {
    const {name, srcode, course} = req.body;
    const {studentId} = req.params
    try {
        const updatedId = await studentModel.updateStudent(name, srcode, course, studentId);
        res.status(200).json({success: true, message: updatedId});
}catch (e) {
        console.log(e);
        res.status(500).json({success: false, message: "Internal Server Error"})
    }
}

export const deleteStudent = async (req, res) => {
    const {studentId} = req.params;
    try {
        const deletedId = await studentModel.deleteStudent(studentId);
        res.status(200).json({success: true, message: deletedId});
    } catch (e) {
        console.log(e);
        res.status(500).json({success: false, message: "Internal Server Error"})
    }
}