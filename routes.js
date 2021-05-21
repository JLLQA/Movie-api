const EXPRESS = require("express");
const ROUTER = EXPRESS.Router();
const MOVIE = require("./models/movie");


// Create
ROUTER.post("/create", async(req, res) => {
    const mov = new MOVIE({
        title: req.body.title,
        genre: req.body.genre,
        year: req.body.year,
        actors: req.body.actors,
        reviews: req.body.reviews
    })
    await mov.save();
    res.send(mov);
})

// Get all
ROUTER.get("/getAll", async(req, res) => {
    const mov = await MOVIE.find();
    res.send(mov);
})

// Get one
ROUTER.get("/getOne/:id", async(req, res) => {
    try {
        const mov = await MOVIE.findById(req.params.id);
        res.send(mov);
    } catch {
        res.status(500).send("Movie does not exist");
    }
})

// Update MOVIE
ROUTER.post("/update/:id", async(req, res) => {
    try {
        const FIND = { _id: req.params.id };
        const update = { genre: "Comedy" };
        const mov = await MOVIE.findOneAndUpdate(FIND, update, {
            returnOriginal: false
        })
        await mov.save();

        res.send(`${req.params.id} has been updated with new genre of ${update.genre}`);
    } catch {
        res.status(500).send("Movie does not exist");
    }
})

// Delete MOVIE
ROUTER.get("/delete/:id", async(req, res) => {
    try {
        const prod = await MOVIE.findByIdAndDelete(req.params.id);
        res.send(prod);
    } catch {
        res.status(500).send("Movie does not exist");
    }
})

module.exports = ROUTER;