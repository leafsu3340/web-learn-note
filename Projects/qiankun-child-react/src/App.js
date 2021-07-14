import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'


function App() {
  return (
    <Router basename={window.__POWERED_BY_QIANKUN__ ? '/app-react' : '/'}>
      <Link to="/">首页</Link>
      <Link to="/about">关于首页</Link>
      <Route path="/" exact render={() => {
        return <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>

      }}>

      </Route>
      <Route path="/about" render={() => <h1>关于页面</h1>}></Route>

    </Router>
  );
}

export default App;
