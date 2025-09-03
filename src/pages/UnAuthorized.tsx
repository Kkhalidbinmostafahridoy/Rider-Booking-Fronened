import { Link } from "react-router";

function UnAuthorized() {
  return (
    <div>
      <h1> You are not Authorized not Permitted to access account</h1>
      <Link to="/">Home</Link>
    </div>
  );
}

export default UnAuthorized;
