const MONGOOSE = require("mongoose");
const EXPRESS = require("express");
const APP = EXPRESS();

const routes = require("./routes");


// setup mongoose
MONGOOSE.connect("mongodb://localhost/movie", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        const APP = EXPRESS();
        APP.use("/api", routes);
        APP.listen(5000, () => {
            console.log("Server has started");
        })
    })