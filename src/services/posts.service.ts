import type { Post, CreatePostDTO } from '../types/Post';
import axios from '../api/axios.ts';

export const postsService = {
	async getAllPosts(): Promise<Array<Post>> {
		const response = await axios.get('/posts');
		return response.data.data;
	}
,

	async getPostById(id: number): Promise<Post> {
		const response = await axios.get<Post>(`/posts/${id}`);
		return response.data;
	},

	async createPost(data: CreatePostDTO): Promise<Post> {
		const response = await axios.post<Post>('/posts', data);
		return response.data;
	},

	async updatePost(id: number, data: Partial<CreatePostDTO>): Promise<Post> {
		const response = await axios.put(`/posts/${id}`, data);
		return response.data.data;
	},


	async deletePost(id: number): Promise<boolean> {
		await axios.delete(`/posts/${id}`);
		return true;
	}
};
