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

    // Validate input
    if (!input) {
        return res.status(400).send("Input is required");
    }

    const targetUrl = `https://vercel-demo-wheat-kappa.vercel.app/?input=${encodeURIComponent(input)}`;

    try {
        // Make the GET request to the target URL
        const response = await axios.get(targetUrl);
        
        // Send the response data from the target URL back to the client
        res.send(response.data);
    } catch (error) {
        // Log the error for debugging
        console.error("Error occurred while sending data:", error);

        // Send an error response to the client
        res.status(500).send("Error occurred while sending data.");
    }
});

// Start the Express server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
