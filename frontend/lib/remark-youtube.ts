// frontend/lib/remark-youtube.ts
import { visit } from "unist-util-visit";

export default function remarkYouTube() {
    return (tree: any) => {
        visit(tree, "link", (node) => {
            const url: string = node.url;

            // YouTube URL 감지
            if (url.includes("youtube.com") || url.includes("youtu.be")) {
                let videoId: string | undefined;

                if (url.includes("youtube.com")) {
                    const params = new URL(url).searchParams;
                    videoId = params.get("v") || undefined;
                } else if (url.includes("youtu.be")) {
                    videoId = url.split("/").pop();
                }

                if (videoId) {
                    // AST 노드를 iframe HTML로 교체
                    node.type = "html";
                    node.value = `
                    <iframe
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/${videoId}"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                    ></iframe>
                `;
                }
            }
        });
    };
}
