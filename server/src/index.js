import bodyParser from "body-parser";
import express from "express";
import router from "./routes/index.js";
import bookRouter from "./routes/book.routes.js";
import userRouter from "./routes/user.routes.js";
import tagRouter from "./routes/tag.routes.js";
import fileRouter from "./routes/file.routes.js";

import "./config/mongodb.config.js";
import cors from "cors";

const app = express();
const PORT = process.env.BUILD_PORT || 8080;

app.use(cors());
app.use(
    bodyParser.urlencoded({
        extended: true,
        limit: "10mb",
    })
);

app.use(bodyParser.json({ limit: "10mb" }));

app.use("/api", router);
app.use("/api/books", bookRouter);
app.use("/api/users", userRouter);
app.use("/api/tags", tagRouter);
app.use("/api/files", fileRouter);

app.get("/", function (req, res) {
    res.send("Server: Hello from Responsive Digital Library!");
});

app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    next();
});

app.listen(PORT, function () {
    console.log(`Server Listening on ${PORT}`);
});

export default app;
