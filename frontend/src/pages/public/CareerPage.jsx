import { useState } from 'react';
import { FiMapPin, FiMail, FiPhone, FiClock, FiBriefcase, FiUsers, FiArrowRight, FiCheck } from 'react-icons/fi';

const CareerPage = () => {
  const [activeTab, setActiveTab] = useState('openings');

  const jobOpenings = [
    {
      id: 1,
      title: 'Senior Full Stack Developer',
      department: 'Engineering',
      location: 'Kathmandu, Nepal',
      type: 'Full-time',
      experience: '3-5 years',
      description: 'Join our engineering team to build scalable travel booking solutions.',
      requirements: ['React & Node.js expertise', 'Experience with cloud services', 'Strong problem-solving skills']
    },
    {
      id: 2,
      title: 'Customer Success Manager',
      department: 'Customer Service',
      location: 'Kathmandu, Nepal',
      type: 'Full-time',
      experience: '2-4 years',
      description: 'Help our customers have the best travel experience possible.',
      requirements: ['Excellent communication skills', 'Problem-solving attitude', 'Travel industry knowledge']
    },
    {
      id: 3,
      title: 'Digital Marketing Specialist',
      department: 'Marketing',
      location: 'Kathmandu, Nepal',
      type: 'Full-time',
      experience: '2-3 years',
      description: 'Drive our marketing initiatives and grow our online presence.',
      requirements: ['SEO/SEM expertise', 'Social media management', 'Analytics tools proficiency']
    },
    {
      id: 4,
      title: 'Travel Consultant',
      department: 'Sales',
      location: 'Kathmandu, Nepal',
      type: 'Full-time',
      experience: '1-3 years',
      description: 'Help customers find their perfect travel packages.',
      requirements: ['Sales experience', 'Knowledge of travel destinations', 'Client relationship management']
    },
    {
      id: 5,
      title: 'UI/UX Designer',
      department: 'Design',
      location: 'Remote',
      type: 'Full-time',
      experience: '2-4 years',
      description: 'Design beautiful and intuitive user interfaces for our platform.',
      requirements: ['Figma expertise', 'User research experience', 'Portfolio required']
    },
    {
      id: 6,
      title: 'DevOps Engineer',
      department: 'Engineering',
      location: 'Kathmandu, Nepal',
      type: 'Full-time',
      experience: '3-5 years',
      description: 'Maintain and improve our cloud infrastructure.',
      requirements: ['AWS/GCP expertise', 'CI/CD pipelines', 'Containerization knowledge']
    }
  ];

  const benefits = [
    { icon: '💰', title: 'Competitive Salary', desc: 'Industry-leading compensation packages' },
    { icon: '🏥', title: 'Health Insurance', desc: 'Comprehensive medical coverage for you and family' },
    { icon: '🏖️', title: 'Paid Leave', desc: 'Generous vacation and sick leave policies' },
    { icon: '📚', title: 'Learning Budget', desc: 'Annual budget for courses and conferences' },
    { icon: '🏋️', title: 'Wellness Programs', desc: 'Gym membership and wellness initiatives' },
    { icon: '🎉', title: 'Team Events', desc: 'Regular team building and social events' },
    { icon: '🏠', title: 'Remote Work', desc: 'Flexible work from home options' },
    { icon: '🚀', title: 'Career Growth', desc: 'Clear progression paths and mentorship' }
  ];

  const culture = [
    {
      title: 'Innovation First',
      desc: 'We encourage creative solutions and new ideas from every team member.',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600'
    },
    {
      title: 'Work-Life Balance',
      desc: 'Flexible schedules and remote work options to help you thrive.',
      image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600'
    },
    {
      title: 'Inclusive Culture',
      desc: 'We celebrate diversity and create an environment where everyone belongs.',
      image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600'
    }
  ];

  const values = [
    { icon: <FiUsers />, title: 'Collaboration', desc: 'We work together to achieve extraordinary results' },
    { icon: <FiBriefcase />, title: 'Excellence', desc: 'We strive for quality in everything we do' },
    { icon: <FiCheck />, title: 'Integrity', desc: 'We build trust through honest and ethical practices' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-700/80 to-cyan-900/60 z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1920"
            alt="Careers at TravelHub" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-20 w-full max-w-4xl px-4 text-center">
          <h1 className="text-white text-4xl md:text-5xl font-black mb-4">
            Join Our Team
          </h1>
          <p className="text-cyan-100 text-lg md:text-xl max-w-2xl mx-auto">
            Build your career with one of Nepal's fastest-growing travel companies
          </p>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-cyan-900 mb-4">Why Join TravelHub?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Be part of a dynamic team that's transforming the travel industry
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-lg font-semibold text-cyan-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Culture */}
      <section className="py-20 bg-cyan-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Culture</h2>
            <p className="text-cyan-200 max-w-2xl mx-auto">
              We believe in creating an environment where everyone can thrive
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {culture.map((item, index) => (
              <div key={index} className="bg-cyan-800 rounded-2xl overflow-hidden">
                <img 
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-cyan-200 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center p-8">
                <div className="w-16 h-16 bg-lime-500 rounded-full flex items-center justify-center text-cyan-900 mx-auto mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-cyan-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Openings */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-cyan-900 mb-4">Open Positions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find your next opportunity and join our growing team
            </p>
          </div>
          <div className="grid gap-6 max-w-4xl mx-auto">
            {jobOpenings.map((job) => (
              <div key={job.id} className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-cyan-900 mb-2">{job.title}</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1"><FiBriefcase size={16} /> {job.department}</span>
                      <span className="flex items-center gap-1"><FiMapPin size={16} /> {job.location}</span>
                      <span className="flex items-center gap-1"><FiClock size={16} /> {job.type}</span>
                    </div>
                    <p className="text-gray-600 mt-3">{job.description}</p>
                  </div>
                  <button className="bg-lime-500 text-cyan-900 px-6 py-3 rounded-lg font-medium hover:bg-lime-400 transition-colors flex items-center gap-2 whitespace-nowrap">
                    Apply Now <FiArrowRight />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-cyan-900 mb-4">Application Process</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our hiring process is designed to help us get to know each other better
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Apply', desc: 'Submit your resume and cover letter' },
              { step: '02', title: 'Review', desc: 'Our team reviews your application' },
              { step: '03', title: 'Interview', desc: 'Phone and in-person interviews' },
              { step: '04', title: 'Offer', desc: 'Receive your offer letter' }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-cyan-900 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-cyan-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-gradient-to-r from-cyan-700 to-cyan-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Don't See the Right Role?</h2>
          <p className="text-cyan-200 mb-8 max-w-2xl mx-auto">
            We're always looking for talented people. Send us your resume and we'll reach out when we have a suitable position.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="flex items-center gap-2 text-white">
              <FiMail className="text-lime-400" />
              <span>careers@travelhub.com</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <FiPhone className="text-lime-400" />
              <span>+977 9800000000</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <FiMapPin className="text-lime-400" />
              <span>Kathmandu, Nepal</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CareerPage;
