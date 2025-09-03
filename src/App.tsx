import './App.css';
import randomstring from "randomstring";
import { Provider, useDispatch, useSelector } from 'react-redux';
import store, { toggleTheme } from './store';
import type { RootState } from './store';

function ThemeToggle() {
  const mode = useSelector((state: RootState) => state.theme.mode);
  const dispatch = useDispatch();
  return (
    <button onClick={() => dispatch(toggleTheme())}>
      Switch to {mode === 'light' ? 'dark' : 'light'} mode
    </button>
  );
}

function AppContent() {
  const mode = useSelector((state: RootState) => state.theme.mode);
  return (
    <div className="content" style={{ background: mode === 'dark' ? '#222' : '#fff', color: mode === 'dark' ? '#fff' : '#222', minHeight: '100vh' }}>
      <ThemeToggle />
      <h1>Test App</h1>
      <p>Random String - {randomstring.generate()}</p>
    </div>
  );
}

const App = () => {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
};

export default App;

