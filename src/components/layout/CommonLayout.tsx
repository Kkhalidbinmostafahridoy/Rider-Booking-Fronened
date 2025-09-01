import type { JSX, ReactNode } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

interface IProps {
  children: ReactNode;
}

function CommonLayout({ children }: IProps): JSX.Element {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="grow-1">{children}</div>
      <Footer />
    </div>
  );
}

export default CommonLayout;
