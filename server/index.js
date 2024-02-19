require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

const mongoDbUri = process.env.MONGODB_URI;

const connect = async () => {
  try {
    await mongoose.connect(mongoDbUri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
};

connect();

const TokenSchema = new mongoose.Schema({
  access_token: String,
  expires_at: Number,
});
const Token = mongoose.model("Token", TokenSchema);

const generateToken = async () => {
  const client_id = process.env.CLIENT_ID;
  const client_secret = process.env.CLIENT_SECRET;

  try {
    // Request a new access token from Spotify
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      {
        grant_type: "client_credentials",
        client_id,
        client_secret,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    // Calculate the expiration time in milliseconds
    const expires_at = Date.now() + response.data.expires_in * 1000;

    // Save the token in the database
    const token = new Token({
      access_token: response.data.access_token,
      expires_at,
    });
    await token.save();

    return response.data.access_token;
  } catch (error) {
    console.error("Error generating token:", error);
    throw error;
  }
};

// Middleware to check and refresh token if needed
const checkTokenMiddleware = async (req, res, next) => {
  try {
    let token = await Token.findOne().sort({ expires_at: -1 });

    // If token doesn't exist or has expired, generate a new one
    if (!token || new Date() >= token.expires_at) {
      const access_token = await generateToken();
      req.spotify_access_token = access_token;
    } else {
      req.spotify_access_token = token.access_token;
    }

    next();
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Route for fetching data from Spotify
app.get("/search", checkTokenMiddleware, async (req, res) => {
  const query = req.query.query;

  try {
    // Make a request to the Spotify API with the access token
    const response = await axios.get(
      `https://api.spotify.com/v1/search?q=${query}&type=track`,
      {
        headers: {
          Authorization: `Bearer ${req.spotify_access_token}`,
        },
      }
    );

    // Return the data from Spotify
    res.json(response.data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route for generating recommendations
app.get("/generate", checkTokenMiddleware, async (req, res) => {
  const seeds = req.query.seeds;
  console.log(JSON.stringify(seeds));

  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/recommendations?seed_tracks=${seeds}`,
      {
        headers: {
          Authorization: `Bearer ${req.spotify_access_token}`,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const port = 4000;
const server = app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
