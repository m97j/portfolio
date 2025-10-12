import Tag from "./Tag";
import { parseTagsFromString } from "@/lib/tagParser";

export default function TagList({ tagString, compact = false }: { tagString: string; compact?: boolean }) {
  const symbols = parseTagsFromString(tagString);
  return (
    <div className="flex gap-2 flex-wrap">
      {symbols.map((s, i) => <Tag key={i} symbol={s} compact={compact} />)}
    </div>
  );
}
