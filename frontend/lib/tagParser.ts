export function parseTagsFromString(tagString: string): string[] {
  // 이모지만 추출 (유니코드 범위 간단 처리)
  const matches = tagString.match(/[\u{1F300}-\u{1FAFF}]/gu);
  return matches || [];
}
