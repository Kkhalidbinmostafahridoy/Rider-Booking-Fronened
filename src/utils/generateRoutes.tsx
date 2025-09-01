import { Route } from "react-router";

function generateRoutes() {
  return (
    <>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
    </>
  );
}

export default generateRoutes;
