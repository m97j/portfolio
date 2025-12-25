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
                    { type: "mdxJsxFlowElement", name: "width", value: "560" },
                    { type: "mdxJsxFlowElement", name: "height", value: "315" },
                    { type: "mdxJsxFlowElement", name: "src", value: `https://www.youtube.com/embed/${videoId}` },
                    { type: "mdxJsxFlowElement", name: "frameBorder", value: "0" },
                    { type: "mdxJsxFlowElement", name: "allow", value: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" },
                    { type: "mdxJsxFlowElement", name: "allowFullScreen", value: true },
                ];
            }
        });
    };
}
