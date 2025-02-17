import Button from "./Button";

const Header = () => {
  return (
    <div className='flex border-b items-center justify-between pb-2'>
      {/* logo */}
      <p className='text-xl lg:text-2xl  font-semibold text-blue'>LINGuify</p>
          {/* action */}
          <Button variant="secondary">Clear chat</Button>
    </div>
  );
};

export default Header;
