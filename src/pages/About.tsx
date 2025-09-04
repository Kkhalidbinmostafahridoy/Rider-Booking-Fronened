/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FaUsers,
  FaMapMarkedAlt,
  FaChartLine,
  FaMotorcycle,
  FaCar,
  FaBicycle,
  FaTruck,
  FaStar,
} from "react-icons/fa";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function About() {
  const participants = [
    {
      name: "Rider 1",
      vehicle: "Motorcycle",
      type: "RIDER",
      lat: 23.8103,
      lng: 90.4125,
    },
    {
      name: "Rider 2",
      vehicle: "Car",
      type: "RIDER",
      lat: 23.815,
      lng: 90.425,
    },
    {
      name: "Driver 1",
      vehicle: "Bicycle",
      type: "DRIVER",
      lat: 23.82,
      lng: 90.43,
    },
    {
      name: "Driver 2",
      vehicle: "Scooter",
      type: "DRIVER",
      lat: 23.822,
      lng: 90.435,
    },
    {
      name: "Rider 3",
      vehicle: "Truck",
      type: "RIDER",
      lat: 23.825,
      lng: 90.44,
    },
  ];

  const services = [
    {
      title: "Ride-Hailing",
      desc: "Book rides quickly for short or long distances.",
    },
    {
      title: "Delivery Service",
      desc: "Send packages efficiently using our rider network.",
    },
    {
      title: "Logistics Management",
      desc: "Track fleet and deliveries in real-time.",
    },
    { title: "Courier Service", desc: "Fast and secure courier deliveries." },
    {
      title: "Premium Rides",
      desc: "Luxury and VIP ride options for special trips.",
    },
  ];

  const reviews = [
    {
      user: "John Doe",
      comment: "Excellent service, very reliable!",
      rating: 5,
    },
    {
      user: "Jane Smith",
      comment: "Riders are professional and punctual.",
      rating: 4,
    },
    {
      user: "Mike Johnson",
      comment: "Easy to use and well organized platform.",
      rating: 5,
    },
    {
      user: "Alice Brown",
      comment: "Loved the premium ride option!",
      rating: 5,
    },
    {
      user: "Bob Williams",
      comment: "Delivery was fast and accurate.",
      rating: 4,
    },
  ];

  const vehicleIcons: Record<string, any> = {
    Motorcycle: FaMotorcycle,
    Car: FaCar,
    Bicycle: FaBicycle,
    Truck: FaTruck,
  };

  return (
    <div className="font-sans bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-28 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
          Rider & Driver Management System
        </h1>
        <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 drop-shadow-md">
          Manage riders, drivers, vehicles, and trips efficiently with live
          tracking, analytics, and real-time performance insights.
        </p>
        <a
          href="/register"
          className="inline-block bg-white text-indigo-600 font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 hover:scale-105"
        >
          Get Started
        </a>
      </section>

      {/* Features Section */}
      <section className="py-28 container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-16 text-indigo-700">
          Powerful Features
        </h2>
        <div className="grid md:grid-cols-3 gap-12 text-muted">
          {[
            {
              icon: FaUsers,
              title: "Rider & Driver Management",
              desc: "Verify riders and drivers, manage KYC documents quickly.",
            },
            {
              icon: FaMapMarkedAlt,
              title: "Live Trip Tracking",
              desc: "Monitor trips, optimize routes, and track performance.",
            },
            {
              icon: FaChartLine,
              title: "Analytics",
              desc: "Analyze fleet and rider performance with detailed reports.",
            },
          ].map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="bg-blend-soft-light p-10 rounded-3xl shadow-xl transform hover:-translate-y-4 hover:scale-105 transition-all border-t-4 border-indigo-500"
              >
                <Icon className="text-indigo-500 text-5xl mb-6 mx-auto" />
                <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-700">{feature.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Services Section */}
      <section className="py-28 container mx-auto px-6 text-center bg-gradient-to-b from-purple-50 to-white">
        <h2 className="text-4xl font-bold mb-16 text-purple-700">
          Our Services
        </h2>
        <div className="grid md:grid-cols-3 gap-12">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="bg-muted-foreground p-8 rounded-3xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-4 hover:scale-105 border-t-4 border-purple-500"
            >
              <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
              <p className="text-gray-700">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Vehicle Types Section */}
      <section className="py-28 text-center">
        <h2 className="text-4xl font-bold mb-12 text-indigo-600">
          Supported Vehicle Types
        </h2>
        <div className="grid md:grid-cols-3 gap-12 container mx-auto px-6">
          {Object.entries(vehicleIcons).map(([vehicle, Icon], idx) => (
            <div
              key={idx}
              className="bg-muted-foreground p-8 rounded-3xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-4 hover:scale-105 border-t-4 border-indigo-400"
            >
              <Icon className="text-indigo-500 text-5xl mb-4 mx-auto" />
              <h3 className="text-2xl font-bold mb-2">{vehicle}</h3>
              <p className="text-gray-700">
                Efficiently managed for trips, tracking, and assignments.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Riders & Drivers Live Map */}
      <section className="py-28 container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-12 text-indigo-700">
          Live Riders & Drivers Map
        </h2>
        <div className="h-96 w-full rounded-3xl overflow-hidden shadow-xl border-4 border-indigo-500">
          <MapContainer
            center={[23.8103, 90.4125]}
            zoom={13}
            scrollWheelZoom={true}
            className="h-full w-full"
          >
            <TileLayer
              attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {participants.map((p, idx) => {
              const Icon = vehicleIcons[p.vehicle] || FaMotorcycle;
              return (
                <Marker key={idx} position={[p.lat, p.lng]}>
                  <Popup>
                    <div className="flex items-center gap-2">
                      <Icon className="text-indigo-500" /> {p.name} -{" "}
                      {p.vehicle} ({p.type})
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </div>
      </section>

      {/* Ratings & Reviews */}
      <section className="py-28 bg-gradient-to-b from-indigo-50 to-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-12 text-indigo-700">
            Ratings & Reviews
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            {reviews.map((review, idx) => (
              <div
                key={idx}
                className="bg-muted p-8 rounded-3xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-4 hover:scale-105 border-t-4 border-indigo-500"
              >
                <h3 className="text-2xl font-bold mb-2">{review.user}</h3>
                <div className="flex justify-center gap-1 text-yellow-400 mb-4">
                  {Array(review.rating)
                    .fill(0)
                    .map((_, i) => (
                      <FaStar key={i} />
                    ))}
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
