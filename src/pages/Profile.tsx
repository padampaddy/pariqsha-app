import BaseLayout from "../layouts/Base";

function Profile() {
  return (
    <BaseLayout title="Profile">
    <div className="md:m-4">
      <div
        className="md:p-6 p-4 bg-white mx-auto md:w-1/2 border border-t-4"
        style={{ borderTopColor: "#00CBE4" }}
      >
        <div className="profile-header flex justify-between items-center pb-4">
          <div className="">
            <img
              className="inline object-cover w-16 h-16 mr-2 rounded-full"
              src="https://images.pexels.com/photos/2589653/pexels-photo-2589653.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
              alt=""
            />
            <span className="text-black md:text-xl  text-md font-medium">
              Edit Profile
            </span>
          </div>
          <div className="">
            <a
              href=""
              className="common-btn px-4 py-2 text-white hover:bg-opacity-90 md:text-xl text-sm"
            >
              Save Changes
            </a>
          </div>
        </div>
        <hr></hr>
        <div className="profile-body">
          <h4 className=" md:text-lg py-4 flex items-center text-gray-600 text-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
            Account Information
          </h4>
          <form>
            <div className="md:flex md:flex-wrap">
              <div className="w-full md:w-1/3  px-2 mb-4">
                <label className="text-sm" htmlFor="">
                  Title
                </label>
                <div className="relative">
                  <select
                    className=" appearance-none w-full border  p-2 bg-white  leading-tight  focus:outline-none focus:bg-white focus:border-gray-500 text-sm text-gray-500"
                    id=""
                  >
                    <option>Select</option>
                    <option>Mr</option>
                    <option>Miss</option>
                    <option>Mrs</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="mb-4 md:w-1/3 px-2">
                <label className=" text-sm" htmlFor="">
                  First Name
                </label>
                <input
                  className="w-full border p-2 md:text-md+ text-sm"
                  autoComplete=""
                  type="text"
                  placeholder="First Name"
                />
              </div>
              <div className="mb-4 md:w-1/3 px-2">
                <label className=" text-sm" htmlFor="">
                  Last Name
                </label>
                <input
                  className="w-full border p-2  text-sm"
                  autoComplete=""
                  type="text"
                  placeholder="Last Name"
                />
              </div>
            </div>
            <hr></hr>
            <h4 className=" md:text-lg py-4 flex items-center text-gray-600 text-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
              </svg>
              Grades
            </h4>
            <div className="">
              <label className=" text-sm" htmlFor="">
                Select the grades you teach
              </label>
              <div className="flex flex-wrap mb-4">
                <button className="flex border w-10 h-8 justify-center items-center text-sm bg-gray-200 m-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 hidden"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  KG
                </button>
                <button className="flex border w-10 h-8 justify-center items-center text-sm bg-gray-200 m-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 hidden"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  1st
                </button>
                <button className="flex border w-10 h-8 justify-center items-center text-sm bg-gray-200 m-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 hidden"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  2nd
                </button>
                <button className="flex border w-10 h-8 justify-center items-center text-sm bg-gray-200 m-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 hidden"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  3rd
                </button>
                <button className="flex border w-10 h-8 justify-center items-center text-sm bg-gray-200 m-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 hidden"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  4th
                </button>
                <button className="flex border w-10 h-8 justify-center items-center text-sm bg-gray-200 m-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 hidden"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  5th
                </button>
                <button className="flex border w-10 h-8 justify-center items-center text-sm bg-gray-200 m-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 hidden"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  6th
                </button>
                <button className="flex border w-10 h-8 justify-center items-center text-sm bg-gray-200 m-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 hidden"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  7th
                </button>
                <button className="flex border w-10 h-8 justify-center items-center text-sm bg-gray-200 m-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 hidden"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  8th
                </button>
                <button className="flex border w-10 h-8 justify-center items-center text-sm bg-gray-200 m-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 hidden"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  9th
                </button>
                <button className="flex border w-10 h-8 justify-center items-center text-sm bg-gray-200 m-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 hidden"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  10th
                </button>
                <button className="flex border w-10 h-8 justify-center items-center text-sm bg-gray-200 m-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 hidden"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  11th
                </button>
                <button className="flex border w-10 h-8 justify-center items-center text-sm bg-gray-200 m-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 hidden"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  12th
                </button>
                <button className="flex border w-auto h-8 justify-center items-center text-sm bg-gray-200 m-1 px-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 hidden"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  University
                </button>
                <button className="flex border w-auto h-8 justify-center items-center text-sm bg-gray-200 m-1 px-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 hidden"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Professional Development
                </button>
              </div>
              <hr></hr>
             
              <h4 className=" md:text-lg py-4 flex items-center text-gray-600 text-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                </svg>
                Subjects
              </h4>
              <div className="">
                <label className=" text-sm" htmlFor="">
                  Select subjects
                </label>
                <div className="flex flex-wrap pb-4">
                  <button className="flex border w-auto h-8 justify-center items-center text-sm bg-gray-200 m-1 px-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 hidden"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Geography
                  </button>
                  <button className="flex border w-auto h-8 justify-center items-center text-sm bg-gray-200 m-1 px-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 hidden"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    English
                  </button>
                  <button className="flex border w-auto h-8 justify-center items-center text-sm bg-gray-200 m-1 px-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 hidden"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    History
                  </button>
                  <button className="flex border w-auto h-8 justify-center items-center text-sm bg-gray-200 m-1 px-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 hidden"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Physics
                  </button>
                  <button className="flex border w-auto h-8 justify-center items-center text-sm bg-gray-200 m-1 px-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 hidden"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Biology
                  </button>
                  <button className="flex border w-auto h-8 justify-center items-center text-sm bg-gray-200 m-1 px-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 hidden"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Chemistry
                  </button>
                  <button className="flex border w-auto h-8 justify-center items-center text-sm bg-gray-200 m-1 px-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 hidden"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    World Language
                  </button>
                  <button className="flex border w-auto h-8 justify-center items-center text-sm bg-gray-200 m-1 px-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 hidden"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Mathematics
                  </button>
                  <button className="flex border w-auto h-8 justify-center items-center text-sm bg-gray-200 m-1 px-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 hidden"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Chemistry
                  </button>
                </div>
                <hr></hr>
                <div className="flex md:justify-end justify-center pt-4">
                  <button
                    className="border py-2 px-10 mr-4 "
                    style={{ borderColor: "#00CBE4" }}
                  >
                    Cancel
                  </button>
                  <button className="common-btn py-2  px-4 text-white md:text-xl">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    </BaseLayout>
  );
}
export default Profile;
