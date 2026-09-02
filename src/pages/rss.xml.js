import rss from '@astrojs/rss';
import { getPublishedNotes, noteSlug } from '@/utils/notes';
import { site } from '@/site.config';
import { withBase } from '@/utils/url';

export async function GET(context) {
  const notes = await getPublishedNotes();
  return rss({
    title: `${site.title} · Notes`,
    description: site.shortBio,
    site: context.site,
    items: notes.map(note => ({
      title: note.data.title,
      description: note.data.description,
      pubDate: note.data.publishDate,
      link: withBase(`/notes/${noteSlug(note.id)}/`)
    }))
  });
}
