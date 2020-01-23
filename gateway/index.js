const app = require("express")();
const proxy = require("http-proxy-middleware");

const PORT = process.env.PORT || 5000;

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

app.use(
    "/admittance",
    proxy({
        target: "http://localhost:5015",
        changeOrigin: true,
        pathRewrite: {
            "admittance": ""
        }
    })
)

app.use(
    "/secretariate",
    proxy({
        target: "http://localhost:5014",
        changeOrigin: true,
        pathRewrite: {
            "secretariate": ""
        }
    })
)

app.listen(PORT, () => {
    console.log(`Gateway running on port ${PORT}!`);
});