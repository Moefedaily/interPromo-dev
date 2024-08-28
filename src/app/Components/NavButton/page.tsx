interface NavButtonPropos {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}
const NavButton = ({ onClick, children, className = "" }: NavButtonPropos) => (
  <button
    onClick={onClick}
    className={`text-custom-pink font-semibold py-3 px-4 rounded transition duration-300 ease-in-out ${className}`}
  >
    {children}
  </button>
);

export default NavButton;
