import connectionDataBase from "./config/Database/Db.config.js";
import app from "./app.js";
import dotenv from "./dotenv.js";

dotenv.config({
    path: "./config/*.env"
})
const PORT = process.env.PORT || 8000;

connectionDataBase().then(function (){
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(function (err) {
    console.log(err , "Server is Chased ");
});
