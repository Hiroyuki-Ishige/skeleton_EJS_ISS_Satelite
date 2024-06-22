import express from "express";
import {dirname} from "path";
import {fileURLToPath} from "url";
import bodyParser from "body-parser";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

// connect to static files such as CSS under "public".
app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req, res,)=>{
    res.render("index.ejs", {sample: "sample word"})
});

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
});