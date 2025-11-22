import express from "express";
import 'dotenv/config.js';
import cors from 'cors';
import bookRoutes from "./routers/BookRoutes.js";
import StudentRoutes from "./routers/StudentRoutes.js";
import UserRoutes from "./routers/UserRoutes.js";
// import StudentRoutes from "./routers/StudentRoutes.js";

//create express app
const app = express();


//Enable CORS to Frontend
let corsOptions = {
    origin: process.env.ORIGIN
}

//middleware
app.use(express.json());
app.use(cors(corsOptions));

app.use((req, res, next)=>{
    console.log(req.path, req.method);
    next();
});

try{
    app.listen(process.env.port || 3000, ()=>{
        console.log(`listening to port ${process.env.PORT || 3000}...`);
    })
}catch(e){
    console.log(e);
}

app.use('/book', bookRoutes);
app.use('/student', StudentRoutes);
app.use('/user', UserRoutes);