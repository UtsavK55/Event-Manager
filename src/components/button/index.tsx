const Button = ({ title, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className=" text-xl cursor-pointer rounded-sm hover:text-gray-500 mt-2 px-1 "
    >
      {title}
    </button>
  );
};
export default Button;
