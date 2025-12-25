"use client";
import { useEffect, useState } from "react";
import mermaid from "mermaid";

export default function MermaidRenderer({ code }: { code: string }) {
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        try {
            mermaid.initialize({ startOnLoad: true });
            mermaid.contentLoaded();
        } catch (e: any) {
            setError(e.message || "Mermaid render error");
        }
    }, [code]);

    if (error) {
        // GitHub-style fallback: original code + error message
        return (
            <div className="border border-red-400 bg-red-50 text-red-700 rounded p-3">
                <pre className="overflow-x-auto text-sm">
                    <code>{code}</code>
                </pre>
                <div className="mt-2 text-xs font-semibold">
                    ⚠️ Mermaid Error: {error}
                </div>
            </div>
        );
    }

    return <div className="mermaid">{code}</div>;
}
