// frontend/lib/remark-youtube.ts
import { visit } from "unist-util-visit";

export default function remarkYouTube() {
    return (tree: any) => {
        visit(tree, "link", (node: any) => {
            const url: string = node.url;
            let videoId: string | null = null;

            // Detect YouTube URL 
            if (url.includes("youtube.com")) {
                try {
                    const params = new URL(url).searchParams;
                    videoId = params.get("v");
                } catch {
                    videoId = null;
                }
            } else if (url.includes("youtu.be")) {
                videoId = url.split("/").pop() || null;
            }

            if (videoId) {
                // AST -> standard HTML element
                node.type = "element";
                node.tagname = "iframe";
                node.properties = {
                    width: "560",
                    height: "315",
                    src: `https://www.youtube.com/embed/${videoId}`,
                    frameBorder: "0",
                    allow:
                        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
                    allowFullScreen: true,
                };
                node.children = [];
            }
        });
    };
}
