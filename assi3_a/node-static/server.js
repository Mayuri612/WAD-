const express = require('express');
const app = express();

// Serve static files
app.use(express.static('public'));

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});