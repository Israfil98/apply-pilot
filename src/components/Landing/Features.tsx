import { BarChart3, LayoutDashboard, Mail, Shield } from 'lucide-react';
import { SectionHeader } from '../common';

const features = [
  {
    icon: LayoutDashboard,
    subtitle: 'Application Dashboard',
    description:
      'See all your applications at a glance with real-time stats — applied, interviewing, offered, and rejected.',
  },
  {
    icon: BarChart3,
    subtitle: 'Track Your Progress',
    description:
      'Visual metrics show your application pipeline so you know exactly where you stand at all times.',
  },
  {
    icon: Mail,
    subtitle: 'Never Miss a Follow-up',
    description:
      'Keep track of every interview date and follow-up so no opportunity slips through the cracks.',
  },
  {
    icon: Shield,
    subtitle: 'Secure & Private',
    description:
      'Your data is yours. Secured with industry-standard encryption and never shared with third parties.',
  },
];

const Features = () => {
  return (
    <section className="bg-gray-50 px-6 py-24">
      <div className="mx-auto max-w-4xl text-center">
        <SectionHeader
          tag="Features"
          title="Everything you need to stay organized"
          description="Simple, powerful tools that help you take control of your job search."
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.subtitle}
              className="rounded-2xl border border-gray-100 bg-white p-9 text-center transition-transform hover:-translate-y-1 hover:shadow-lg sm:text-left"
            >
              <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 sm:mx-0">
                <feature.icon className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">
                {feature.subtitle}
              </h3>
              <p className="text-sm leading-relaxed text-gray-500">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
