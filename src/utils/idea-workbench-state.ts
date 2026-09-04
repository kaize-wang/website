import type { CollectionEntry } from 'astro:content';
import rawState from '@/data/idea-workbench-state.json';

type IdeaEntry = CollectionEntry<'ideas'>;

type ProgressEntry = {
  date: string;
  note: string;
  noteZh?: string;
};

type WorkbenchState = {
  version: number;
  updatedAt: string | null;
  stage: Record<string, string>;
  next: Record<string, string>;
  milestones: Record<string, Record<string, boolean>>;
  progress: Record<string, ProgressEntry[]>;
};

const state = rawState as unknown as WorkbenchState;
const validStages = new Set(['Spark', 'Exploring', 'Active', 'Realized', 'Parked']);
const own = (object: object, key: PropertyKey) => Object.prototype.hasOwnProperty.call(object, key);

export function applyIdeaWorkbenchState(idea: IdeaEntry): IdeaEntry {
  const id = idea.id;
  const stageOverride = state.stage?.[id];
  const nextOverride = state.next?.[id];
  const milestoneOverrides = state.milestones?.[id] || {};
  const progressOverrides = Array.isArray(state.progress?.[id]) ? state.progress[id] : [];
  const touched =
    (typeof stageOverride === 'string' && validStages.has(stageOverride)) ||
    own(state.next || {}, id) ||
    Object.keys(milestoneOverrides).length > 0 ||
    progressOverrides.length > 0;

  if (!touched) return idea;

  const existingProgress = new Set(
    idea.data.progress.map(entry => `${entry.date.toISOString()}\u0000${entry.note}`)
  );
  const extraProgress = progressOverrides
    .filter(entry => entry && entry.note && Number.isFinite(Date.parse(entry.date)))
    .filter(entry => !existingProgress.has(`${new Date(entry.date).toISOString()}\u0000${entry.note}`))
    .map(entry => ({
      date: new Date(entry.date),
      note: String(entry.note),
      noteZh: entry.noteZh ? String(entry.noteZh) : undefined
    }));

  const nextValue = own(state.next || {}, id) ? String(nextOverride ?? '') : undefined;
  const updatedDate = state.updatedAt && Number.isFinite(Date.parse(state.updatedAt))
    ? new Date(state.updatedAt)
    : idea.data.updatedDate;

  return {
    ...idea,
    data: {
      ...idea.data,
      stage: typeof stageOverride === 'string' && validStages.has(stageOverride)
        ? stageOverride as IdeaEntry['data']['stage']
        : idea.data.stage,
      nextAction: nextValue !== undefined ? (nextValue || undefined) : idea.data.nextAction,
      nextActionZh: nextValue !== undefined ? (nextValue || undefined) : idea.data.nextActionZh,
      updatedDate,
      milestones: idea.data.milestones.map((item, index) => ({
        ...item,
        done: own(milestoneOverrides, String(index))
          ? Boolean(milestoneOverrides[String(index)])
          : item.done
      })),
      progress: [...idea.data.progress, ...extraProgress]
    }
  } as IdeaEntry;
}

export const ideaWorkbenchState = state;
