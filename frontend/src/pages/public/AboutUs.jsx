import { FiMapPin, FiPhone, FiMail, FiAward, FiUsers, FiHeart, FiTarget, FiGlobe, FiShield, FiStar } from 'react-icons/fi';

const AboutUs = () => {
  const stats = [
    { number: '10+', label: 'Years Experience', icon: <FiAward size={24} /> },
    { number: '50K+', label: 'Happy Travelers', icon: <FiUsers size={24} /> },
    { number: '200+', label: 'Destinations', icon: <FiGlobe size={24} /> },
    { number: '24/7', label: 'Support', icon: <FiShield size={24} /> },
  ];

  const values = [
    {
      icon: <FiHeart size={24} />,
      title: 'Customer First',
      description: 'We prioritize our customers needs above everything else, ensuring personalized experiences that exceed expectations.'
    },
    {
      icon: <FiShield size={24} />,
      title: 'Trust & Safety',
      description: 'Your safety is our top priority. We partner with verified providers and maintain strict quality standards.'
    },
    {
      icon: <FiTarget size={24} />,
      title: 'Innovation',
      description: 'We continuously innovate to make travel planning easier, faster, and more enjoyable for everyone.'
    },
    {
      icon: <FiGlobe size={24} />,
      title: 'Sustainability',
      description: 'We promote responsible travel practices and work towards sustainable tourism initiatives.'
    }
  ];

  const team = [
    {
      name: 'Raj Kumar',
      role: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400',
      bio: 'Visionary leader with 15+ years in travel industry'
    },
    {
      name: 'Sarah Johnson',
      role: 'Head of Operations',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
      bio: 'Expert in travel logistics and customer experience'
    },
    {
      name: 'Mike Chen',
      role: 'Head of Technology',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
      bio: 'Building seamless digital travel experiences'
    },
    {
      name: 'Emily Davis',
      role: 'Head of Marketing',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400',
      bio: 'Connecting travelers with their dream destinations'
    }
  ];

  const partners = [
    'Kathmandu Metropolitan', 'Nepal Tourism Board', 'International Air Transport Association', 
    'World Travel Awards', 'Pacific Asia Travel Association', 'Sustainable Travel International'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-700/80 to-cyan-900/60 z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920"
            alt="About TravelHub" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-20 w-full max-w-4xl px-4 text-center">
          <h1 className="text-white text-4xl md:text-5xl font-black mb-4">
            About TravelHub
          </h1>
          <p className="text-cyan-100 text-lg md:text-xl max-w-2xl mx-auto">
            Your trusted partner in creating unforgettable travel experiences since 2015
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white shadow-md -mt-10 relative z-30 mx-4 md:mx-8 rounded-2xl">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-lime-500 rounded-full flex items-center justify-center text-cyan-900 mx-auto mb-4">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-cyan-900 mb-1">{stat.number}</div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-cyan-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Founded in 2015, TravelHub began with a simple mission: to make travel planning accessible, 
                  enjoyable, and stress-free for everyone. What started as a small team passionate about 
                  exploration has grown into one of Nepal's leading online travel platforms.
                </p>
                <p>
                  Today, we connect millions of travelers with flights, hotels, vacation packages, and vehicle 
                  rentals across the globe. Our commitment to excellent service, competitive prices, and 
                  innovative technology has made us a trusted name in the travel industry.
                </p>
                <p>
                  We believe that travel has the power to transform lives, create lasting memories, and 
                  bridge cultures. Every journey booked through TravelHub is a step towards making the 
                  world a smaller, more connected place.
                </p>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=600"
                alt="Our Journey"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-lime-500 text-cyan-900 p-6 rounded-xl shadow-lg">
                <div className="text-3xl font-bold">2015</div>
                <div className="text-sm font-medium">Founded</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-20 bg-cyan-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-cyan-200 max-w-2xl mx-auto">
              These core values guide everything we do and shape how we serve our customers
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-cyan-800 p-8 rounded-2xl text-center hover:bg-cyan-700 transition-colors">
                <div className="w-16 h-16 bg-lime-500 rounded-full flex items-center justify-center text-cyan-900 mx-auto mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-cyan-200 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-cyan-900 mb-4">Meet Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The passionate people behind TravelHub who work tirelessly to make your travel dreams a reality
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <img 
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-cyan-900 mb-1">{member.name}</h3>
                  <p className="text-lime-600 font-medium text-sm mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-cyan-900 mb-4">Why Choose TravelHub</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're committed to providing you with the best travel experience possible
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Best Price Guarantee', desc: 'Find a lower price? We\'ll match it and refund the difference.', icon: <FiStar /> },
              { title: 'Instant Booking', desc: 'Book your flights, hotels, and more in just a few clicks.', icon: <FiMapPin /> },
              { title: 'Secure Payments', desc: 'Your payment information is always safe with us.', icon: <FiShield /> },
            ].map((item, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-md">
                <div className="w-12 h-12 bg-lime-500 rounded-lg flex items-center justify-center text-cyan-900 mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-cyan-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-cyan-900 mb-4">Our Partners</h2>
            <p className="text-gray-600">Trusted by leading organizations worldwide</p>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            {partners.map((partner, index) => (
              <div key={index} className="px-8 py-4 bg-gray-100 rounded-lg text-gray-700 font-medium hover:bg-cyan-50 transition-colors cursor-pointer">
                {partner}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-20 bg-gradient-to-r from-cyan-700 to-cyan-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Your Journey?</h2>
          <p className="text-cyan-200 mb-8 max-w-2xl mx-auto">
            Get in touch with us today and let us help you plan your next adventure
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="flex items-center gap-2 text-white">
              <FiPhone className="text-lime-400" />
              <span>+977 9800000000</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <FiMail className="text-lime-400" />
              <span>support@travelhub.com</span>
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

export default AboutUs;
