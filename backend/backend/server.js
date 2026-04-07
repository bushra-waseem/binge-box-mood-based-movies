const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");

dotenv.config();
const app = express();
app.use(cors({
    origin: ["https://binge-box-mood-based-movies.vercel.app", "http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(express.json());

mongoose
    .connect(process.env.MONGO_URI || "mongodb://localhost:27017/bingeboxdb")
    .then(() => console.log("✅ MongoDB Connected — bingeboxdb"))
    .catch((err) => console.log("❌ MongoDB Error:", err));

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    year: Number,
    genre: [String],
    mood: [String],
    rating: Number,
    description: String,
    posterUrl: String,
    posterColor: String,
    trailerLink: String,
    cast: [String],
    trending: { type: Boolean, default: false },
    trendingTag: String,
    type: { type: String, default: "movie" },
    createdAt: { type: Date, default: Date.now },
});
const Movie = mongoose.model("Movie", movieSchema);

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: String,
    favouriteMoods: [String],
    watchlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
    watched: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
    favourites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
    createdAt: { type: Date, default: Date.now },
});
const User = mongoose.model("User", userSchema);

const reviewSchema = new mongoose.Schema({
    movie: { type: mongoose.Schema.Types.ObjectId, ref: "Movie", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, min: 1, max: 10 },
    comment: String,
    createdAt: { type: Date, default: Date.now },
});
const Review = mongoose.model("Review", reviewSchema);

app.get("/", (req, res) => res.json({ message: "🎬 Binge Box API running!" }));

// MOVIES
app.get("/api/movies", async (req, res) => {
    try {
        const { mood, genre, search, year, type } = req.query;
        let filter = {};
        if (mood && mood !== "All") filter.mood = { $in: [mood] };
        if (genre && genre !== "All") filter.genre = { $in: [genre] };
        if (year && year !== "All") {
            if (year === "2010s") filter.year = { $gte: 2010, $lte: 2019 };
            else if (year === "2000s") filter.year = { $gte: 2000, $lte: 2009 };
            else if (year === "1990s") filter.year = { $gte: 1990, $lte: 1999 };
            else filter.year = Number(year);
        }
        if (search) filter.title = { $regex: search, $options: "i" };
        if (type) filter.type = type;
        const movies = await Movie.find(filter).sort({ createdAt: -1 });
        res.json(movies);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get("/api/movies/trending", async (req, res) => {
    try {
        const movies = await Movie.find({ trending: true });
        res.json(movies);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get("/api/movies/:id", async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) return res.status(404).json({ error: "Movie not found" });
        res.json(movie);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post("/api/movies", async (req, res) => {
    try {
        const movie = new Movie(req.body);
        await movie.save();
        res.status(201).json({ message: "✅ Movie added!", movie });
    } catch (err) { res.status(400).json({ error: err.message }); }
});

app.put("/api/movies/:id", async (req, res) => {
    try {
        const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ message: "✅ Updated!", movie });
    } catch (err) { res.status(400).json({ error: err.message }); }
});

app.delete("/api/movies/:id", async (req, res) => {
    try {
        await Movie.findByIdAndDelete(req.params.id);
        res.json({ message: "✅ Deleted!" });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// USERS
app.post("/api/users/register", async (req, res) => {
    try {
        const { name, email, password, favouriteMoods } = req.body;
        if (!name || !email || !password)
            return res.status(400).json({ error: "All fields are required." });
        const exists = await User.findOne({ email });
        if (exists) return res.status(400).json({ error: "Email already registered." });
        const hashed = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashed, favouriteMoods: favouriteMoods || [] });
        await user.save();
        const userObj = user.toObject();
        delete userObj.password;
        res.status(201).json({ message: "✅ Account created!", user: userObj });
    } catch (err) { res.status(400).json({ error: err.message }); }
});

app.post("/api/users/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(400).json({ error: "Email and password required." });
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: "No account found with this email." });
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ error: "Incorrect password." });
        const userObj = user.toObject();
        delete userObj.password;
        res.json({ message: "✅ Login successful!", user: userObj });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get("/api/users/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
            .populate("watchlist").populate("watched").populate("favourites");
        if (!user) return res.status(404).json({ error: "User not found" });
        const userObj = user.toObject();
        delete userObj.password;
        res.json(userObj);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post("/api/users/:id/watchlist/:movieId", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user.watchlist.map(String).includes(req.params.movieId)) {
            user.watchlist.push(req.params.movieId);
            await user.save();
        }
        res.json({ message: "✅ Added to watchlist!" });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post("/api/users/:id/favourites/:movieId", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user.favourites.map(String).includes(req.params.movieId)) {
            user.favourites.push(req.params.movieId);
            await user.save();
        }
        res.json({ message: "✅ Added to favourites!" });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// REVIEWS
app.get("/api/reviews/:movieId", async (req, res) => {
    try {
        const reviews = await Review.find({ movie: req.params.movieId })
            .populate("user", "name avatar").sort({ createdAt: -1 });
        res.json(reviews);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post("/api/reviews", async (req, res) => {
    try {
        const review = new Review(req.body);
        await review.save();
        res.status(201).json({ message: "✅ Review added!", review });
    } catch (err) { res.status(400).json({ error: err.message }); }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));