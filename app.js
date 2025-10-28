
import express from 'express';

const app = express();

app.use(express.json());

const port = 3000;

try{
    app.listen(port, () =>{
        console.log('Listening port 3000 ....');
    });
}catch(e){
    console.log(e);
}

app.get('/Emman', async (request, response) =>{
    response.status(200).json({message: "Hi I'm Emman from BSIT-3A"});
});
