import Signin from '../pages/Signin'
import Signup from '../pages/Signup'
import {
  HashRouter as Router,
  Route,
  Redirect,
  useLocation,
  Switch,
} from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import Home from '../pages/Home'
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

function MySwitch() {
  const location = useLocation()
  return (
    <Switch location={location}>
      <PrivateRoute path="/home">
        <Home />
      </PrivateRoute>
      <PrivateRoute path="/details/:id">
        <Details />
      </PrivateRoute>
      <PublicRoute path="/signin">
        <Signin />
      </PublicRoute>
      <PublicRoute path="/signup">
        <Signup />
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
        <Router>
          <MySwitch />
        </Router>
      </Provider>
    </ApolloProvider>
  )
}
