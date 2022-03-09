const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const open = require("open"); // used to automatically open a server in the browser once it is launched
const browserUrl = "http://localhost:8080/";
const http = require("http"); // used to create and launch an http server
const fs = require("fs"); // used to take in other files
const openHtmlPath = "/directory_form_page.html";

//Note that in version 4 of express, express.bodyParser() was
//deprecated in favor of a separate 'body-parser' module.
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "html");
app.engine("html", require("ejs").renderFile); // ejs engine to send Node.js variable to HTML
app.use(express.static("views"));

// TODO: Need to figure out how to automatically open the browser + HTML file when the server runs
// 	Then make a batch file so that the server automatically starts when the batch file is clicked

// opens the url in the default browser
// open(browserUrl);

// create http server
// http.createServer(function(req, res) {
// fs.readFile("directory_form_page.html", function(err, data) {
// res.writeHead(200, {"Content-type": "text/html"});
// res.write(data);
// return res.end();
// });

// }).listen(8080);

app.post("/myaction", function (req, res) {
    console.log("\n================ Display files in a directory ================\n");
    let dirStr = "";
    let extStr = "";

    dirStr += req.body.name;
    extStr += req.body.extension;

    const lineBar = "=";
    console.log(lineBar.repeat(dirStr.length + 13));
    console.log("\nYou entered: " + dirStr);
    console.log(lineBar.repeat(dirStr.length + 13));

    // directory path
    const dir = dirStr;

    fs.readdir(dir, (err, files) => {
        let outputResults = [];

        if (err) {
            console.log('================\nERROR: Please paste your full directory in double quotation marks like so "YOUR DIRECTORY HERE"\n================');
            outputResults.push({
                Directory: "Error: Invalid directory path. Please enter paste your full path by copying the directory address in File Explorer.",
            });
            // does not work right now for some reason
            res.render("C:\\Users\\xkm669\\Downloads\\Nodejs Learning\\03 Console input output\\directory_form_page.html", { output: outputResults });
            //throw err;
        } else {
            console.log("File extension: " + extStr + "\n");

            files.forEach((file) => {
                if (file.includes(extStr, file.length - 1 - extStr.length)) {
                    console.log(file);

                    outputResults.push({
                        Directory: file,
                    });
                }
            });

            let resultStr = JSON.stringify(outputResults);

            console.log(resultStr);
            // don't know howto pass the key:value object itself so I need to convert it into a string first
            // TODO: Figure out how to send this as a relative path
            res.render("C:\\Users\\xkm669\\Downloads\\Nodejs Learning\\03 Console input output\\directory_form_page.html", { output: resultStr });

            outputResults = "";
        }
    });
});

app.listen(8080, function () {
    console.log("Server running at http://127.0.0.1:8080/");
});