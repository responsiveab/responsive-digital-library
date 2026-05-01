import bodyParser from "body-parser";
import express from "express";
import router from "./routes/index.js";
import bookRouter from "./routes/book.routes.js";
import userRouter from "./routes/user.routes.js";
import tagRouter from "./routes/tag.routes.js";
import fileRouter from "./routes/file.routes.js";
import path from "path";
import "./config/mongodb.config.js";

import cors from "cors";

const app = express();
const PORT = process.env.BUILD_PORT || 8080;

const CLIENT_BUILD_PATH = path.join(__dirname, "../../client/build");

app.use(cors());
app.use(
    bodyParser.urlencoded({
        extended: true,
        limit: "10mb",
    })
);
app.use(bodyParser.json({ limit: "10mb" }));

//  Route for client
app.use(express.static(CLIENT_BUILD_PATH));

// Server React Client
app.get("/", function (req, res) {
    res.sendFile(path.join(CLIENT_BUILD_PATH, "index.html"));
});

console.log("✅ Registering API routes...");
app.use("/api", router);
console.log("✅ /api registered");

app.use("/api/books", bookRouter);
console.log("✅ /api/books registered");

app.use("/api/users", userRouter);
console.log("✅ /api/users registered");

app.use("/api/tags", tagRouter);
console.log("✅ /api/tags registered");

app.use("/api/files", fileRouter);
console.log("✅ /api/files registered");

app.get("/", function (req, res) {
    res.send("Server: Hello!");
});

app.listen(PORT, function () {
    console.log(`Server Listening on ${PORT}`);
});

export default app;
