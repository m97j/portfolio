import Image from "next/image";
import Link from "next/link";
import TagList from "./TagList";

export default function ProjectCard({ project }: { project: any }) {
  return (
    <Link href={`/projects/${project.slug}`} className="block border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
        {project.coverUrl && (
            <div className="relative w-full h-48">
                <Image src={project.coverUrl} alt={project.title} layout="fill" objectFit="cover" />
            </div>
        )}
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
            {project.tagString && <TagList tagString={project.tagString} compact={true} />}
            {project.summary && <p className="text-gray-600 dark:text-gray-400 mt-2">{project.summary}</p>}
            <p className="text-sm text-gray-500 mt-2">{project.tags?.join(", ")} • {project.language?.toUpperCase()}</p>
        </div>
    </Link>
  );
}