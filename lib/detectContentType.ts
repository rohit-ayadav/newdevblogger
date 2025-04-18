export type ContentType = 'markdown' | 'html' | 'text';

export function detectContentType(content: string): ContentType {
    const trimmed = content.trim();

    const isHTML = /^<!DOCTYPE html>|<html.*?>|<\/?[a-z][\s\S]*?>/i.test(trimmed);
    const hasMarkdownSyntax = /(^|\n)\s{0,3}(#{1,6})\s|[*_]{1,2}[^*_]+[*_]{1,2}|`{1,3}[^`]*`{1,3}|!\[.*\]\(.*\)|\[[^\]]+\]\(.*\)/.test(trimmed);
    const isPlainText = /^[\w\s.,'"!?-]+$/.test(trimmed);

    if (isHTML && !hasMarkdownSyntax) {
        return 'html';
    }

    if (hasMarkdownSyntax) {
        return 'markdown';
    }

    return 'text';
}

// Currently no used, but can be used in the future to detect content type from a file content