import { Layout } from '../components/layout/Layout';
import { ScheduleTable } from '../components/ScheduleTable';
import { schedule } from '../content/schedule';

export function Schedule() {
  return (
    <Layout title="Schedule · Yale Impact Exposition" description="The full agenda for the Yale Impact Exposition.">
      <div className="mx-auto max-w-[1120px] px-6 py-16 md:px-12 md:py-24">
        <h1 className="text-[32px] font-semibold text-ink-900">Schedule</h1>
        <p className="mt-2 text-base text-ink-700">The agenda for the day.</p>
        <div className="mt-12">
          <ScheduleTable items={schedule} />
        </div>
      </div>
    </Layout>
  );
}
