import Team1 from "@/assets/images/profile1.jpg";
import Team2 from "@/assets/images/profilejpg-removebg-preview.png";
import Team3 from "@/assets/images/profile2-removebg-preview.png";

const About = () => {
  return (
    <div className="font-sans bg-muted-foreground text-gray-900">
      {/* Hero Section
      <section className="relative h-[400px] md:h-[500px] flex items-center justify-center text-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
        <div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            About RiderShare
          </h1>
          <p className="text-lg md:text-2xl max-w-2xl mx-auto">
            Making daily commutes affordable, eco-friendly, and convenient by
            connecting riders and drivers.
          </p>
        </div>
      </section> */}

      {/* About Us Section */}
      <section className="py-20 container mx-auto px-6 text-center md:text-left">
        <h2 className="text-4xl text-center font-bold mb-8 text-indigo-700">
          About Us
        </h2>
        <div className="mx-72">
          <p className="text-lg text-center md:text-xl max-w-4xl mx-auto md:mx-0 text-muted leading-relaxed mb-6">
            <span className="text-red-500">AFM RiDeR sYsTeM LTd...</span> is a
            premier mobility and logistics platform that seamlessly integrates
            ride-hailing, delivery, courier, and premium transport services. Our
            platform is built with the goal of simplifying the lives of our
            users while providing drivers and riders with cutting-edge tools to
            optimize efficiency, ensure safety, and maximize earnings. Whether
            it’s a daily commute, urgent delivery, or a luxury ride, our system
            guarantees a smooth, reliable, and transparent experience every
            time.
          </p>
          <p className="text-lg md:text-xl max-w-4xl mx-auto md:mx-0 text-muted leading-relaxed mb-6">
            Leveraging real-time analytics, live tracking, and intelligent route
            optimization,{" "}
            <span className="text-emerald-500">AFM RiDeR sYsTeM LTd...</span>{" "}
            empowers users to monitor their trips, track packages, and stay
            informed at every stage. Our advanced dashboards allow drivers and
            riders to efficiently manage schedules, monitor performance metrics,
            and maintain top-notch service quality. We prioritize safety and
            reliability, ensuring that each ride or delivery adheres to the
            highest standards. With an unwavering commitment to customer
            satisfaction, innovative technology, and continuous improvement, we
            strive to redefine the mobility and logistics experience across all
            sectors.
          </p>
          <p className="text-lg md:text-xl max-w-4xl mx-auto md:mx-0 text-muted leading-relaxed">
            At <span className="text-cyan-300">AFM RiDeR sYsTeM LTd...</span>,
            we value transparency, accountability, and professionalism. Our team
            works tirelessly to provide timely support, maintain vehicle and
            rider quality, and implement features that enhance convenience and
            usability. From individual riders to businesses managing large-scale
            deliveries, our platform is designed to be versatile, scalable, and
            adaptive to evolving mobility needs. By combining technology,
            expertise, and a customer-centric approach, we aim to become the
            most trusted and innovative solution in the ride-hailing and
            logistics industry.
          </p>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-gradient-to-b from-indigo-50 to-white">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-bold mb-4 text-indigo-600">
              Our Mission
            </h3>
            <p className="text-gray-700 leading-relaxed">
              To provide a reliable, safe, and user-friendly platform for
              ride-hailing, delivery, and logistics services while empowering
              drivers with advanced tools for efficiency and earnings.
            </p>
          </div>
          <div>
            <h3 className="text-3xl font-bold mb-4 text-indigo-600">
              Our Vision
            </h3>
            <p className="text-gray-700 leading-relaxed">
              To become the most trusted and innovative mobility and delivery
              platform, ensuring seamless experiences for users and sustainable
              opportunities for drivers and riders.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-12 text-indigo-700">
          Our Core Values
        </h2>
        <div className="grid md:grid-cols-3 gap-12">
          {[
            {
              title: "Safety",
              desc: "Ensuring secure and reliable rides for all users.",
            },
            {
              title: "Efficiency",
              desc: "Optimizing trips and deliveries for time and fuel.",
            },
            {
              title: "Innovation",
              desc: "Continuously improving with technology and analytics.",
            },
          ].map((value, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-2xl transition transform hover:-translate-y-2 hover:scale-105"
            >
              <h3 className="text-2xl font-bold mb-4 text-indigo-600">
                {value.title}
              </h3>
              <p className="text-gray-700">{value.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-6 md:px-20 bg-white">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-10">
          <div className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3">Sign Up</h3>
            <p>Create an account as a rider or driver quickly and securely.</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3">Book or Offer a Ride</h3>
            <p>Request a ride or offer a seat to others along your route.</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3">Share & Rate</h3>
            <p>
              Complete your trip, share costs, and rate your experience for
              safety and trust.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-12 text-indigo-700">
          Meet Our Team
        </h2>
        <div className="grid md:grid-cols-3 gap-12">
          {[
            { img: Team1, name: "AFM Arnob", role: "Founder & CEO" },
            { img: Team2, name: "Nilima Rahman", role: "Head of Operations" },
            { img: Team3, name: "Oishee Jaman", role: "Lead Developer" },
          ].map((member, idx) => (
            <div
              key={idx}
              className="bg-indigo-500 rounded-3xl shadow-lg p-8 hover:shadow-2xl transition transform hover:-translate-y-2 hover:scale-105"
            >
              <img
                src={member.img}
                alt={member.name}
                className="w-40 h-40 object-cover rounded-full mx-auto mb-4"
              />
              <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
              <p className="text-muted-foreground">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-6 md:px-20 bg-white">
        <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
        <div className="grid md:grid-cols-3 gap-10 text-center">
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-3">Safety</h3>
            <p>Ensuring every ride is secure for both riders and drivers.</p>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-3">Convenience</h3>
            <p>Easy booking, flexible schedules, and real-time tracking.</p>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-3">Eco-Friendly</h3>
            <p>Reducing traffic and pollution through shared rides.</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-6 md:px-20 bg-gray-50 text-center">
        <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
        <p className="mb-3">Email: support@afmRider.com</p>
        <p>
          Follow us on GitHub:
          <span className="ml-2 font-semibold text-blue-500">
            https://github.com/Kkhalidbinmostafahridoy
          </span>
        </p>
      </section>
    </div>
  );
};

export default About;
