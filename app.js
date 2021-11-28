const express = require("express");

const mongoose = require("mongoose");

const app = express();

app.use(express.json());


const connect = () => {

    return mongoose.connect("mongodb://127.0.0.1:27017/movie")
}



const movieSchema = new mongoose.Schema({
    movie_name: { type: String, required: true },
    movie_genre: { type: String, required: true },
    production_year: { type: Number, required: true },
    budget: { type: Number, required: true }
}, {
    versionKey: false,
    timestamps: true,
})





const Movies = mongoose.model("movies", movieSchema);








app.get("/Moviess", async (req, res) => {

    const movies1 = await Movies.find().lean().exec();

    res.send({ movies1 });
})


app.post("/Moviess", async (req, res) => {

    const movies1 = await Movies.create(req.body);

    res.status(201).send(movies1)
});

app.get("/moviess/:id", async (req, res) => {

    try {
        const movies1 = await Movies.findById(req.params.id).lean().exec();

        return res.status(201).send({ movies1 });
    }
    catch (err) {
        return res.status(500).json({ message: err.message, status: "Faild" });
    }


})


app.patch("/Moviess/:id", async (req, res) => {

    try {

        // findByIdAndUpdate is a fetched -> update -> don't fetch but updated if fetch then write {new:true}

        const movies1 = await Movies.findByIdAndUpdate(req.params.id, req.body, { new: true });

        return res.status(201).send(movies1)

    }
    catch (err) {
        return res.status(500).json({ message: err.message, status: "Faild" });
    }
})



app.delete("/delete/:id", async (req, res) => {

    try {

        const movies1 = await Movies.findByIdAndDelete(req.params.id).lean().exec();

        res.status(200).send(movies1);
    }
    catch (err) {
        return res.status(500).json({ message: err.message, status: "Faild" });
    }


})







app.listen(9191, async function () {

    await connect()

    console.log('listening on port 9191');
})
