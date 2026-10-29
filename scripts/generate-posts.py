# -*- coding: utf-8 -*-
from pathlib import Path
import json
import re

ROOT = Path(__file__).resolve().parents[1]
data = json.loads((ROOT / "scripts" / "extracted-posts.json").read_text(encoding="utf-8"))
EN = json.loads((ROOT / "scripts" / "en-translations.json").read_text(encoding="utf-8"))

CAT_SLUG = {
	"歐洲": "europe",
	"英國": "uk",
	"威爾斯": "wales",
	"義大利": "italy",
	"威尼斯": "venice",
	"米蘭": "milan",
	"亞洲": "asia",
	"新加坡": "singapore",
	"詩": "poetry",
	"奧地利": "austria",
	"維也納": "vienna",
	"英格蘭": "england",
	"italy": "italy",
	"milan": "milan",
}
TAG_SLUG = {
	"威尼斯": "venice",
	"博物館": "museum",
	"義大利自由行": "italy-independent-travel",
	"藝廊": "gallery",
	"英國火車": "uk-trains",
	"自由行": "independent-travel",
	"旅遊規劃": "trip-planning",
	"義大利": "italy",
	"米蘭": "milan",
	"豪宅博物館": "house-museum",
	"新加坡": "singapore",
	"亞洲": "asia",
	"威爾斯": "wales",
	"卡地夫": "cardiff",
	"聖誕市集": "christmas-market",
	"秋": "autumn",
	"詩": "poetry",
	"咖啡館": "cafe",
	"維也納": "vienna",
	"歐洲旅遊": "europe-travel",
	"餐館推薦": "restaurant",
}


def clean_body(body: str) -> str:
	body = re.sub(r"!\[[^\]]*\]\(https?://(?!chidarc)[^)]+\)\n*", "", body)
	# Remove empty markdown links, but not image syntax (![](...))
	body = re.sub(r"(?<!!)\[\]\([^)]+\)\n*", "", body)
	body = re.sub(r"\n{3,}", "\n\n", body).strip()
	return body


def local_cover(cover, body):
	if cover and cover.startswith("/images/"):
		return cover
	m = re.search(r"!\[[^\]]*\]\((/images/[^)]+)\)", body)
	return m.group(1) if m else "/images/cwmparc-hill.jpg"


def yaml_list(items):
	if not items:
		return "[]"
	return "[" + ", ".join(json.dumps(i, ensure_ascii=False) for i in items) + "]"


def norm_cats(cats):
	out, seen = [], set()
	for c in cats:
		slug = CAT_SLUG.get(
			c["slug"],
			CAT_SLUG.get(c["name"], re.sub(r"[^a-z0-9]+", "-", c["slug"].lower()).strip("-") or "misc"),
		)
		if slug in seen:
			continue
		seen.add(slug)
		out.append(slug)
	return out


def norm_tags(tags):
	out, seen = [], set()
	for t in tags:
		slug = TAG_SLUG.get(
			t["name"],
			TAG_SLUG.get(t["slug"], re.sub(r"[^\w]+", "-", t["slug"]).lower().strip("-") or "tag"),
		)
		if slug in seen:
			continue
		seen.add(slug)
		out.append(slug)
	return out


posts_dir = ROOT / "src" / "content" / "posts"
posts_dir.mkdir(parents=True, exist_ok=True)
for f in posts_dir.glob("*.md"):
	f.unlink()

for item in data:
	key = item["translationKey"]
	en = EN[key]
	body_zh = clean_body(item["body_zh"])
	images = re.findall(r"!\[[^\]]*\]\(/images/[^)]+\)", body_zh)
	body_en = en["body"].strip()
	if images:
		body_en = body_en + "\n\n" + "\n\n".join(images)
	cover = local_cover(item.get("cover"), body_zh)
	if key == "scuola-grande-di-san-rocco" and cover.endswith("cwmparc-hill.jpg"):
		cover = "/images/img-66be39bbba.jpg"
	cats = norm_cats(item["categories"])
	tags = norm_tags(item["tags"])
	date = item["date"]
	slug = item["slug"]
	featured = str(key in ("venice", "cardiff-capital", "singapore-solo-trip")).lower()

	zh_fm = f"""---
title: {json.dumps(item["title_zh"], ensure_ascii=False)}
description: {json.dumps((item["excerpt_zh"] or item["title_zh"])[:160], ensure_ascii=False)}
pubDate: {date}
locale: zh-tw
translationKey: {key}
postSlug: {slug}
categories: {yaml_list(cats)}
tags: {yaml_list(tags)}
cover: {json.dumps(cover)}
featured: {featured}
---

{body_zh}
"""
	en_fm = f"""---
title: {json.dumps(en["title"], ensure_ascii=False)}
description: {json.dumps(en["excerpt"], ensure_ascii=False)}
pubDate: {date}
locale: en
translationKey: {key}
postSlug: {slug}
categories: {yaml_list(cats)}
tags: {yaml_list(tags)}
cover: {json.dumps(cover)}
featured: {featured}
---

{body_en}
"""
	(posts_dir / f"{slug}.zh-tw.md").write_text(zh_fm, encoding="utf-8")
	(posts_dir / f"{slug}.en.md").write_text(en_fm, encoding="utf-8")
	print("ok", slug, "images", len(images))

print("total", len(list(posts_dir.glob("*.md"))))
