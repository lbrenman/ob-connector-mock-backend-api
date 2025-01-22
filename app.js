const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(bodyParser.json());

// API Key Authentication Middleware
const authenticateApiKey = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    if (apiKey && apiKey === process.env.API_KEY) {
        next();
    } else {
        res.status(401).json({ message: 'Unauthorized: Invalid or missing API key' });
    }
};

// Random data generator
const generateRandomData = () => ({
    emails: ["johndoe@demo.com"],
    addresses: [
        {
            line1: "829 Spring St.",
            city: "New York",
            region: "NY",
            postalCode: "10040",
            country: "US"
        }
    ],
    telephones: [
        { type: "CELL", country: "1", number: "212-916-5097" },
        { type: "HOME", country: "1", number: "845-670-0862" }
    ],
    holders: [
        {
            emails: ["john.doe@gmailcom", "jd@gmail.com"],
            addresses: [
                {
                    line1: "#85",
                    line2: "lastangel",
                    line3: "Carron",
                    city: "swiz",
                    state: "Cargo",
                    region: "region",
                    postalCode: "88556",
                    country: "US",
                    type: "MAILING"
                }
            ],
            telephones: [{ type: "HOME", country: "US", number: "8756565565" }],
            customerId: "49",
            type: "CONSUMER",
            name: {
                first: "John",
                middle: "middle",
                last: "Doe",
                suffix: "suffix",
                prefix: "Mr",
                company: "Abc Tech company"
            },
            relationship: "PRIMARY"
        }
    ]
});

// API route
app.get('/accounts/:accountid/contact', authenticateApiKey, (req, res) => {
    const { accountid } = req.params;

    if (!accountid) {
        return res.status(400).json({ message: 'Bad Request: Account ID is required' });
    }

    const data = generateRandomData();
    res.status(200).json(data);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Make requests to http://localhost:${PORT}/accounts/{accountid}/contact`);
});

