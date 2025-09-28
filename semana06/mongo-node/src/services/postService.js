// src/services/postService.js
import postRepository from "../repositories/postRepository.js";
import userRepository from "../repositories/userRepository.js";

class PostService {
  async createPost(userId, postData) {
    const user = await userRepository.findById(userId);
    if (!user) throw new Error("Usuario no encontrado");
    return await postRepository.create({ ...postData, user: user._id });
  }

  async getPosts() {
    return await postRepository.findAll();
  }

  async getPostsByUser(userId) {
    return await postRepository.findByUser(userId);
  }

  async getPostById(id) {
    return await postRepository.findById(id); // ideal: populate('user')
  }

  // ✅ NUEVO
  async updatePost(id, data) {
    // normaliza hashtags si vienen como "a,b,c"
    if (typeof data.hashtags === "string") {
      data.hashtags = data.hashtags
        .split(",")
        .map(t => t.trim().replace(/^#/, ""))
        .filter(Boolean);
    }

    // si cambia el autor
    if (data.userId) {
      const user = await userRepository.findById(data.userId);
      if (!user) throw new Error("Usuario no encontrado");
      data.user = user._id;
    }
    delete data.userId;

    return await postRepository.updateById(id, {
      title: data.title,
      content: data.content,
      imageUrl: data.imageUrl,
      hashtags: data.hashtags,
      ...(data.user ? { user: data.user } : {}),
      updatedAt: new Date()
    });
  }

  // opcional
  async deletePost(id) {
    return await postRepository.deleteById(id);
  }
}

export default new PostService();
