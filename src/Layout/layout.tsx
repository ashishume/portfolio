import Navbar from "../Components/Navbar";

const Layout = ({ children }: any) => {
  return (
    <div style={{}}>
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
