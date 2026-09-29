import { ResourceTile } from './ResourceTile';
import { EmptyNote } from './ui/Status';
import type { Resource } from '../types/db';

interface ResourceListProps {
  resources: Resource[];
  // 2 when the list stands alone. 3 inside a Section, because Section already
  // writes the h2. This keeps the heading sequence correct in both places.
  headingLevel: 2 | 3;
}

// Presentation only. No Layout, no page heading, and no page padding, so the
// Sponsors page can embed this block with one line.
export function ResourceList({ resources, headingLevel }: ResourceListProps) {
  if (resources.length === 0) {
    return <EmptyNote>No resources in this group yet.</EmptyNote>;
  }

  return (
    <ul className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4">
      {resources.map((resource) => (
        <li key={resource.id}>
          <ResourceTile resource={resource} headingLevel={headingLevel} />
        </li>
      ))}
    </ul>
  );
}
