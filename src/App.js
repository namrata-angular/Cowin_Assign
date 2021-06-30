import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import ScreenDisplayData from '../src/Screen/DisplayData'
function App() {
  return (
    <Router>
      <Switch>
        <Redirect exact from="/" to="ScreenDisplayData" />
        <Route path="/ScreenDisplayData">
          <ScreenDisplayData />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
