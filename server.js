const app = require("./app/app");

const port = process.env.SERVER_PORT; //|| 8083;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}...`);
});
