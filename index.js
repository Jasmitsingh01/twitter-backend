import connectionDataBase from "./config/Database/Db.config.js";
import app from "./src/app.js";
import dotenv from "dotenv";

dotenv.config()
const PORT = process.env.PORT || 8000;

connectionDataBase().then(function (){
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(function (err) {
    console.log(err , "Server is Chased ");
});
