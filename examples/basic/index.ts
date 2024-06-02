import turboapi from "../../lib";

const app = turboapi();
const port = 8000;

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});