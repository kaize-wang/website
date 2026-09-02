import rss from '@astrojs/rss';
import { getPublishedNotes, noteSlug } from '@/utils/notes';
import { site } from '@/site.config';

export async function GET(context) {
  const notes = await getPublishedNotes();
  return rss({
    title: `${site.fullName} · Notes`,
    description: site.shortBio,
    site: context.site,
    items: notes.map(note => ({
      title: note.data.title,
      description: note.data.description,
      pubDate: note.data.publishDate,
      link: `/notes/${noteSlug(note.id)}/`
    }))
  });
}
