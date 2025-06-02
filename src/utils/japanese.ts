/**
 * ひらがなをカタカナに変換
 */
export function hiraganaToKatakana(str: string): string {
  return str.replace(/[\u3041-\u3096]/g, function(match) {
    return String.fromCharCode(match.charCodeAt(0) + 0x60);
  });
}

/**
 * 検索用に文字列を正規化（カタカナ統一）
 */
export function normalizeForSearch(str: string): string {
  const katakana = hiraganaToKatakana(str.toLowerCase());
  return `${katakana}`;
} 