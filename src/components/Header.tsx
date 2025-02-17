import Button from "./Button";

const Header = () => {
  return (
    <div className='flex fixed w-full bg-white top-0 px-4 lg:px-12 left-1/2 -translate-x-1/2 border-b items-center justify-between py-2'>
      {/* logo */}
      <p className='text-xl lg:text-2xl  font-semibold text-blue border-b-4 border-blue'>LINGuify</p>
          {/* action */}
          <Button variant="secondary">Clear chat</Button>
    </div>
  );
};

export default Header;
