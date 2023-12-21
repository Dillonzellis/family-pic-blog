import MaxWidthWrapper from "./MaxWidthWrapper";

const Navbar = () => {
  return (
    <nav>
      <MaxWidthWrapper>
        <div className="py-8">Hello User</div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
