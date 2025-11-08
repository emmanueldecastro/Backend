import * as StudentModel from "../models/StudentModels.js";

export const fetchstudent = async (req, res) => {
    try{
        const student =  await StudentModel.getstudent();
        res.status(200).json({success: true,message: student});

    }catch(e){
        console.log(e);     
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }

}
