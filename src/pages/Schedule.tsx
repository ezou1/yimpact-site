import { Layout } from '../components/layout/Layout';
import { PageHeader } from '../components/ui/PageHeader';
import { Reveal } from '../components/ui/Reveal';
import { ScheduleTable } from '../components/ScheduleTable';
import { schedule } from '../content/schedule';
import { event } from '../content/event';

export function Schedule() {
  return (
    <Layout
      title="Schedule · Yale Impact Expo"
      description="The Expo weekend agenda: track showcases, judging, partner office hours, and the opportunity awards."
    >
      <PageHeader
        eyebrow={`${schedule.length} sessions · ${event.dateLabel}`}
        title="Schedule"
        meta="Saturday is the centre of the weekend: track showcases, balanced judging panels, partner office hours open to every team, and the finalist announcements. Rooms are confirmed closer to the date."
      />

      <div className="mx-auto max-w-[1200px] px-6 pb-20 md:px-10">
        <Reveal>
          <ScheduleTable items={schedule} />
        </Reveal>
      </div>
    </Layout>
  );
}
