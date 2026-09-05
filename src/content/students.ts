// The student walkthrough video. Paste the YouTube video id here — the part
// after `v=` in the watch URL — and the player replaces the placeholder frame
// on the Students page.
export const walkthroughVideoId = '';

export const walkthroughTitle = 'What the Yale Impact Expo is, and how to get involved';

export const walkthroughSummary =
  'A short walkthrough from the team: what the Expo asks of you, what a semester looks like week by week, and what strong teams leave with.';

export interface StudentStep {
  id: string;
  name: string;
  timing: string;
  summary: string;
}

// The semester, as a student experiences it.
export const studentSteps: StudentStep[] = [
  {
    id: 'apply',
    name: 'Apply',
    timing: 'Before week 1',
    summary:
      'One short form. No team required, no prototype required, no prior research experience required. Tell us the problem you care about.',
  },
  {
    id: 'form-a-team',
    name: 'Form a team',
    timing: 'Weeks 1–2',
    summary:
      'Kickoff, track introductions, partner problem prompts, faculty lightning talks, and structured matching across schools and years.',
  },
  {
    id: 'research',
    name: 'Research',
    timing: 'Weeks 3–6',
    summary:
      'Define the problem, consult faculty and partner organizations, review the evidence, identify who is actually affected, and choose your output.',
  },
  {
    id: 'build',
    name: 'Build, analyze, or design',
    timing: 'Weeks 7–11',
    summary:
      'Make the thing: a prototype, an empirical study, a policy memo, a venture or nonprofit proposal, a governance framework, or a pilot plan.',
  },
  {
    id: 'refine',
    name: 'Refine',
    timing: 'Weeks 12–13',
    summary: 'Presentation coaching, rubric review, mentor feedback, partner office hours, and a final pass on the work.',
  },
  {
    id: 'present',
    name: 'Present at the Expo',
    timing: 'Expo weekend',
    summary:
      'Show your work to partners across nine domains, meet the judges walking your track, and leave with the commitments you have earned.',
  },
];
