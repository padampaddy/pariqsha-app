import { useHistory } from "react-router-dom";

const SubmitPage = () => {
    const history = useHistory();
  return (
    <div className="bg-gradient-to-tl from-red-100 to-blue-100 h-screen">
    <div className="text-center pt-48 ">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="md:h-1/5 md:w-1/5 h-1/4 w-1/4 text-center text-green-500 m-auto "
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
        <path
          fillRule="evenodd"
          d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clipRule="evenodd"
        />
      </svg>
      <p className="text-green-500 font-bold md:text-7xl text-5xl  mt-6">Thank You !</p>
      <p className="mt-4 md:text-xl font-semibold">Your test has been successfully submitted</p>
      <button onClick={()=>history.push("/home")} className="common-btn py-2 px-4 rounded-lg mt-6">Go To Dashboard</button>
      </div>
    </div>
  );
};

export default SubmitPage;
