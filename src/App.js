import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './pages/Home';
import Option from './pages/Option';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/option">
          <Option />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
