const express = require("express");
const app = express();

app.use(logger);

app.get("/", (req, res, next) => {
    console.log("home");
    res.send("home");
    next();
});

app.get("/users", auth, secondLogger, (req, res) => {
    if (req.admin) {
        console.log("user is admin");
    }
    console.log("users");

    res.send("users");
});

function logger(req, res, next) {
    console.log("log");
    next();
}

function secondLogger(req, res, next) {
    console.log("second logger run first");
    next();
    console.log("second logger run second time after nex");
}
function auth(req, res, next) {
    console.log("auth");
    if (req.query.admin !== "true") {
        console.log("no auth");
        res.send("no auth");
        return;
    }
    console.log("admin");
    req.admin = true;
    next();
}

app.listen(3000, () => {
    console.log("listening on port 3000");
});
