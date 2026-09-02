import { getCollection } from 'astro:content';

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
