"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import { theme } from "@/lib/theme";

type IndexEntry = { file: string; title: string; text: string };
type ScoredEntry = { entry: IndexEntry; score: number };

const Wrap = styled.div`
  flex: 1;
  max-width: 760px;
  position: relative;
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background: #f5f6f9;
  border: 1px solid ${theme.colors.border};
  border-radius: 10px;
  padding: 12px 18px;
  color: ${theme.colors.textMuted};
  font-size: 15px;

  svg {
    flex-shrink: 0;
    opacity: 0.6;
  }
`;

const Input = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  font-size: 15px;
  font-family: inherit;
  color: ${theme.colors.text};

  &::placeholder {
    color: ${theme.colors.textMuted};
  }
`;

const Results = styled.div<{ $open: boolean }>`
  display: ${({ $open }) => ($open ? "block" : "none")};
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  right: 0;
  max-height: 420px;
  overflow-y: auto;
  background: #fff;
  border: 1px solid ${theme.colors.border};
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(20, 25, 40, 0.12);
  z-index: 50;
`;

const ResultLink = styled.a<{ $active?: boolean }>`
  display: block;
  padding: 12px 18px;
  border-bottom: 1px solid ${theme.colors.border};
  text-decoration: none;
  cursor: pointer;

  &:last-child {
    border-bottom: none;
  }

  ${({ $active }) =>
    $active &&
    `
    background: ${theme.colors.blueLight};
  `}

  &:hover {
    background: ${theme.colors.blueLight};
  }
`;

const ResultTitle = styled.div`
  font-size: 14.5px;
  font-weight: 700;
  color: ${theme.colors.text};

  mark {
    background: #fde68a;
    color: inherit;
    border-radius: 2px;
    padding: 0 1px;
  }
`;

const ResultSnippet = styled.div`
  font-size: 12.5px;
  color: ${theme.colors.textMuted};
  margin-top: 3px;

  mark {
    background: #fde68a;
    color: inherit;
    border-radius: 2px;
    padding: 0 1px;
  }
`;

const Empty = styled.div`
  padding: 16px 18px;
  font-size: 13.5px;
  color: ${theme.colors.textMuted};
`;

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string)
  );
}

function highlight(text: string, query: string) {
  const escaped = escapeHtml(text);
  if (!query) return escaped;
  const q = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return escaped.replace(new RegExp(`(${q})`, "ig"), "<mark>$1</mark>");
}

function snippetAround(text: string, query: string) {
  const lower = text.toLowerCase();
  const i = lower.indexOf(query.toLowerCase());
  if (i === -1) return text.slice(0, 140);
  const start = Math.max(0, i - 50);
  const end = Math.min(text.length, i + query.length + 90);
  return (start > 0 ? "…" : "") + text.slice(start, end) + (end < text.length ? "…" : "");
}

function fileToHref(file: string) {
  if (file === "index.html") return "/";
  return "/" + file.replace(/\.html$/, "");
}

export default function SearchBox() {
  const router = useRouter();
  const [index, setIndex] = useState<IndexEntry[] | null>(null);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/search-index.json")
      .then((res) => res.json())
      .then(setIndex)
      .catch((err) => console.error("Search index failed to load:", err));
  }, []);

  const [focused, setFocused] = useState(false);

  const items: ScoredEntry[] = useMemo(() => {
    if (!index) return [];
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const scored: ScoredEntry[] = [];
    for (const entry of index) {
      const titleLower = entry.title.toLowerCase();
      const textLower = entry.text.toLowerCase();
      let score = -1;
      if (titleLower.indexOf(q) !== -1) {
        score = titleLower.indexOf(q) === 0 ? 100 : 60;
      } else if (textLower.indexOf(q) !== -1) {
        score = 20;
      }
      if (score > -1) scored.push({ entry, score });
    }
    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, 8);
  }, [index, query]);

  const open = focused && query.trim().length > 0;

  function go(href: string) {
    setQuery("");
    setFocused(false);
    router.push(href);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (items.length) setActiveIndex((i) => Math.min(i + 1, items.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (items.length) setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      const pick = activeIndex >= 0 ? items[activeIndex] : items[0];
      if (pick) go(fileToHref(pick.entry.file));
    } else if (e.key === "Escape") {
      setFocused(false);
      (e.target as HTMLInputElement).blur();
    }
  }

  return (
    <Wrap ref={wrapRef} className="search">
      <Box className="search-box">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <circle cx="11" cy="11" r="7" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <Input
          id="site-search-input"
          type="text"
          placeholder="Have a question? Ask or enter a search term."
          autoComplete="off"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActiveIndex(-1);
          }}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 120)}
          onKeyDown={onKeyDown}
        />
      </Box>
      <Results className="search-results" $open={open}>
        {items.length === 0 ? (
          <Empty>No results for &quot;{escapeHtml(query.trim())}&quot;</Empty>
        ) : (
          items.map((item, idx) => (
            <ResultLink
              key={item.entry.file}
              href={fileToHref(item.entry.file)}
              $active={idx === activeIndex}
              onMouseDown={(e) => {
                e.preventDefault();
                go(fileToHref(item.entry.file));
              }}
            >
              <ResultTitle
                dangerouslySetInnerHTML={{ __html: highlight(item.entry.title, query) }}
              />
              <ResultSnippet
                dangerouslySetInnerHTML={{
                  __html: highlight(snippetAround(item.entry.text, query), query),
                }}
              />
            </ResultLink>
          ))
        )}
      </Results>
    </Wrap>
  );
}
