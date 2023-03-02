import './App.css';
import { Provider } from 'react-redux';
import { store } from './store';
import SearchPage from './features/search/Search';

function App() {
  return (
    <Provider store={store}>
      <SearchPage />
    </Provider>
  );
}

export default App;
