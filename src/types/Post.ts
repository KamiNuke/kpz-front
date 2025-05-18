export interface Post {
	id: number;
	title: string;
	content: string;
	created_at: string;
	updated_at: string;
}

export type CreatePostDTO = Pick<Post, "title" | "content">;