import express from "express";
import axios from "axios";

const app = express();
const port = 9000;

// Middleware to parse JSON data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// GET route
app.get("/", (req, res) => {
    res.send("Hello, World!");
});

// POST route to take input and send it to the target URL
app.post("/user", async (req, res) => {
    const { input } = req.body; // Assuming the input is sent as JSON
    const targetUrl = `https://vercel-demo-wheat-kappa.vercel.app/?input=${encodeURIComponent(input)}`;

    try {
        const response = await axios.get(targetUrl); // Send the input as a query parameter
        res.send(response.data); // Send the response data from the target URL back to the client
    } catch (error) {
        res.status(500).send("Error occurred while sending data.");
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
