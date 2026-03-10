import { CircleUserRound, ClipboardList, Rocket } from 'lucide-react';
import { SectionHeader } from '../common';

const steps = [
  {
    icon: CircleUserRound,
    title: 'Create an Account',
    description: 'Sign up for free in seconds. No credit card required.',
  },
  {
    icon: ClipboardList,
    title: 'Add Applications',
    description:
      'Log each job you apply to with the company, role, and status.',
  },
  {
    icon: Rocket,
    title: 'Track & Succeed',
    description: 'Monitor your progress, follow up on time, and land the job.',
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-white px-6 py-24 text-center">
      <SectionHeader
        tag="How It Works"
        title="Up and running in 3 simple steps"
      />
      <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-12 sm:flex-row sm:items-start sm:justify-center sm:gap-16">
        <div className="absolute top-8 right-[20%] left-[20%] hidden h-0.5 bg-linear-to-r from-blue-100 via-blue-500 to-blue-100 sm:block" />
        {steps.map((step, index) => (
          <div
            key={step.title}
            className="relative flex flex-1 flex-col items-center"
          >
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold text-white shadow-lg shadow-blue-600/25">
              {index + 1}
            </div>
            <step.icon className="mb-4 h-6 w-6 text-blue-600" />
            <h3 className="mb-2 text-lg font-semibold text-gray-900">
              {step.title}
            </h3>
            <p className="max-w-55 text-sm text-gray-500">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
