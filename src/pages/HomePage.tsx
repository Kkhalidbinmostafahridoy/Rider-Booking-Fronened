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
  FaRoute,
} from "react-icons/fa";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Link } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import RideHilling from "@/assets/images/Ride-Hailing.jpg";
import DriverService from "@/assets/images/Delivery Service.jpg";
import LogisticsImg from "@/assets/images/LogisticsImg.jpg";
import CourierImg from "@/assets/images/CourierImg.jpg";
import PremiumImg from "@/assets/images/PremiumImg.png";
import userDashboard from "@/assets/images/userdashboard.png";
import RiderDashboard from "@/assets/images/rider.png";
import driverDashboard from "@/assets/images/driver.png";
import banner from "@/assets/images/banner.jpg";

function HomePage() {
  // Services
  const services = [
    {
      title: "Ride-Hailing",
      desc: "Book rides quickly for short or long distances.",
      img: RideHilling,
    },
    {
      title: "Delivery Service",
      desc: "Send packages efficiently using our rider network.",
      img: DriverService,
    },
    {
      title: "Logistics Management",
      desc: "Track fleet and deliveries in real-time.",
      img: LogisticsImg,
    },
    {
      title: "Courier Service",
      desc: "Fast and secure courier deliveries.",
      img: CourierImg,
    },
    {
      title: "Premium Rides",
      desc: "Luxury and VIP ride options for special trips.",
      img: PremiumImg,
    },
  ];

  // Features
  const features = [
    {
      icon: FaUsers,
      title: "Rider & Driver Management",
      desc: "Manage KYC, assign rides, and verify profiles.",
    },
    {
      icon: FaMapMarkedAlt,
      title: "Live Trip Tracking",
      desc: "Track routes, monitor rides, and optimize performance.",
    },
    {
      icon: FaChartLine,
      title: "Analytics Dashboard",
      desc: "Detailed insights for riders, drivers, and services.",
    },
    {
      icon: FaRoute,
      title: "Route Optimization",
      desc: "Optimize trips and save fuel with smart routes.",
    },
  ];

  // Vehicles
  const vehicles = [
    { type: "Motorcycle", icon: FaMotorcycle },
    { type: "Car", icon: FaCar },
    { type: "Bicycle", icon: FaBicycle },
    { type: "Truck", icon: FaTruck },
  ];

  // Reviews
  const reviews = [
    {
      user: "Fredous",
      comment:
        "The service exceeded all my expectations—every ride was smooth, punctual, and the riders demonstrated exceptional professionalism. Truly a trustworthy experience!",
      rating: 5,
    },
    {
      user: "Israt Jahan",
      comment:
        "From start to finish, the service was seamless. The riders are courteous, the app is intuitive, and I felt completely confident during every journey. Highly recommend!",
      rating: 5,
    },
    {
      user: "Nilima Rahman",
      comment:
        "An outstanding service that combines efficiency with safety. Every trip felt comfortable and stress-free, and the attention to detail was remarkable!",
      rating: 5,
    },
    {
      user: "Oishee Jaman",
      comment:
        "Exceptional service with a team that truly cares about customer satisfaction. The dashboard is user-friendly, booking is effortless, and every ride felt secure and reliable.",
      rating: 5,
    },
    {
      user: "Warisul Islam",
      comment:
        "The platform is powerful and extremely intuitive, allowing me to manage rides effortlessly. The analytics and tracking features are particularly impressive for regular users.",
      rating: 4,
    },
    {
      user: "Imrul Hasan",
      comment:
        "Loved the premium ride options! The vehicles are top-notch, the service is consistently reliable, and the overall experience feels luxurious without being overpriced.",
      rating: 5,
    },
  ];

  // Map participants (riders and drivers)
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
      vehicle: "Truck",
      type: "DRIVER",
      lat: 23.822,
      lng: 90.435,
    },
    {
      name: "Rider 3",
      vehicle: "Motorcycle",
      type: "RIDER",
      lat: 23.825,
      lng: 90.44,
    },
  ];

  // Vehicle icons for map
  const vehicleIcons: Record<string, any> = {
    Motorcycle: FaMotorcycle,
    Car: FaCar,
    Bicycle: FaBicycle,
    Truck: FaTruck,
  };

  return (
    <div className="font-sans bg-gradient-to-b from-gray-100 to-gray-50 text-gray-900">
      {/* Hero Section */}
      <section
        className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-28 text-center"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
          Welcome to AFM RiDeR sYsTeM LTd..
        </h1>
        <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 drop-shadow-md">
          Manage riders, drivers, vehicles, trips, and services efficiently with
          dashboards, analytics, and real-time tracking.
        </p>
        <Link
          to="/register"
          className="inline-block bg-white text-indigo-600 font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 hover:scale-105"
        >
          Get Started
        </Link>
      </section>

      {/* Features + Live Map */}
      <section className="py-28 container mx-auto px-6">
        <h2 className="text-4xl font-bold mb-12 text-indigo-700 text-center">
          Features & Live Map
        </h2>
        <div className="flex flex-col md:flex-row gap-12">
          {/* Left Column: Features */}
          <div className="flex-1 space-y-8">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 hover:scale-105 border-l-4 border-indigo-500 flex items-center gap-4"
                >
                  <Icon className="text-indigo-500 text-4xl" />
                  <div>
                    <h3 className="text-2xl font-bold">{feature.title}</h3>
                    <p className="text-gray-700">{feature.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Live Map */}
          <div className="flex-1 h-[500px] rounded-3xl overflow-hidden shadow-xl">
            <MapContainer
              center={[23.8103, 90.4125]}
              zoom={13}
              scrollWheelZoom
              className="h-full w-full"
            >
              <TileLayer
                attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {participants.map((p, idx) => {
                const VehicleIcon = vehicleIcons[p.vehicle] || FaMotorcycle;
                return (
                  <Marker key={idx} position={[p.lat, p.lng]}>
                    <Popup>
                      <div className="flex items-center gap-2">
                        <VehicleIcon className="text-cyan-500" /> {p.name} -{" "}
                        {p.vehicle} ({p.type})
                      </div>
                    </Popup>
                  </Marker>
                );
              })}
            </MapContainer>
          </div>
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
              className="bg-white text-gray-800 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-4 hover:scale-105 border-t-4 border-purple-500"
            >
              <img
                src={service.img}
                alt={service.title}
                className="w-[400px] h-72 object-cover  rounded-2xl mb-4"
              />
              <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
              <p>{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Vehicle Types Section */}
      <section className="py-28 text-center">
        <h2 className="text-4xl font-bold mb-12 text-indigo-600">
          Supported Vehicle Types
        </h2>
        <div className="grid md:grid-cols-4 gap-12 container mx-auto px-6">
          {vehicles.map((vehicle, idx) => (
            <div
              key={idx}
              className="bg-white text-gray-800 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-4 hover:scale-105 border-t-4 border-indigo-400"
            >
              <vehicle.icon className="text-indigo-500 text-5xl mb-4 mx-auto" />
              <h3 className="text-2xl font-bold mb-2">{vehicle.type}</h3>
              <p>Efficiently managed for trips, tracking, and assignments.</p>
            </div>
          ))}
        </div>
      </section>

      {/* User Dashboards Section */}
      <section className="py-28 container mx-auto px-6 text-center bg-gradient-to-b from-indigo-50 to-white">
        <h2 className="text-4xl font-bold mb-12 text-indigo-700">
          User, Rider & Driver Dashboards
        </h2>
        <div className="grid md:grid-cols-3 gap-12">
          <div className="bg-white text-gray-800 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-4 hover:scale-105 border-t-4 border-indigo-500">
            <h3 className="text-2xl font-bold mb-4">User Dashboard</h3>
            <p className="mb-4">
              Book rides, track deliveries, view past trips, and leave ratings.
            </p>
            <img
              src={userDashboard}
              alt="User Dashboard"
              className="rounded-2xl h-48 w-full object-cover"
            />
          </div>
          <div className="bg-white text-gray-800 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-4 hover:scale-105 border-t-4 border-indigo-500">
            <h3 className="text-2xl font-bold mb-4">Rider Dashboard</h3>
            <p className="mb-4">
              Manage rides, view earnings, update availability, and track
              assignments.
            </p>
            <img
              src={RiderDashboard}
              alt="Rider Dashboard"
              className="rounded-2xl h-48 w-full object-cover"
            />
          </div>
          <div className="bg-white text-gray-800 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-4 hover:scale-105 border-t-4 border-indigo-500">
            <h3 className="text-2xl font-bold mb-4">Driver Dashboard</h3>
            <p className="mb-4">
              View active trips, earnings, performance stats, and ratings from
              users.
            </p>
            <img
              src={driverDashboard}
              alt="Driver Dashboard"
              className="rounded-2xl h-48 w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Ratings & Reviews Section */}
      <section className="py-28 bg-gradient-to-b from-indigo-50 to-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-12 text-indigo-700">
            Ratings & Reviews
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            {reviews.map((review, idx) => (
              <div
                key={idx}
                className="bg-white text-gray-800 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-4 hover:scale-105 border-t-4 border-indigo-500"
              >
                <h3 className="text-2xl font-bold mb-2">{review.user}</h3>
                <div className="flex justify-center gap-1 text-yellow-400 mb-4">
                  {Array(review.rating)
                    .fill(0)
                    .map((_, i) => (
                      <FaStar key={i} />
                    ))}
                </div>
                <p>{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
