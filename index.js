const express = require("express");

const app = express();
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Successful");
})

app.post("/bfhl", (req, res) => {
  try {
    const { data } = req.body;
    if (!Array.isArray(data)) {
      return res.status(400).json({ is_success: false, message: "Invalid input" });
    }

    const odd_numbers = [];
    const even_numbers = [];
    const alphabets = [];
    const special_characters = [];
    let sum = 0;
    const allLetters = [];

    data.forEach(item => {
      const s = String(item);
      if (/^-?\d+$/.test(s)) {
        const num = parseInt(s, 10);
        if (num % 2 === 0) even_numbers.push(s);
        else odd_numbers.push(s);
        sum += num;
      } else if (/^[A-Za-z]+$/.test(s)) {
        alphabets.push(s.toUpperCase());
        allLetters.push(...s.split(""));
      } else {
        special_characters.push(s);
      }
    });

    const concat_string = allLetters
      .reverse()
      .map((ch, i) => (i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
      .join("");

    const response = {
      is_success: true,
      user_id: "john_doe_17091999",
      email: "john@xyz.com",
      roll_number: "ABCD123",
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: sum.toString(),
      concat_string
    };

    return res.status(200).json(response);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ is_success: false, message: "Server error" });
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
