const express = require("express");
const app = express();
const itemRoutes = require("./routes/items")
const ExpressError = require("./expressError");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/items", itemRoutes);

app.use((req, res) => {
    return new ExpressError("Invalid", 404);
})

app.use((err, req, res, next) => {
    let status = err.status || 500;
    let message = err.message;

    return res.status(status).json({
        error: {message, status}
    });
});

module.exports = app;