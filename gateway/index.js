const app = require("express")();
const proxy = require("http-proxy-middleware");

const PORT = 5000;

app.use(
    "/auth",
    proxy({
        target: "http://localhost:5010",
        changeOrigin: true,
        pathRewrite: {
            "auth": ""
        }
    })
)

app.listen(PORT, () => {
    console.log(`Gateway running on port ${PORT}!`);
});