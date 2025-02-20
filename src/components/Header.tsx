import { HiOutlineMenuAlt2 } from "react-icons/hi";
import Button from "./Button";
import { Dispatch, SetStateAction } from "react";

const Header = ({
  setShowSidebar,
}: {
  setShowSidebar: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div className="absolute left-1/2 top-0 flex w-full -translate-x-1/2 items-center justify-between border-b bg-white px-4 py-2 lg:px-12">
      {/* logo */}
      <div className="flex items-center gap-4">
        <HiOutlineMenuAlt2
          className="text-lightgray lg:hidden"
          onClick={() => setShowSidebar((prev) => true)}
        />
        <p className="border-b-4 border-blue text-xl font-semibold text-blue lg:text-2xl">
          LINGuify
        </p>
      </div>

      {/* action */}
      <Button variant="secondary">Clear chat</Button>
    </div>
  );
};

export default Header;
