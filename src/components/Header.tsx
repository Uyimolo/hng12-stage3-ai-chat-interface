import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { Dispatch, SetStateAction } from "react";
import useTheme from "@/hooks/useTheme";
import { FaMoon, FaSun } from "react-icons/fa6";
import Paragraph from "./Paragraph";

const Header = ({
  setShowSidebar,
}: {
  setShowSidebar: Dispatch<SetStateAction<boolean>>;
}) => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="dark:bg-darkbackground absolute left-1/2 top-0 flex w-full -translate-x-1/2 items-center justify-between border-b bg-lightBackground px-4 py-2 lg:px-12">
      {/* logo */}
      <div className="flex items-center gap-4">
        <button
          className="grid aspect-square w-6 cursor-pointer place-content-center rounded-sm bg-lightergray transition duration-300 hover:bg-lightergray lg:hidden lg:w-12 lg:rounded-xl"
          onClick={() => setShowSidebar(true)}
        >
          <HiOutlineMenuAlt2 className="text-lightgray text-xl" />
        </button>

        <Paragraph className="text-xl font-semibold lg:text-2xl">
          Linguify
        </Paragraph>
      </div>

      {/* action */}
      {/* <Button variant="secondary">Clear chat</Button> */}
      <div className="" onClick={toggleTheme}>
        {/* theme toggle */}
        {theme === "dark" ? (
          <button>
            <FaSun className="text-xl" />
          </button>
        ) : (
          <button>
            <FaMoon className="dark:text-primaryText text-xl" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
