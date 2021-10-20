import { useState } from "react";
import { useHistory } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import BaseLayout from "../layouts/Base";

const items = [
  { name: "Pariqsha test1", status: "Check Result" },
  { name: "Pariqsha test2", status: "Check Result" },
  { name: "Pariqsha test2", status: "Not Declared Yet" },
  { name: "Pariqsha test4", status: "Not Declared Yet" },
  { name: "Pariqsha test5", status: "Check Result" },
  { name: "Pariqsha test6", status: "Not Declared Yet" },
  { name: "Pariqsha test7", status: "Check Result" },
];

const Results = () => {
    const history = useHistory();
  const [searchTerm, setSearchTerm] = useState<string>("");
  return (
    <BaseLayout title="Results">
      <div className=" px-4 my-4">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <div className="mt-4">
     
          <div className="mt-4 flex flex-wrap">
            {items.flatMap((item) => (
              <div className="md:p-4 p-2 w-1/2 md:w-1/3 text-center ">
                  <div className="bg-white md:p-4 p-2 shadow-lg rounded md:flex items-center justify-between">
                <div>{item.name}</div>
                <button onClick={()=> history.push("/leaderboard")} className="common-btn p-2 mt-3 md:mt-0 rounded-lg text-sm">
                  {item.status}
                </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default Results;
