import logo from './logo.svg';
import './App.css';
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import { Switch, Route,BrowserRouter,Redirect } from 'react-router-dom'
import "bulma/css/bulma.css"


function App() {

  return (
    <div className="App has-background-light">
      <header className="App-header">
      </header>
      <main>
        <div className='section'>
        <BrowserRouter>
        <Switch>
          <Route exact path='/login'>
            <Login />
          </Route>
          <Route exact path='/dashboard'>
            <Dashboard />
          </Route>
        <Redirect from='/' to='login' />
        </Switch>  
        </BrowserRouter> 
        </div>
      </main>
    </div>
  );
}

export default App;
