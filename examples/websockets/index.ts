import turboapi from "../../lib";

const app = turboapi();
const port = 8000;

interface UserData {
    username: string;
    email: string;
    password: string;
}

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.ws<UserData>("/gateway", async (req) => {
    console.log(req);

    const userData: UserData = {
        username: "Alsond5",
        email: "ahmetidris05@gmail.com",
        password: "12345"
    }

    return userData;
});

app.message(async (ws, message) => {
    console.log(message);

    ws.send("Your message received");
});

app.open(async (ws) => {
    console.log(ws.data);

    ws.send("Hello Client!");
});

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});