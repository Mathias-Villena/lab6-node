import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import connectDB from "./src/db/database.js";
import dotenv from "dotenv";
import methodOverride from "method-override";
dotenv.config(); // carga las variables desde .env

// Rutas
import homeRoutes from "./src/routes/home.routes.js";
import postRoutes from "./src/routes/post.routes.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));

// Middlewares
app.use(express.urlencoded({ extended: true })); // Para leer datos de formularios
app.use(express.json()); // Para leer JSON
app.use(methodOverride('_method')); // Para soportar PUT y DELETE desde formularios
app.use(express.static(path.join(__dirname, "src", "public"))); // Archivos estáticos (css, js, imgs)

// Rutas
app.use("/", homeRoutes);
app.use("/posts", postRoutes);

connectDB(); // Conexión a la base de datos

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
