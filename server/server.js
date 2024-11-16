const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.status(200).send("HII");
});

app.get("/register", (req, res) => {
    res.status(200).send("Hlo");
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
