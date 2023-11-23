const express = require(`express`);
const app = express();

app.use(express.static(`public`));

app.get(
    `/hello`,
    function (error,response) {
        response.send({message: "Hello World"})
    });

app.listen(8000, function () {
    console.log("API up and running")
});