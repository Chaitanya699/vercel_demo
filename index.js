import express from "express";
const app = express();
const port = 9000;

// Middleware to parse JSON data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// GET route
app.get("/", (req, res) => {
    res.send("Hello, World!");
});

// POST route to take input and send output
app.post("/user", (req, res) => {
    const { input } = req.body; // Assuming the input is sent as JSON
    const output = `You sent: ${input}`;
    res.send(output);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
