import './App.css';
import { Provider } from 'react-redux';
import { store } from './store';
import Test from './features/test/Test';

function App() {
  return (
    <Provider store={store}>
      <Test />
    </Provider>
  );
}

export default App;
