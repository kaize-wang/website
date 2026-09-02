import { getCollection, type CollectionEntry } from 'astro:content';

type Note = CollectionEntry<'notes'>;

export async function getPublishedNotes() {
  const notes = await getCollection('notes', ({ data }) => !data.draft);
  return notes.sort((a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf());
}

export function noteSlug(id: string) {
  return id;
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: 'numeric' }).format(date);
}

export function textUnits(body = '') {
  const cjk = (body.match(/[\u3400-\u9fff]/g) || []).length;
  const latin = (body.replace(/[\u3400-\u9fff]/g, ' ').match(/[A-Za-z0-9]+(?:['’-][A-Za-z0-9]+)*/g) || []).length;
  return cjk + latin;
}

export function readingTime(body = '') {
  const cjk = (body.match(/[\u3400-\u9fff]/g) || []).length;
  const latin = (body.replace(/[\u3400-\u9fff]/g, ' ').match(/[A-Za-z0-9]+(?:['’-][A-Za-z0-9]+)*/g) || []).length;
  return Math.max(1, Math.ceil(cjk / 500 + latin / 220));
}

export function normalizeWikiKey(value = '') {
  return value.trim().toLowerCase().replace(/\s+/g, ' ');
}

export function wikiLinks(body = '') {
  const links: { target: string; label: string; fragment: string }[] = [];
  const pattern = /\[\[([^\]|]+?)(?:\|([^\]]+))?\]\]/g;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(body))) {
    const raw = match[1].trim();
    const [target, ...fragmentParts] = raw.split('#');
    links.push({
      target: target.trim(),
      label: (match[2] || target).trim(),
      fragment: fragmentParts.join('#').trim()
    });
  }
  return links;
}

export function noteWikiKeys(note: Note) {
  return [note.id, note.data.title, ...(note.data.aliases || [])].map(normalizeWikiKey);
}

export function resolveWikiTarget(target: string, notes: Note[]) {
  const key = normalizeWikiKey(target);
  return notes.find(note => noteWikiKeys(note).includes(key));
}

export function backlinksFor(note: Note, notes: Note[]) {
  return notes.filter(candidate => {
    if (candidate.id === note.id) return false;
    return wikiLinks(candidate.body || '').some(link => resolveWikiTarget(link.target, notes)?.id === note.id);
  });
}

export function outgoingWikiNotes(note: Note, notes: Note[]) {
  const seen = new Set<string>();
  return wikiLinks(note.body || '')
    .map(link => resolveWikiTarget(link.target, notes))
    .filter((target): target is Note => Boolean(target && target.id !== note.id && !seen.has(target.id) && seen.add(target.id)));
}

export function graphEdges(notes: Note[]) {
  const edges: { source: string; target: string; type: 'wiki' | 'collection' | 'tag' | 'citation'; weight: number }[] = [];
  const seen = new Set<string>();
  const push = (source: string, target: string, type: 'wiki' | 'collection' | 'tag' | 'citation', weight: number) => {
    if (source === target) return;
    const [a, b] = [source, target].sort();
    const key = `${a}|${b}|${type}`;
    if (seen.has(key)) return;
    seen.add(key);
    edges.push({ source, target, type, weight });
  };

  for (const note of notes) {
    for (const target of outgoingWikiNotes(note, notes)) push(note.id, target.id, 'wiki', 4);
  }

  for (let i = 0; i < notes.length; i += 1) {
    for (let j = i + 1; j < notes.length; j += 1) {
      const a = notes[i];
      const b = notes[j];
      if (a.data.collection && a.data.collection === b.data.collection) push(a.id, b.id, 'collection', 3);
      const tagsA = new Set(a.data.tags.map(tag => tag.toLowerCase()));
      const sharedTags = b.data.tags.filter(tag => tagsA.has(tag.toLowerCase())).length;
      if (sharedTags >= 2) push(a.id, b.id, 'tag', Math.min(3, sharedTags));
      const doisA = new Set(a.data.references.map(ref => ref.doi).filter(Boolean));
      const sharedCitation = b.data.references.some(ref => ref.doi && doisA.has(ref.doi));
      if (sharedCitation) push(a.id, b.id, 'citation', 2);
    }
  }

  return edges;
}
