// frontend/lib/rehype-youtube.ts
import { visit } from "unist-util-visit";

export default function rehypeYouTube() {
    return (tree: any) => {
        visit(tree, "element", (node: any) => {
            if (node.tagName === "a" && node.properties?.href) {
                const url: string = node.properties.href;
                let videoId: string | undefined;

                // Detect YouTube URL
                if (url.includes("youtube.com")) {
                    const params = new URL(url).searchParams;
                    videoId = params.get("v") || undefined;
                } else if (url.includes("youtu.be")) {
                    videoId = url.split("/").pop();
                }

                if (videoId) {
                    // Convert the node itself into an iframe
                    node.tagName = "iframe";
                    node.properties = {
                        width: "560",
                        height: "315",
                        src: `https://www.youtube.com/embed/${videoId}`,
                        allow:
                            "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
                        allowFullScreen: true,
                        style: "border:none;",
                    };
                    node.children = [];
                }
            }
        });
    };
}
