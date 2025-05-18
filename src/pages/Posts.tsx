import type React from 'react';
// eslint-disable-next-line no-duplicate-imports
import { useEffect, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { usePostsStore } from '../store/posts';

export function Posts(): React.ReactElement {
	const { posts, isLoading, error, fetchPosts, deletePost } = usePostsStore();
	const [deleteId, setDeleteId] = useState<number | null>(null);

	useEffect(() => {
		void fetchPosts();
	}, [fetchPosts]);

	const handleDeleteClick = (id: number): void => {
		setDeleteId(id);
	};

	const confirmDelete = async (): Promise<void> => {
		if (deleteId !== null) {
			await deletePost(deleteId);
			setDeleteId(null);
		}
	};

	const cancelDelete = (): void => {
		setDeleteId(null);
	};

	if (isLoading) {
		return <div className="p-4">Loading posts...</div>;
	}

	if (error) {
		return <div className="p-4 text-red-500">Error: {error}</div>;
	}

	return (
		<div className="container mx-auto p-4">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold">Posts list</h1>
				<Link
					className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
					to="/posts/new"
				>
					Create a new post
				</Link>
			</div>

			{posts.length === 0 ? (
				<div className="text-center p-6 bg-gray-100 rounded">
					There are no posts at the moment. Create a new post
				</div>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{posts.map((post) => (
						<div
							key={post.id}
							className="border rounded shadow p-4 hover:shadow-lg transition-shadow"
						>
							<h2 className="text-xl font-semibold mb-2">{post.title}</h2>
							<p className="text-gray-600 mb-4 line-clamp-3">{post.content}</p>


							<div className="flex justify-between">
								<Link
									className="text-blue-500 hover:text-blue-700"
									to={`/posts/${post.id}`}
								>
									View / Edit
								</Link>
								<button
									className="text-red-500 hover:text-red-700"
									onClick={() => { handleDeleteClick(post.id); }}
								>
									Delete
								</button>
							</div>
						</div>
					))}
				</div>
			)}

			{}
			{deleteId !== null && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
					<div className="bg-white p-6 rounded max-w-md w-full">
						<h3 className="text-lg font-bold mb-4">Confirmation of deletion</h3>
						<p>Are you sure you want to delete this post?</p>
						<div className="flex justify-end gap-2 mt-6">
							<button
								className="bg-gray-300 hover:bg-gray-400 py-2 px-4 rounded"
								onClick={cancelDelete}
							>
								Cancel
							</button>
							<button
								className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
								onClick={confirmDelete}
							>
								Delete
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}