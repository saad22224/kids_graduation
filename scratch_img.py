from duckduckgo_search import DDGS
import json

queries = [
    "washing hands with soap baby bottle pexels",
    "boiling kettle water baby formula preparation",
    "pouring water into baby bottle",
    "baby formula powder measuring scoop",
    "shaking baby milk bottle",
    "testing baby milk temperature on wrist"
]

results = []
with DDGS() as ddgs:
    for q in queries:
        try:
            img = list(ddgs.images(q, max_results=1))
            if img:
                results.append(img[0]['image'])
            else:
                results.append("not found")
        except Exception as e:
            results.append(str(e))

print(json.dumps(results, indent=2))
