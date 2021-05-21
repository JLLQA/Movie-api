const EXPRESS = require("express");
const ROUTER = EXPRESS.Router();
const MOVIE = require("./models/movie");


// Create
ROUTER.post("/create", async(req, res) => {
    const mov = new MOVIE({
        title: "Rambo",
        genre: "Comedy",
        year: 2001,
        reviews: [{ critic: "James", stars: 5 }],
        actors: [{ name: "Rambo", age: 50 }]
    })
    await mov.save();
    res.send(mov);
})

// Get all
ROUTER.get("/getAll", async(req, res) => {
    try {
        const mov = await MOVIE.find();
        res.send(mov);
    } catch {
        res.status(500).send("Movie does not exist");
    }
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
        const mov = await MOVIE.findByIdAndDelete(req.params.id);
        res.send(mov);
    } catch {
        res.status(500).send("Movie does not exist");
    }
})

// DeleteAll MOVIE
ROUTER.get("/deleteAll", async(req, res) => {
    try {
        const mov = await MOVIE.deleteMany({});
        res.send(mov);
    } catch {
        res.status(500).send("Movie does not exist");
    }
})

module.exports = ROUTER;