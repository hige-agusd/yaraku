import './App.css';
import ErrorBoundary from './components/error-boundary/error-boundary';
import MainContainer from './sections/main/main.container';

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <MainContainer />
      </ErrorBoundary>
    </div>
  );
}

export default App;
