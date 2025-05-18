import { createFileRoute } from "@tanstack/react-router";
import { PostsNew } from "../../pages/PostsNew";

export const Route = createFileRoute("/posts/new")({
	component: PostsNew,
});