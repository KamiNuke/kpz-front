import type React from 'react';
// eslint-disable-next-line no-duplicate-imports
import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { usePostsStore } from '../store/posts';
import type { CreatePostDTO } from '../types/Post';

export function PostsNew(): React.ReactElement {
	const navigate = useNavigate();
	const { addPost, isLoading, error } = usePostsStore();
	const [formData, setFormData] = useState<CreatePostDTO>({
		title: '',
		content: ''
	});
	const [formErrors, setFormErrors] = useState<Record<string, string>>({});

	// eslint-disable-next-line unicorn/prevent-abbreviations
	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
		const { name, value } = e.target;
		setFormData(previousData => ({ ...previousData, [name]: value }));

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

		const result = await addPost(formData);
		if (result) {
			await navigate({ to: '/posts' });
		}
	};

	return (
		<div className="container mx-auto p-4 max-w-2xl">
			<h1 className="text-2xl font-bold mb-6">Create a new post</h1>

			{error && (
				<div className="bg-red-100 border border-red-400 text-red-700 p-3 rounded mb-4">
					{error}
				</div>
			)}

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
						<p className="text-red-500 text-sm mt-1">{formErrors["title"]}</p>
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
						rows={6}
						value={formData.content}
						onChange={handleChange}
					/>
					{formErrors["content"] && (
						<p className="text-red-500 text-sm mt-1">{formErrors["content"]}</p>
					)}
				</div>

				<div className="flex gap-3 pt-2">
					<button
						className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
						disabled={isLoading}
						type="button"
						onClick={() => navigate({ to: "/posts" })}
					>
						Cancel
					</button>
					<button
						className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
						disabled={isLoading}
						type="submit"
					>
						{isLoading ? "Loading..." : "Create a post"}
					</button>
				</div>
			</form>
		</div>
	);
}