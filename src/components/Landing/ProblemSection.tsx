import { Clock, Puzzle, XCircle } from 'lucide-react';
import { SectionHeader } from '../common';

const painPoints = [
  {
    icon: XCircle,
    subtitle: 'Lost Applications',
    description:
      "Applied to dozens of jobs but can't remember which ones or when you applied.",
  },
  {
    icon: Clock,
    subtitle: 'Missed Follow-ups',
    description:
      'Forgot to follow up after an interview? That opportunity might be gone forever.',
  },
  {
    icon: Puzzle,
    subtitle: 'No Clear Overview',
    description:
      'Scattered notes, browser tabs, and spreadsheets make it impossible to see the big picture.',
  },
];

const ProblemSection = () => {
  return (
    <section className="bg-white px-6 py-24 text-center">
      <SectionHeader
        tag="The Problem"
        title="Job searching shouldn't feel like chaos"
      />
      <div className="mx-auto flex max-w-4xl flex-col gap-8 sm:flex-row">
        {painPoints.map((point) => (
          <div
            key={point.subtitle}
            className="flex-1 rounded-2xl border border-gray-100 bg-gray-50 p-9 text-center transition-transform hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="mx-auto mb-5 flex h-13 w-13 items-center justify-center rounded-xl bg-blue-50">
              <point.icon className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900">
              {point.subtitle}
            </h3>
            <p className="text-sm text-gray-500">{point.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProblemSection;
