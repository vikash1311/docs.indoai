#!/usr/bin/env python3
"""
Extracts the <title> and <main class="content"> body out of each legacy
HTML page and generates:
  src/content/<slug>.ts   -> exports `title` and `html` (JSON-escaped, safe)
  src/app/<slug>/page.tsx -> server component rendering that content
index.html is special-cased to app/page.tsx (site root).

Note: a handful of source pages (the Network sub-pages: http, ftp-upload,
aws-s3-upload, tcp-communication, mqtt-publish, email-alert, ai-event-agent,
video-clip-snapshot, network) are missing their closing </main> tag in the
original markup - the extraction below tolerates that by trimming the
trailing layout-closing </div> instead of relying on </main> being present.
"""
import re
import json
import glob
import os

SRC_DIR = "/home/claude/raw_html"
OUT_ROOT = "/home/claude/indoai-docs/src"
CONTENT_DIR = os.path.join(OUT_ROOT, "content")
APP_DIR = os.path.join(OUT_ROOT, "app")

os.makedirs(CONTENT_DIR, exist_ok=True)

TITLE_RE = re.compile(r"<title>(.*?)\s*[–-]\s*Indo AI Docs</title>", re.DOTALL)
MAIN_START_RE = re.compile(r'<main class="content">')
SCRIPT_RE = re.compile(r'<script src="sidebar-loader\.js"')

TRAILING_TAG_RE = re.compile(r"(\s*</(?:main|div)>\s*)$")


def extract(fp):
    txt = open(fp, encoding="utf-8").read()

    title_m = TITLE_RE.search(txt)
    title = title_m.group(1).strip() if title_m else ""

    start_m = MAIN_START_RE.search(txt)
    end_m = SCRIPT_RE.search(txt) or re.search(r"</body>", txt)
    if not start_m or not end_m:
        raise ValueError(f"Could not locate content bounds in {fp}")

    body = txt[start_m.end():end_m.start()]

    # Trim trailing stray </main> / </div> (layout-closing tags — see
    # module docstring re: malformed source pages missing </main>).
    while True:
        m = TRAILING_TAG_RE.search(body)
        if not m:
            break
        body = body[: m.start()]

    # Fix root-relative asset paths (source pages use bare "assets/…").
    body = body.replace('src="assets/', 'src="/assets/')
    body = body.replace("href='assets/", "href='/assets/")
    body = body.replace('href="assets/', 'href="/assets/')

    # Rewrite internal cross-page links (foo.html -> /foo) to match Next.js
    # App Router's extensionless routes. index.html -> "/". Leaves external
    # (http/https/mailto) links and asset hrefs (already rewritten above,
    # so they no longer match "*.html") untouched.
    def rewrite_link(m):
        name = m.group(1)
        return 'href="/"' if name == "index" else f'href="/{name}"'

    body = re.sub(r'href="([a-zA-Z0-9_-]+)\.html"', rewrite_link, body)

    return title.strip(), body.strip()


def write_content_module(slug, title, html):
    path = os.path.join(CONTENT_DIR, f"{slug}.ts")
    with open(path, "w", encoding="utf-8") as f:
        f.write("// Auto-generated from legacy HTML by scripts/extract-pages.py\n")
        f.write(f"export const title = {json.dumps(title)};\n")
        f.write(f"export const html = {json.dumps(html)};\n")


PAGE_TSX_TEMPLATE = """// Auto-generated from legacy HTML by scripts/extract-pages.py
import type {{ Metadata }} from "next";
import {{ title, html }} from "@/content/{slug}";

export const metadata: Metadata = {{
  title: `${{title}} \u2013 Indo AI Docs`,
}};

export default function Page() {{
  return <div dangerouslySetInnerHTML={{{{ __html: html }}}} />;
}}
"""


def write_page_tsx(route_dir, slug):
    os.makedirs(route_dir, exist_ok=True)
    path = os.path.join(route_dir, "page.tsx")
    with open(path, "w", encoding="utf-8") as f:
        f.write(PAGE_TSX_TEMPLATE.format(slug=slug))


def main():
    files = sorted(glob.glob(os.path.join(SRC_DIR, "*.html")))
    done = []
    for fp in files:
        filename = os.path.basename(fp)
        if filename == "sidebar.html":
            continue
        slug = filename[:-5]  # strip ".html"
        title, html = extract(fp)
        write_content_module(slug, title, html)
        if slug == "index":
            write_page_tsx(APP_DIR, "index")  # writes straight to src/app/page.tsx
        else:
            write_page_tsx(os.path.join(APP_DIR, slug), slug)
        done.append(slug)

    print(f"Generated {len(done)} pages: {', '.join(done)}")


if __name__ == "__main__":
    main()
