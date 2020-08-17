import React from 'react';
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import MovieHome from './pages/MovieHome'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'
import MovieData from './pages/MovieData'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import LoginContextProvider from './context/LoginContext'
import ChangePassword from './pages/ChangePassword'
import GameHome from './pages/GameHome'
import GameData from './pages/GameData'
import PrivateRoute from './routes/PrivateRoute'
import NotFound from './components/NotFound'



function App() {
  return (
    <>
      <Router>
        <LoginContextProvider>
          <Navbar />
          <Switch>
            <Route exact path="/"><Home /></Route>
            <Route path="/movie-content"><MovieHome /></Route>
            <Route path="/game-content"><GameHome /></Route>
            <PrivateRoute path="/movie" component={MovieData} />
            <PrivateRoute path="/game" component={GameData} />
            <Route path="/login"><Login /></Route>
            <Route path="/register"><Register /></Route>
            <PrivateRoute path="/change-password" component={ChangePassword} />
            <Route path="*" component={NotFound} />
          </Switch>
          <Footer />
        </LoginContextProvider>
      </Router>
    </>
  );
}

export default App;
