"use client";

import Image from "next/image";
import Link from "next/link";
import TagList from "./TagList";

type Project = {
  slug: string;
  title: string;
  coverUrl?: string;
  summary?: string;
  tags?: string[];
  tagString?: string;
  language?: string;
};

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="card bg-base-100 dark:bg-neutral shadow-xl hover:shadow-2xl transition">
      {/* Cover Image */}
      <figure className="relative w-full aspect-[16/9] bg-base-200">
        {project.coverUrl ? (
          <Image
            src={project.coverUrl}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            No Image
          </div>
        )}
      </figure>

      {/* Content */}
      <div className="card-body">
        <h2 className="card-title hover:text-primary transition">
          {project.title}
        </h2>

        {project.tagString && (
          <TagList tagString={project.tagString} compact={true} />
        )}

        {project.summary && (
          <p className="text-sm opacity-80 line-clamp-2">{project.summary}</p>
        )}

        {(project.tags?.length || project.language) && (
          <p className="text-xs opacity-60">
            {project.tags?.join(", ")}
            {project.language && ` • ${project.language.toUpperCase()}`}
          </p>
        )}

        <div className="card-actions justify-end mt-2">
          <Link href={`/projects/${project.slug}`} className="btn btn-sm btn-primary">
            View
          </Link>
        </div>
      </div>
    </div>
  );
}
