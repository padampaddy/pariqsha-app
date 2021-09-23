import { ReactElement } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { RootState } from "../../../redux/store";

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
        className="h-6 w-6"
        viewBox="0 0 20 20"
        style={{color:"#3985db"}}
        fill="currentColor"
      >
        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
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
