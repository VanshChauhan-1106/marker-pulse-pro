const express = require("express");
const app = express();
const path = require("path");
const axios = require("axios");

const PORT = process.env.PORT || 3030;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

const apiKey = "cFHMDfwD4W6hjJ7xKd3xsffJZJYS8bMw";

let url_search =
  "https://financialmodelingprep.com/api/v3/search?query=AA&limit=50&apikey=cFHMDfwD4W6hjJ7xKd3xsffJZJYS8bMw";

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/stocks", async (req, res) => {
  const symbol = req.query.symbol;
  try {
    const response = await axios.get(
      `https://financialmodelingprep.com/api/v3/search?query=${symbol}&limit=100&apikey=${apiKey}`
    );
    const stockData = response.data;
    // console.log(stockData);
    res.render("stocks.ejs", { stocks: stockData });
  } catch (error) {
    console.error("Error fetching data from API:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/view/:stock", async (req, res) => {
  const symbol = req.params.stock;
  try {
    const response = await axios.get(
      `https://financialmodelingprep.com/api/v3/quote/${symbol}?apikey=${apiKey}`
    );
    const stockData = response.data;
    // console.log(stockData);
    res.render("view.ejs", { stockData });
  } catch (error) {
    console.error("Error fetching data from API:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(PORT, () => {
  console.log(`App is listening on Port ${PORT}!`);
});
