import Header from "./header";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <main className="py-5 container">{children}</main>
    </>
  );
};

export default Layout;
