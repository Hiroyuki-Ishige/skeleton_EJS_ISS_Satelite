import express from "express";
import {dirname} from "path";
import {fileURLToPath} from "url";
import bodyParser from "body-parser";
import https from "https";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

// URL of the API endpoint
const url = 'https://api.wheretheiss.at/v1/satellites/25544';


// get ISS sattelite position
function getIssCurrentPosition () {
    return new Promise((resolve, reject)=>{
        https.get(url, (res) => {
            let data = '';

            // A chunk of data has been received.
            res.on('data', (chunk) => {
                data += chunk;
            });

            // The whole response has been received. Print out the result.
            res.on('end', () => {
                //console.log(JSON.parse(data));
                 resolve(JSON.parse(data));
            });

        }).on("error", (err) => {
            reject(err);
});
});
}


// connect to static files such as CSS under "public".
app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", async (req, res,)=>{
    try {
        // Await the async function to resolve, getting the ISS position
        const issPosition = await getIssCurrentPosition();

        // Log the ISS position to the console for debugging
        console.log (`Current ISS position: ${JSON.stringify(issPosition)}`);
        console.log (`Latitude: ${issPosition.latitude}`);
        console.log (`Longitude: ${issPosition.longitude}`);

        res.render("index.ejs", {issPosition: issPosition});
    } catch (error){
        console.error("Failed to fetch ISS position:", error);
        res.status(500).send("Error fetching ISS data");
    }

    });

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
});