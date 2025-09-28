import postService from "../services/postService.js";
import User from "../models/User.js";

class PostController {
    async create(req, res) {
        try {
            const { userId } = req.body; // userId viene del formulario
            const post = await postService.createPost(userId, req.body);
            res.redirect("/posts"); // Redirige a la lista de posts después de crear
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getAll(req, res) {
        try {
            const posts = await postService.getPosts();
            const users = await User.find(); // Obtiene la lista de usuarios para el select
            res.render("posts", { posts, users });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getById(req, res) {
        try {
            const post = await postService.getPostById(req.params.id);
            res.json(post);
        } catch (error) {
            res.status(404).json({ error: "Post no encontrado" });
        }
    }

    async update(req, res) {
        try {
            const post = await postService.updatePost(req.params.id, req.body);
            res.redirect("/posts"); // Redirige a la lista de posts después de editar
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            await postService.deletePost(req.params.id);
            res.redirect("/posts"); // Redirige a la lista de posts después de eliminar
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    // Vista para editar (opcional, si usas EJS)
    async renderEditForm(req, res) {
        try {
            const post = await postService.getPostById(req.params.id);
            const users = await User.find();
            res.render("editPost", { post, users });
        } catch (error) {
            res.status(404).json({ error: "Post no encontrado" });
        }
    }
}

export default new PostController();