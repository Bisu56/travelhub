import { FiMapPin, FiMail, FiPhone, FiBriefcase, FiUsers, FiArrowRight, FiCalendar } from 'react-icons/fi';

const CareerPage = () => {
  const notices = [
    {
      id: 1,
      title: 'We Are Hiring!',
      subtitle: 'Multiple Positions Available',
      date: 'March 2026',
      description: 'TravelHub is expanding! We are looking for talented individuals to join our growing team. Check back regularly for new opportunities.',
      positions: [
        'Senior Full Stack Developer',
        'Customer Success Manager',
        'Digital Marketing Specialist',
        'Travel Consultant'
      ]
    },
    {
      id: 2,
      title: 'Internship Program',
      subtitle: 'Summer 2026',
      date: 'February 2026',
      description: 'Applications open for our Summer 2026 internship program. Great opportunity for students and fresh graduates to gain industry experience.',
      positions: [
        'Software Development Intern',
        'Marketing Intern',
        'Customer Service Intern'
      ]
    },
    {
      id: 3,
      title: 'Remote Work Opportunities',
      subtitle: 'Work From Anywhere',
      date: 'January 2026',
      description: 'We offer flexible remote work options for select positions. Work from the comfort of your home while being part of our team.',
      positions: [
        'UI/UX Designer (Remote)',
        'Content Writer (Remote)',
        'Social Media Manager (Remote)'
      ]
    }
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
            Careers at TravelHub
          </h1>
          <p className="text-cyan-100 text-lg md:text-xl max-w-2xl mx-auto">
            Join our team and build your future in the travel industry
          </p>
        </div>
      </section>

      {/* Notice Board */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-cyan-900 mb-4">Job Opportunities</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Stay updated with the latest job openings and career opportunities at TravelHub
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {notices.map((notice) => (
              <div key={notice.id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="bg-cyan-900 px-6 py-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-white">{notice.title}</h3>
                    <p className="text-cyan-200 text-sm">{notice.subtitle}</p>
                  </div>
                  <div className="flex items-center gap-2 text-cyan-200 text-sm">
                    <FiCalendar size={16} />
                    {notice.date}
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">{notice.description}</p>
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-cyan-900 mb-2 flex items-center gap-2">
                      <FiBriefcase size={16} /> Open Positions:
                    </h4>
                    <ul className="grid md:grid-cols-2 gap-2">
                      {notice.positions.map((position, index) => (
                        <li key={index} className="text-gray-600 text-sm flex items-center gap-2">
                          <span className="w-2 h-2 bg-lime-500 rounded-full"></span>
                          {position}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button className="bg-lime-500 text-cyan-900 px-6 py-2 rounded-lg font-medium hover:bg-lime-400 transition-colors inline-flex items-center gap-2">
                    Apply Now <FiArrowRight />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-16 bg-cyan-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Join TravelHub?</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-lime-500 rounded-full flex items-center justify-center text-cyan-900 mx-auto mb-4">
                <FiUsers size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Great Team</h3>
              <p className="text-cyan-200 text-sm">Work with talented and passionate people</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-lime-500 rounded-full flex items-center justify-center text-cyan-900 mx-auto mb-4">
                <FiBriefcase size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Growth Opportunities</h3>
              <p className="text-cyan-200 text-sm">Clear career paths and learning opportunities</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-lime-500 rounded-full flex items-center justify-center text-cyan-900 mx-auto mb-4">
                <FiMapPin size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Great Location</h3>
              <p className="text-cyan-200 text-sm">Work in the heart of Kathmandu</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-cyan-900 mb-4">Interested in Joining Us?</h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Send your resume and we'll notify you when suitable positions open up.
          </p>
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="flex items-center gap-2 text-gray-700">
              <FiMail className="text-lime-500" />
              <span>careers@travelhub.com</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <FiPhone className="text-lime-500" />
              <span>+977 9800000000</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <FiMapPin className="text-lime-500" />
              <span>Kathmandu, Nepal</span>
            </div>
          </div>
          <a 
            href="mailto:careers@travelhub.com?subject=Job Application" 
            className="bg-lime-500 text-cyan-900 px-8 py-3 rounded-lg font-medium hover:bg-lime-400 transition-colors inline-flex items-center gap-2"
          >
            Send Your Resume <FiArrowRight />
          </a>
        </div>
      </section>
    </div>
  );
};

export default CareerPage;
