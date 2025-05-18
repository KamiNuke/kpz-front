import { Link } from '@tanstack/react-router';
import type React from "react";

interface Post {
	id: number;
	title: string;
	content: string;
	created_at: string;
	updated_at: string;
}

interface PostsCardProps {
	post: Post;
	onDelete: (id: number) => void;
}

const PostsCard: React.FC<PostsCardProps> = ({ post, onDelete }: PostsCardProps) => {
	return (
		<div className="border rounded p-4 mb-4 shadow-sm">
			<Link params={{ id: String(post.id) }} to={`/posts/$id`}>
				<h3 className="text-xl font-semibold">{post.title}</h3>
				<p className="text-gray-600">{post.created_at}</p>
			</Link>
			<button
				className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
				onClick={() => { onDelete(post.id); }}
			>
				Delete
			</button>
		</div>
	);
};

export default PostsCard;