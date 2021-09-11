import { ReactElement } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { RootState } from "../redux/store";


export default function CartButton(): ReactElement {
  const history = useHistory();
  const items = useSelector((state: RootState) => state.cart.items);
  return (
    <div
      role="button"
      onClick={() => history.push("/cart")}
      className="md:pr-1 relative mr-1"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-7 w-7"
        style={{ color: "#01D5DD" }}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <title>cart</title>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
      <div
        className="absolute bg-black text-white font-bold rounded-full w-4 h-4 flex justify-center items-center right-0   -top-1 "
        style={{ fontSize: "10px" }}
      >
        {items?.length}
      </div>
    </div>
  );
}
