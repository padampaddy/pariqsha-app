import { useQuery } from "@apollo/client";
import { useState } from "react";
import { Route, Switch } from "react-router-dom";
import { GET_TODAY_QUIZZES } from "../api/queries";
import BaseLayout from "../layouts/Base";
import { QuizResponse } from "../types/Quiz";
import Collections from "../components/Collections";
import Loader from "../components/Loader/Loader";
import GetCard from "../components/quiz/GetCard";
import GetExamCards from "../components/exam/GetExamCard";
import SearchBar from "../components/SearchBar";

export default function Quizz() {
  const { loading } = useQuery<QuizResponse>(GET_TODAY_QUIZZES);
  const [searchTerm, setSearchTerm] = useState<string>("");

  return (
    <BaseLayout title="Quizzes">
     <div className=" px-4 my-4">
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />   

      {loading ? (
        <Loader />
      ) : (
        <div className="my-4">
          <div className="collections w-full">
            <Collections />
          </div>

          <Switch>
            <Route exact path="/home">
            <div className="flex flex-row flex-wrap gap-4 w-full mt-2">
              <GetExamCards searchTerm={searchTerm} />
              </div>
            </Route>

            <Route exact path="/home/discover">
              <div className="flex flex-row flex-wrap gap-4 w-full mt-2">
                <GetCard searchTerm={searchTerm} />
              </div>
            </Route>

            <Route exact path="/home/upcoming">
              <div>Upcoming</div>
            </Route>

            <Route exact path="/home/live">
              <div>Live</div>
            </Route>

            <Route exact path="/home/like">
              <div className="flex flex-row flex-wrap gap-4 w-full mt-2">
                <div> No Liked Card</div>
              </div>
            </Route>
          </Switch>
        </div>
      )}
       </div>
    </BaseLayout>
  );
}
