import { NavLink } from "react-router-dom";
import Joyride from "react-joyride";

const steps = [
  {
    target: ".discover",
    content: "This is Discover quiz!",
  },
  {
    target: ".my-quiz",
    content: "This is  My-quiz!",
  },
  {
    target: ".upcoming",
    content: "This is Upcoming quiz!",
  },
  {
    target: ".live",
    content: "This is Live quiz!",
  },
  {
    target: ".liked",
    content: "This is Liked quiz!",
  },
];
const Collections = () => {
  return (
    <>
      <Joyride steps={steps} styles={{
          options: {
            arrowColor: '#fff',
            backgroundColor: '#fff',
            primaryColor: '#3985db',
            textColor: '#000',
            width: 900,
            zIndex: 1000,
          }

      }} />
      <div className=" p-0">
        <ul className="w-full mb-2 float-left ">
          <li role="button" className="">
            <NavLink
              to="/home"
              exact
              className="collection-list discover"
              activeClassName="common-btn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 md:h-5 md:w-5 mr-1 md:mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              Discover
            </NavLink>
          </li>

          <li role="button">
            <NavLink
              to="/home/ielts"
              className="collection-list my-quiz"
              activeClassName="common-btn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 md:h-5 md:w-5 mr-1 md:mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              Ielts
            </NavLink>
          </li>

          <li role="button">
            <NavLink
              to="/home/upcoming"
              className="collection-list upcoming"
              activeClassName="common-btn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 md:h-5 md:w-5 mr-1 md:mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              Upcoming
            </NavLink>
          </li>

          <li role="button">
            <NavLink
              to="/home/live"
              className="collection-list live"
              activeClassName="common-btn selected"
              aria-current="page"
            >
              <div className="h-2.5 w-2.5 md:h-3 md:w-3 mr-1 md:mr-2 rounded-full bg-red-600" />
              Live
            </NavLink>
          </li>

          <li role="button">
            <NavLink
              to="/home/like"
              className="collection-list liked"
              activeClassName="common-btn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 md:h-5 md:w-5 mr-1 md:mr-2 text-red-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                />
              </svg>
              Liked
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Collections;
