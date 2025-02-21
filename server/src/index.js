import bodyParser from "body-parser";
import express from "express";
import router from "././routes";
import bookRouter from "./routes/book.routes";
import userRouter from "./routes/user.routes";
import tagRouter from "./routes/tag.routes";
import fileRouter from "./routes/file.routes";
import "./config/mongodb.config";

var cors = require("cors");

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
    res.send("Server: Hello!");
});

app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    next();
});

app._router.stack.forEach((r) => {
    if (r.route && r.route.path) {
        console.log(`Registered route: ${r.route.path}`);
    }
});

app.listen(PORT, function () {
    console.log(`Server Listening on ${PORT}`);
});

export default app;
