import {
  HashRouter as Router,
  Route,
  Redirect,
  useLocation,
  Switch,
} from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import { createApolloClient } from "../api/apollo-client";
import {
  ApolloClient,
  ApolloProvider,
  NormalizedCacheObject,
} from "@apollo/client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { IncomingOptions, Provider } from "use-http";
import { FUNCTIONS_URL_TEST } from "../Constants";
import Details from "../components/quiz/Details";
import SignupScreen from "../pages/Login/SignupScreen";
import Mychats from "../pages/Chat/MyChats";
import Coins from "../pages/Coins";
import ExamStart from "../pages/ExamStart";
import Setting from "../pages/setting/Setting";
import Market from "../pages/market/Market";
import NewChat from "../pages/Chat/NewChat";
import Quizz from "../pages/Quizz";
import Modal from "../components/Modal/Modal";
import Msg from "../pages/Chat/Msg";
import Cart from "../pages/market/Cart";
import Alert from "../components/Modal/Alert";
import MarketHistory from "../pages/setting/MarketHistory";
import QuizHistory from "../pages/setting/QuizHistory";
import QuestionType from "../components/QuestionType";
import ExamCardDetails from "../components/exam/ExamCardDetails";
import Login from "../pages/Login/Login";
import Notification from "../pages/Notifications";
import SubmitPage from "../pages/QuizType/SubmitPage";
// import LeaderBoard from "../pages/LeaderBoard";
import LeaderB from "../pages/LeaderB";
import Results from "../pages/Results";

function MySwitch() {
  const location = useLocation();
  return (
    <Switch location={location}>
      <PrivateRoute path="/home">
        <Quizz />
      </PrivateRoute>

      <PrivateRoute path="/coins">
        <Coins />
      </PrivateRoute>

      <PrivateRoute path="/leaderboard">
        <LeaderB />
      </PrivateRoute>

      <PrivateRoute path="/results">
        <Results />
      </PrivateRoute>

      <PrivateRoute path="/setting">
        <Setting />
      </PrivateRoute>

      <PrivateRoute path="/notification">
        <Notification />
      </PrivateRoute>

      <PrivateRoute exact path="/chats">
        <Mychats />
      </PrivateRoute>

      <PrivateRoute exact path="/chats/new">
        <NewChat />
      </PrivateRoute>

      <PrivateRoute path="/chats/:id">
        <Msg />
      </PrivateRoute>

      <PrivateRoute path="/cart">
        <Cart />
      </PrivateRoute>

      <PrivateRoute path="/market">
        <Market />
      </PrivateRoute>

      <PrivateRoute path="/markethistory">
        <MarketHistory />
      </PrivateRoute>

      <PrivateRoute path="/quizhistory">
        <QuizHistory />
      </PrivateRoute>

      <PrivateRoute path="/details/:id">
        <Details />
      </PrivateRoute>

      <PrivateRoute path="/examdetails/:id">
        <ExamCardDetails />
      </PrivateRoute>

      <PrivateRoute path="/examstart/:id/:time">
        <ExamStart />
      </PrivateRoute>

      <PrivateRoute path="/submit">
        <SubmitPage/>
      </PrivateRoute>

      {/* <PrivateRoute path="/notification">
        <LandingPage />
      </PrivateRoute> */}
     
      <PrivateRoute path="/QuestionType">
        <QuestionType />
      </PrivateRoute>
      
      <PublicRoute path="/signin">
        <Login />
      </PublicRoute>

      <PublicRoute path="/signup">
        <SignupScreen />
      </PublicRoute>

      <Route path="*">
        <Redirect to="/signin" />
      </Route>
    </Switch>
  );
}

export default function AppRouter() {
  const { entities } = useSelector((state: RootState) => state.user);
  const [client, setClient] = useState<ApolloClient<NormalizedCacheObject>>();
  const [options, setOptions] = useState<IncomingOptions | undefined>();
  useEffect(() => {
    setClient(createApolloClient());
    setOptions({
      headers: {
        Authorization: `Bearer ${entities?.token}`,
      },
    });
  }, [entities?.token]);

  if (!client) return <div>Loading</div>;
  return (
    <ApolloProvider client={client}>
      <Provider url={FUNCTIONS_URL_TEST} options={options}>
        <Modal />
        <Alert />
        <Router>
          <MySwitch />
        </Router>
      </Provider>
    </ApolloProvider>
  );
}
