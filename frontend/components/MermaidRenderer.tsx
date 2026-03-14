// frontend/components/MermaidRenderer.tsx
"use client";
import { useEffect, useState, useRef } from "react";
import mermaid from "mermaid";

const MERMAID_CONFIG = {
    startOnLoad: true,
    theme: 'dark' as any,
    securityLevel: 'loose' as any,
    themeVariables: {
        darkMode: true,
        background: 'transparent',
        mainBkg: '#2d2d2d',
        lineColor: '#BBBBBB',
        textColor: '#FFFFFF',
        primaryColor: '#f9f',
    }
};

export default function MermaidRenderer({ code }: { code: string }) {
    const [error, setError] = useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        mermaid.initialize(MERMAID_CONFIG);

        const renderMermaid = async () => {
            if (containerRef.current) {
                try {
                    setError(null);
                    containerRef.current.removeAttribute("data-processed"); // allow re-rendering
                    await mermaid.contentLoaded();
                } catch (e: any) {
                    setError(e.message || "Mermaid render error");
                }
            }
        };

        renderMermaid();
    }, [code]);

    if (error) {
        // GitHub-style fallback: original code + error message
        return (
            <div className="border border-red-400 bg-red-950/30 text-red-400 rounded p-3 my-4">
                <pre className="overflow-x-auto text-sm">
                    <code>{code}</code>
                </pre>
                <div className="mt-2 text-xs font-semibold">
                    ⚠️ Mermaid Error: {error}
                </div>
            </div>
        );
    }

    return (
        <div className="flex justify-center my-6 bg-slate-900/20 p-4 rounded-xl overflow-x-auto border border-white/5">
            <div ref={containerRef} className="mermaid w-full text-center">
                {code}
            </div>
        </div>
    );
}
