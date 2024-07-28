import axios from "axios";

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { input } = req.body; // Assuming the input is sent as JSON

        // Validate input
        if (!input) {
            console.error("Input is required");
            return res.status(400).send("Input is required");
        }

        const targetUrl = `https://vercel-demo-wheat-kappa.vercel.app/?input=${encodeURIComponent(input)}`;

        try {
            console.log(`Sending request to: ${targetUrl}`);
            
            // Make the GET request to the target URL
            const response = await axios.get(targetUrl);
            
            // Log response data
            console.log("Received response:", response.data);
            
            // Send the response data from the target URL back to the client
            res.send(response.data);
        } catch (error) {
            // Log the error for debugging
            console.error("Error occurred while sending data:", error.message);
            console.error(error.stack);
            
            // Send an error response to the client
            res.status(500).send("Error occurred while sending data.");
        }
    } else {
        res.status(405).send("Method Not Allowed");
    }
}
