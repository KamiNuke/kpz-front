import { createFileRoute } from "@tanstack/react-router";
import { PostContent } from "../../pages/PostsContent";

export const Route = createFileRoute("/posts/$id")({
	component: PostContent,
});

