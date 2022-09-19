import app from "./app";
import dotenv from "dotenv";
dotenv.config();

const port = parseInt(process.env.PORT)||4000;
app.listen(port, ()=>{
    console.log("Serve is up and running on port ",port)
});
