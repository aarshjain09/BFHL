import express from "express";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

// constant user details
const USER_ID = "aarsh_jain_29082001"; 
const EMAIL = "aarsh@example.com";
const ROLL = "22CS1001";

// helper for alternating caps
function alternatingCaps(str) {
  return str
    .split("")
    .map((ch, i) => (i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
    .join("");
}

app.post("/bfhl", (req, res) => {
  try {
    const arr = req.body.data;
    if (!Array.isArray(arr)) {
      return res.status(400).json({ is_success: false, error: "Invalid input" });
    }

    const evens = [];
    const odds = [];
    const alphabets = [];
    const specials = [];
    let sum = 0;

    arr.forEach((item) => {
      if (typeof item === "number") {
        if (item % 2 === 0) evens.push(item);
        else odds.push(item);
        sum += item;
      } else if (typeof item === "string") {
        if (/^[a-zA-Z]$/.test(item)) {
          alphabets.push(item.toUpperCase());
        } else {
          specials.push(item);
        }
      }
    });

    const reverseAlpha = arr
      .filter((item) => typeof item === "string" && /^[a-zA-Z]$/.test(item))
      .reverse()
      .join("");

    return res.status(200).json({
      is_success: true,
      user_id: USER_ID,
      email: EMAIL,
      college_roll_number: ROLL,
      even_numbers: evens,
      odd_numbers: odds,
      alphabets: alphabets,
      special_characters: specials,
      sum_of_numbers: sum,
      reverse_alphabets_caps: alternatingCaps(reverseAlpha),
    });
  } catch (err) {
    res.status(500).json({ is_success: false, error: err.message });
  }
});

// ✅ Local run (node index.js)
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

// ✅ For Vercel deployment
export default app;
