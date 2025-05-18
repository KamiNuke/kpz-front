import type React from 'react';
// eslint-disable-next-line no-duplicate-imports
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from '@tanstack/react-router';
import { usePostsStore } from '../store/posts';
import type { CreatePostDTO } from '../types/Post';

export function PostContent(): React.ReactElement {
	const { id } = useParams({ from: '/posts/$id' });
	const postId = parseInt(id);
	const navigate = useNavigate();

	const { posts, getPostById, fetchPosts, updatePost, isLoading, error } = usePostsStore();
	const [isEditing, setIsEditing] = useState(false);
	const [formData, setFormData] = useState<CreatePostDTO>({
		title: '',
		content: ''
	});
	const [formErrors, setFormErrors] = useState<Record<string, string>>({});

	useEffect(() => {
		if (posts.length === 0) {
			void fetchPosts();
		}
	}, [fetchPosts, posts.length]);

	useEffect(() => {
		const post = getPostById(postId);
		if (post) {
			setFormData({
				title: post.title,
				content: post.content
			});
		}
	}, [postId, posts, getPostById]);

	const handleEdit = (): void => {
		setIsEditing(true);
	};

	const handleCancel = (): void => {
		const post = getPostById(postId);
		if (post) {
			setFormData({
				title: post.title,
				content: post.content
			});
		}
		setIsEditing(false);
		setFormErrors({});
	};

	// eslint-disable-next-line unicorn/prevent-abbreviations
	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
		const { name, value } = e.target;
		setFormData(previous => ({ ...previous, [name]: value }));

		// Очищення помилки при зміні значення
		if (formErrors[name]) {
			setFormErrors(previous => ({ ...previous, [name]: '' }));
		}
	};

	const validateForm = (): boolean => {
		const errors: Record<string, string> = {};

		if (!formData.title.trim()) {
			errors["title"] = "Title required";
		}

		if (!formData.content.trim()) {
			errors["content"] = "Content required";
		}

		setFormErrors(errors);
		return Object.keys(errors).length === 0;
	};

	// eslint-disable-next-line unicorn/prevent-abbreviations
	const handleSubmit = async (e: React.FormEvent): Promise<void> => {
		e.preventDefault();

		if (!validateForm()) {
			return;
		}

		const result = await updatePost(postId, formData);
		if (result) {
			setIsEditing(false);
		}
	};

	const post = getPostById(postId);

	if (isLoading) {
		return <div className="p-4">Loading...</div>;
	}

	if (!post) {
		return (
			<div className="container mx-auto p-4">
				<div className="bg-red-100 border border-red-400 text-red-700 p-4 rounded">
					<p>The post was not found. It may have been deleted or you followed the wrong link.</p>
					<button
						className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
						onClick={() => navigate({ to: '/posts' })}
					>
						Return to posts list
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="container mx-auto p-4 max-w-3xl">
			{error && (
				<div className="bg-red-100 border border-red-400 text-red-700 p-3 rounded mb-4">
					{error}
				</div>
			)}

			{isEditing ? (
				<>
					<h1 className="text-2xl font-bold mb-6">Edit post</h1>
					<form className="space-y-4" onSubmit={handleSubmit}>
						<div>
							<label className="block mb-1 font-medium" htmlFor="title">
								Title
							</label>
							<input
								className={`w-full px-3 py-2 border rounded ${formErrors["title"] ? "border-red-500" : "border-gray-300"}`}
								disabled={isLoading}
								id="title"
								name="title"
								type="text"
								value={formData.title}
								onChange={handleChange}
							/>
							{formErrors["title"] && (
								<p className="text-red-500 text-sm mt-1">
									{formErrors["title"]}
								</p>
							)}
						</div>

						<div>
							<label className="block mb-1 font-medium" htmlFor="content">
								Content
							</label>
							<textarea
								className={`w-full px-3 py-2 border rounded ${formErrors["content"] ? "border-red-500" : "border-gray-300"}`}
								disabled={isLoading}
								id="content"
								name="content"
								rows={10}
								value={formData.content}
								onChange={handleChange}
							/>
							{formErrors["content"] && (
								<p className="text-red-500 text-sm mt-1">
									{formErrors["content"]}
								</p>
							)}
						</div>

						<div className="flex gap-3 pt-2">
							<button
								className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
								disabled={isLoading}
								type="button"
								onClick={handleCancel}
							>
								Cancel
							</button>
							<button
								className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
								disabled={isLoading}
								type="submit"
							>
								{isLoading ? "Saving..." : "Save changes"}
							</button>
						</div>
					</form>
				</>
			) : (
				<>
					<div className="flex justify-between items-center mb-6">
						<h1 className="text-3xl font-bold">{post.title}</h1>
						<button
							className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
							onClick={handleEdit}
						>
							Edit
						</button>
					</div>

					<div className="prose prose-lg max-w-none">
						<p>{post.content}</p>
					</div>

					<div className="mt-8 text-sm text-gray-500">
						<p>
							Created: {post.created_at ? new Date(post.created_at).toLocaleString() : 'Unknown'}
						</p>
						<p>
							Updated: {post.updated_at ? new Date(post.updated_at).toLocaleString() : 'Unknown'}
						</p>
					</div>

					<div className="mt-6">
						<button
							className="text-blue-500 hover:text-blue-700"
							onClick={() => navigate({ to: "/posts" })}
						>
							← Return to posts list
						</button>
					</div>
				</>
			)}
		</div>
	);
}