
import express from 'express';
import 'dotenv/config.js';
import bookRoutes from "./routers/BookRoutes.js";
import studentRoutes from "./routers/studentRoutes.js";

const app = express();

app.use(express.json());

// const port = 3000;

try{
    app.listen(process.env.PORT || 3000, () =>{
        console.log(`Listening port ${process.env.PORT || 3000}...`);
    });
}catch(e){
    console.log(e);
}

app.use("/books", bookRoutes);
app.use("/student", studentRoutes);
// app.get('/Emman', async (request, response) =>{
//     response.status(200).json({message: "Hi I'm Emman from BSIT-3A"});
// });
