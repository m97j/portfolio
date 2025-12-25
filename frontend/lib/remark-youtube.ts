// frontend/lib/remark-youtube.ts
import { visit } from "unist-util-visit";

export default function remarkYouTube() {
    return (tree: any) => {
        visit(tree, "link", (node) => {
            const url: string = node.url;
            let videoId: string | undefined;
            // YouTube URL 감지
            if (url.includes("youtube.com")) {
                const params = new URL(url).searchParams;
                videoId = params.get("v") || undefined;
            } else if (url.includes("youtu.be")) {
                videoId = url.split("/").pop();
            }

            if (videoId) {
                // AST -> React node
                node.type = "mdxJsxFlowElement";
                node.name = "iframe";
                node.attributes = [
                    { type: "mdxJsxAttribute", name: "width", value: "560" },
                    { type: "mdxJsxAttribute", name: "height", value: "315" },
                    { type: "mdxJsxAttribute", name: "src", value: `https://www.youtube.com/embed/${videoId}` },
                    { type: "mdxJsxAttribute", name: "frameBorder", value: "0" },
                    { type: "mdxJsxAttribute", name: "allow", value: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" },
                    { type: "mdxJsxAttribute", name: "allowFullScreen", value: true },
                ];
            }
        });
    };
}
