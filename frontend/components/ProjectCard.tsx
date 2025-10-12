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
    <Link
      href={`/projects/${project.slug}`}
      className="group block border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-200 bg-white dark:bg-gray-900"
    >
      {/* Cover Image */}
      <div className="relative w-full h-48 bg-gray-100 dark:bg-gray-800">
        {project.coverUrl ? (
          <Image
            src={project.coverUrl}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={false}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            No Image
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">
          {project.title}
        </h2>

        {project.tagString && (
          <TagList tagString={project.tagString} compact={true} />
        )}

        {project.summary && (
          <p className="text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">
            {project.summary}
          </p>
        )}

        {(project.tags?.length || project.language) && (
          <p className="text-sm text-gray-500 mt-3">
            {project.tags?.join(", ")}
            {project.language && ` • ${project.language.toUpperCase()}`}
          </p>
        )}
      </div>
    </Link>
  );
}
