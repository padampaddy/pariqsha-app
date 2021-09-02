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
import Notification from '../pages/Notifications'
import Setting from '../pages/Setting'
import LeaderBoard from '../pages/LeaderBoard'
import NewChat from '../pages/NewChat'
import Quizz from '../pages/Quizz'
import Modal from '../components/Modal'
import Msg from '../pages/Msg'

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
      
      <PrivateRoute path="/notification">
        <Notification />
      </PrivateRoute>

      <PrivateRoute path="/setting">
        <Setting />
      </PrivateRoute>

      <PrivateRoute path="/leader">
        <LeaderBoard />
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
        <Router>
          <MySwitch />
        </Router>
      </Provider>
    </ApolloProvider>
  )
}
