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

// API routes
app.get('/accounts/:accountid/contact', authenticateApiKey, (req, res) => {
    const { accountid } = req.params;

    if (!accountid) {
        return res.status(400).json({ message: 'Bad Request: Account ID is required' });
    }
    res.status(200).json(contactByAccountId);
});

app.get('/accounts/:accountid', authenticateApiKey, (req, res) => {
    const { accountid } = req.params;

    if (!accountid) {
        return res.status(400).json({ message: 'Bad Request: Account ID is required' });
    }
    res.status(200).json(accountByAccountId);
});

app.get('/accounts', authenticateApiKey, (req, res) => {

    res.status(200).json(accounts);
});

app.get('/accounts/:accountid/transactions', authenticateApiKey, (req, res) => {
    const { accountid } = req.params;

    if (!accountid) {
        return res.status(400).json({ message: 'Bad Request: Account ID is required' });
    }
    res.status(200).json(transactionsByAccountId);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    // console.log(`Make requests to http://localhost:${PORT}/accounts/{accountid}/contact`);
});


// DATA

const contactByAccountId = {
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
};

const accounts = {
    "accounts": [
        {
            "accountCategory": "DEPOSIT_ACCOUNT",
            "accountId": "948759it3kbm5b3fdkj454",
            "accountType": "CHECKING",
            "accountNumber": "1028462538",
            "accountNumberDisplay": "******2538",
            "productName": "Checking account",
            "nickname": "My Checkings",
            "status": "OPEN",
            "description": "John Doe's checking account",
            "currency": {
                "currencyCode": "USD"
            },
            "fiAttributes": [
                {
                    "name": "attribute1",
                    "value": "12435456"
                },
                {
                    "name": "attribute2",
                    "value": "ABCDEF"
                }
            ],
            "parentAccountId": "91da8f01-40b2-5d38-1bfc-581fbf8eb169"
        },
        {
            "accountCategory": "DEPOSIT_ACCOUNT",
            "accountId": "948759it3kbm5b3f1234454",
            "accountType": "SAVINGS",
            "accountNumber": "7234234543",
            "accountNumberDisplay": "******4543",
            "productName": "Savings account",
            "nickname": "My Savings",
            "status": "OPEN",
            "description": "John Doe's saving account",
            "currency": {
                "currencyCode": "USD"
            },
            "fiAttributes": [
                {
                    "name": "attribute1",
                    "value": "12435456"
                },
                {
                    "name": "attribute2",
                    "value": "ABCDEF"
                }
            ],
            "parentAccountId": "91da8f01-40b2-5d38-1bfc-581fbf8eb169"
        },
        {
            "accountCategory": "LOC_ACCOUNT",
            "accountId": "7493c12151c4bb04e27caa",
            "accountType": "CREDITCARD",
            "accountNumber": "3312312345",
            "accountNumberDisplay": "******2345",
            "productName": "Amex Classic",
            "nickname": "Credit Card",
            "status": "OPEN",
            "description": "John Doe's credit card account",
            "currency": {
                "currencyRate": 1,
                "currencyCode": "USD",
                "originalCurrencyCode": "USD"
            },
            "parentAccountId": "9123c12151c4bb04e27cab"
        },
        {
            "accountCategory": "LOAN_ACCOUNT",
            "accountId": "abc669672cb0869d382920",
            "accountType": "MORTGAGE",
            "accountNumber": "1323222123",
            "accountNumberDisplay": "******2123",
            "productName": "Mortgage",
            "nickname": "Mortgage Loan",
            "status": "PAID",
            "description": "Mortgage Loan",
            "currency": {
                "currencyRate": 1,
                "currencyCode": "USD",
                "originalCurrencyCode": "USD"
            },
            "fiAttributes": [
                {
                    "name": "attribute1",
                    "value": "12435456"
                },
                {
                    "name": "attribute2",
                    "value": "ABCDEF"
                }
            ],
            "parentAccountId": "91da8f01672cb0869d38292"
        },
        {
            "accountCategory": "ANNUITY_ACCOUNT",
            "accountId": "an54565743re",
            "accountType": "ANNUITY",
            "accountNumber": "3322222123",
            "accountNumberDisplay": "******2123",
            "productName": "Anuity Product",
            "nickname": "Life premium annuity",
            "status": "OPEN",
            "description": "Life premium annuity",
            "parentAccountId": "605"
        }
    ],
    "page": {
        "totalElements": 5
    }
}

const accountByAccountId = {
    "accountCategory": "DEPOSIT_ACCOUNT",
    "accountId": "948759it3kbm5b3fdkj454",
    "accountNumber": "1028462538",
    "accountNumberDisplay": "******2538",
    "accountOpenDate": "2021-07-15",
    "accountType": "CHECKING",
    "annualPercentageYield": 0,
    "availableBalance": 2454.6,
    "balanceAsOf": "2024-07-15T14:46:41.375Z",
    "balanceType": "ASSET",
    "billPayStatus": "ACTIVE",
    "currency": {
        "currencyCode": "USD"
    },
    "currentBalance": 2454.6,
    "description": "John Doe's checking account",
    "domicile": {
        "region": "NY",
        "country": "US"
    },
    "earlyPenaltyFlag": true,
    "fiAttributes": [
        {
            "name": "attribute1",
            "value": "12435456"
        },
        {
            "name": "attribute2",
            "value": "ABCDEF"
        }
    ],
    "interestRate": 0,
    "interestRateAsOf": "2021-07-15T14:46:41.375Z",
    "interestRateType": "FIXED",
    "interestYtd": 0,
    "lastActivityDate": "2024-07-15",
    "lineOfBusiness": "consumer",
    "maturityDate": "2021-07-15",
    "micrNumber": "12443240",
    "nickname": "My Checkings",
    "openingDayBalance": 2454.6,
    "parentAccountId": "91da8f01-40b2-5d38-1bfc-581fbf8eb169",
    "priorInterestRate": 0,
    "productName": "Checking account",
    "rewardProgramId": "10001",
    "routingTransitNumber": "00123000220",
    "status": "OPEN",
    "term": 0,
    "transactionsIncluded": false,
    "transferIn": true,
    "transferOut": true,
    "contact": {
        "addresses": [
            {
                "city": "New York",
                "country": "US",
                "line1": "829 Spring St.",
                "postalCode": "10040",
                "region": "NY"
            }
        ],
        "emails": [
            "johndoe@demo.com"
        ],
        "holders": [
            {
                "customerId": "49",
                "dateOfBirth": "2002-08-21",
                "governmentId": "BBshg054Thv",
                "relationship": "PRIMARY",
                "type": "CONSUMER",
                "emails": [
                    "john.doe@gmailcom",
                    "jd@gmail.com"
                ],
                "telephones": [
                    {
                        "type": "HOME",
                        "country": "US",
                        "number": "8756565565"
                    }
                ],
                "name": {
                    "first": "John",
                    "middle": "middle",
                    "last": "Doe",
                    "suffix": "suffix",
                    "prefix": "Mr",
                    "company": "Abc Tech company"
                },
                "addresses": [
                    {
                        "line1": "#85",
                        "line2": "lastangel",
                        "line3": "Carron",
                        "city": "swiz",
                        "state": "Cargo",
                        "region": "region",
                        "postalCode": "88556",
                        "country": "US",
                        "type": "MAILING"
                    }
                ]
            }
        ],
        "telephones": [
            {
                "type": "CELL",
                "country": "1",
                "number": "212-916-5097"
            },
            {
                "type": "HOME",
                "country": "1",
                "number": "845-670-0862"
            }
        ]
    }
}

const transactionsByAccountId = {
    "page": {
        "totalElements": 38,
        "nextOffset": "Page2"
    },
    "transactions": [
        {
            "accountCategory": "DEPOSIT_ACCOUNT",
            "accountId": "948759it3kbm5b3fdkj454",
            "transactionId": "Q2T79440048050",
            "referenceTransactionId": "Q2RT79447905144",
            "postedTimestamp": "2024-06-15T23:51:59Z",
            "transactionTimestamp": "2024-06-15T09:46:29Z",
            "description": "debit test",
            "memo": "note247",
            "debitCreditMemo": "DEBIT",
            "category": "SIC",
            "subCategory": "Online shopping",
            "reference": "R84782932179",
            "status": "AUTHORIZATION",
            "amount": 4572,
            "transactionType": "ADJUSTMENT",
            "payee": "payee247",
            "checkNumber": 60671777801
        },
        {
            "accountCategory": "DEPOSIT_ACCOUNT",
            "accountId": "948759it3kbm5b3fdkj454",
            "transactionId": "Q2T22296063432",
            "referenceTransactionId": "Q2RT96362631040",
            "postedTimestamp": "2024-06-16T03:17:55Z",
            "transactionTimestamp": "2024-06-15T14:16:20Z",
            "description": "debit test",
            "memo": "note248",
            "debitCreditMemo": "DEBIT",
            "category": "SIC",
            "subCategory": "Online shopping",
            "reference": "R65982053880",
            "status": "AUTHORIZATION",
            "amount": 4669,
            "transactionType": "ADJUSTMENT",
            "payee": "payee248",
            "checkNumber": 40611422738
        },
        {
            "accountCategory": "DEPOSIT_ACCOUNT",
            "accountId": "948759it3kbm5b3fdkj454",
            "transactionId": "Q2T61574934627",
            "referenceTransactionId": "Q2RT14209871667",
            "postedTimestamp": "2024-06-16T16:37:09Z",
            "transactionTimestamp": "2024-06-16T01:13:34Z",
            "description": "credit test",
            "memo": "note249",
            "debitCreditMemo": "CREDIT",
            "category": "MCC ",
            "subCategory": "Internal Transfer",
            "reference": "R67183669025",
            "status": "POSTED",
            "amount": 3730,
            "transactionType": "ADJUSTMENT",
            "payee": "payee249",
            "checkNumber": 77897725685
        },
        {
            "accountCategory": "DEPOSIT_ACCOUNT",
            "accountId": "948759it3kbm5b3fdkj454",
            "transactionId": "Q2T87076819717",
            "referenceTransactionId": "Q2RT92657997855",
            "postedTimestamp": "2024-06-18T23:03:02Z",
            "transactionTimestamp": "2024-06-18T17:42:45Z",
            "description": "debit test",
            "memo": "note253",
            "debitCreditMemo": "DEBIT",
            "category": "SIC",
            "subCategory": "Online shopping",
            "reference": "R68764807673",
            "status": "AUTHORIZATION",
            "amount": 3829,
            "transactionType": "ADJUSTMENT",
            "payee": "payee253",
            "checkNumber": 77581152671
        },
        {
            "accountCategory": "DEPOSIT_ACCOUNT",
            "accountId": "948759it3kbm5b3fdkj454",
            "transactionId": "Q2T93370255216",
            "referenceTransactionId": "Q2RT35151268655",
            "postedTimestamp": "2024-06-19T02:42:43Z",
            "transactionTimestamp": "2024-06-18T17:56:27Z",
            "description": "credit test",
            "memo": "note254",
            "debitCreditMemo": "CREDIT",
            "category": "MCC ",
            "subCategory": "Internal Transfer",
            "reference": "R85767915801",
            "status": "POSTED",
            "amount": 3294,
            "transactionType": "ADJUSTMENT",
            "payee": "payee254",
            "checkNumber": 84857501312
        }
    ],
    "links": {
        "next": {
            "action": "GET",
            "rel": "next",
            "types": [
                "application/json"
            ],
            "href": "/fdx/v6/core/accounts/948759it3kbm5b3fdkj454/transactions?offset=Page2&startTime=2024-06-15&endTime=2024-07-26&limit=5"
        }
    }
}