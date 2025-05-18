import { create } from "zustand";
import type { Post, CreatePostDTO } from "../../types/Post";
import { postsService } from "../../services/posts.service";

interface PostsState {
	posts: Array<Post>;
	isLoading: boolean;
	error: string | null;

	// Actions
	fetchPosts: () => Promise<void>;
	addPost: (postData: CreatePostDTO) => Promise<Post | undefined>;
	updatePost: (id: number, postData: Partial<CreatePostDTO>) => Promise<Post | undefined>;
	deletePost: (postId: number) => Promise<boolean>;
	getPostById: (id: number) => Post | undefined;
}

export const usePostsStore = create<PostsState>((set, get) => ({
	posts: [],
	isLoading: false,
	error: null,

	// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
	fetchPosts: async () => {
		set({ isLoading: true, error: null });
		try {
			const posts = await postsService.getAllPosts();
			set({ posts, isLoading: false });
		} catch (error) {
			set({ error: (error as Error).message, isLoading: false });
		}
	},

	// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
	addPost: async (postData: CreatePostDTO) => {
		set({ isLoading: true, error: null });
		try {
			const newPost = await postsService.createPost(postData);
			set(state => ({ posts: [...state.posts, newPost], isLoading: false }));
			return newPost;
		} catch (error) {
			set({ error: (error as Error).message, isLoading: false });
			return undefined;
		}
	},

	// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
	updatePost: async (id: number, postData: Partial<CreatePostDTO>) => {
		set({ isLoading: true, error: null });
		try {
			const updatedPost = await postsService.updatePost(id, postData);
			if (updatedPost) {
				set(state => ({
					posts: state.posts.map(post => post.id === id ? updatedPost : post),
					isLoading: false
				}));
			}
			return updatedPost;
		} catch (error) {
			set({ error: (error as Error).message, isLoading: false });
			return undefined;
		}
	},

	// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
	deletePost: async (postId: number) => {
		set({ isLoading: true, error: null });
		try {
			const success = await postsService.deletePost(postId);
			if (success) {
				set(state => ({
					posts: state.posts.filter(post => post.id !== postId),
					isLoading: false
				}));
			}
			return success;
		} catch (error) {
			set({ error: (error as Error).message, isLoading: false });
			return false;
		}
	},

	// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
	getPostById: (id: number) => {
		return get().posts.find(post => post.id === id);
	}
}));