import {
  HashRouter as Router,
  Route,
  Redirect,
  useLocation,
  Switch,
} from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'
import { createApolloClient } from '../api/apollo-client'
import {
  ApolloClient,
  ApolloProvider,
  NormalizedCacheObject,
} from '@apollo/client'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { IncomingOptions, Provider } from 'use-http'
import { FUNCTIONS_URL_TEST } from '../Constants'
import Details from '../pages/Details'
import Login from '../pages/Login'
import SignupScreen from '../pages/SignupScreen'
import Mychats from '../pages/MyChats'
import Coins from '../pages/Coins'
// import Pariqsha from '../pages/Pariqsha'
// import Notification from '../pages/notification'
// import PariqshaQuiz from '../pages/PariqshaQuiz'
// import ListingQuiz from '../pages/ListingQuiz'
//  import ListeningAudio from '../pages/ListeningAudio'
 import ListeningMcq from '../pages/ListeningMcq'
import Setting from '../pages/Setting'
import Market from '../pages/Market'
import NewChat from '../pages/NewChat'
import Quizz from '../pages/Quizz'
import Modal from '../components/Modal'
import Msg from '../pages/Msg'
import Cart from '../pages/Cart'
import Alert from '../components/Alert'
import MarketHistory from '../pages/MarketHistory'
import QuizHistory from '../pages/QuizHistory'
import QuizHeader from '../components/QuizHeader'
import Note from '../components/QuizHeader'
// import Home from '../pages/Home'

function MySwitch() {
  const location = useLocation()
  return (
    <Switch location={location}>

      <PrivateRoute path="/home">
        <Quizz />
      </PrivateRoute>

      <PrivateRoute path="/coins">
        <Coins />
      </PrivateRoute>
      
      {/* <PrivateRoute path="/notification">
        <Notification />
      </PrivateRoute> */}

       {/* <PrivateRoute path="/notification">
        <Pariqsha/>
      </PrivateRoute>  */}
      {/* <PrivateRoute path="/notification">
        <PariqshaQuiz/>
      </PrivateRoute>  
       <PrivateRoute path="/notification">
        <ListingQuiz/>
      </PrivateRoute>  */}
        {/* <PrivateRoute path="/notification">
        <ListeningAudio/>
      </PrivateRoute> */}
      <PrivateRoute path="/notification">
        <ListeningMcq/>
      </PrivateRoute>

      <PrivateRoute path="/quizHeader">
      <QuizHeader/>
      </PrivateRoute>
      <PrivateRoute path="/note">
      <Note/>
      </PrivateRoute>

      <PrivateRoute path="/setting">
        <Setting />
      </PrivateRoute>

      <PrivateRoute path="/market">
        <Market />
      </PrivateRoute>

      <PrivateRoute exact path="/chats">
        <Mychats />
      </PrivateRoute>

      <PrivateRoute exact path="/chats/new">
        <NewChat />
      </PrivateRoute>

      <PrivateRoute  path="/chats/:id">
        <Msg />
      </PrivateRoute>

      <PrivateRoute path="/details/:id">
        <Details />
      </PrivateRoute>

      <PrivateRoute path="/markethistory">
        <MarketHistory />
      </PrivateRoute>

      <PrivateRoute path="/quizhistory">
        <QuizHistory />
      </PrivateRoute>

      <PrivateRoute path="/cart">
        <Cart />
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
  )
}

export default function AppRouter() {
  const { entities } = useSelector((state: RootState) => state.user)
  const [client, setClient] = useState<ApolloClient<NormalizedCacheObject>>()
  const [options, setOptions] = useState<IncomingOptions | undefined>()
  useEffect(() => {
    setClient(createApolloClient())
    setOptions({
      headers: {
        Authorization: `Bearer ${entities?.token}`,
      },
    })
  }, [entities?.token])

  if (!client) return <div>Loading</div>
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
  )
}
