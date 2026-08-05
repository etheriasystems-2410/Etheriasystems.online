const fs = require('fs');
const path = require('path');

// Simple text extraction and chunking for small site
async function extractFiles() {
  const repoRoot = path.join(process.cwd());
  const pagesDir = path.join(repoRoot, 'src', 'pages');
  const candidates = [];

  // README.md
  const readmePath = path.join(repoRoot, 'README.md');
  if (fs.existsSync(readmePath)) {
    candidates.push({ path: 'README.md', text: fs.readFileSync(readmePath, 'utf8') });
  }

  // info.md
  const infoPath = path.join(repoRoot, 'info.md');
  if (fs.existsSync(infoPath)) {
    candidates.push({ path: 'info.md', text: fs.readFileSync(infoPath, 'utf8') });
  }

  // src/pages/*.tsx
  if (fs.existsSync(pagesDir)) {
    const files = fs.readdirSync(pagesDir).filter((f) => f.endsWith('.tsx') || f.endsWith('.mdx') || f.endsWith('.md'));
    for (const f of files) {
      const p = path.join(pagesDir, f);
      const raw = fs.readFileSync(p, 'utf8');
      // crude JSX/HTML tag strip
      const text = raw.replace(/<[^>]+>/g, ' ').replace(/\{[^}]+\}/g, ' ').replace(/\/\*[^*]*\*+([^/*][^*]*\*+)*\//g, ' ').replace(/\/\/.*$/gm, ' ');
      candidates.push({ path: `src/pages/${f}`, text });
    }
  }

  return candidates;
}

function chunkText(text, maxLen = 1200) {
  const paragraphs = text.split(/\n\n+/).map(p => p.trim()).filter(Boolean);
  const chunks = [];
  let cur = '';
  for (const p of paragraphs) {
    if ((cur + '\n\n' + p).length > maxLen) {
      if (cur) chunks.push(cur);
      cur = p;
    } else {
      cur = cur ? cur + '\n\n' + p : p;
    }
  }
  if (cur) chunks.push(cur);
  return chunks;
}

async function getEmbedding(apiKey, text) {
  const res = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({ model: process.env.EMBEDDING_MODEL || 'text-embedding-3-small', input: text }),
  });
  if (!res.ok) {
    throw new Error(await res.text());
  }
  const data = await res.json();
  return data.data[0].embedding;
}

async function buildIndex() {
  const OPENAI_KEY = process.env.OPENAI_API_KEY;
  if (!OPENAI_KEY) throw new Error('OPENAI_API_KEY env var required');

  const docs = await extractFiles();
  const store = { documents: [] };

  for (const doc of docs) {
    const chunks = chunkText(doc.text, 1200);
    for (let i = 0; i < chunks.length; i++) {
      const text = chunks[i];
      console.log('Embedding', doc.path, 'chunk', i + 1, '/', chunks.length);
      const embedding = await getEmbedding(OPENAI_KEY, text);
      store.documents.push({ path: doc.path, text, embedding });
    }
  }

  const outDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);
  const outPath = path.join(outDir, 'vecstore.json');
  fs.writeFileSync(outPath, JSON.stringify(store));
  console.log('Wrote', outPath);
}

if (require.main === module) {
  buildIndex().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
