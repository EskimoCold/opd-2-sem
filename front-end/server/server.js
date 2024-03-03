const http = require("http");
const port = process.env.PORT | 8000;

const requestListener = function (req, res) {
    res.setHeader("Content-Type", "application/json");
    res.writeHead(200);
    res.end(`{"message": "Welcome to Ngrok tunnel example."}`);
};

const server = http.createServer(requestListener);
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
