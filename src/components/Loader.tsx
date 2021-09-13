const Loader = () => {
  return (
    <div className=" flex justify-center mt-4 items-center">
      <div
        className="loader ease-linear rounded-full border-4 border-t-4 border-gray-300 h-10 w-10"
        style={{ borderTopColor: "#3985db" }}
      ></div>
    </div>
  );
};

export default Loader;
