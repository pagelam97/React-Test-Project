import { Provider } from 'react-redux';
import store from './redux/store';

import IndexRouter from './router/IndexRouter';
import './App.css';

function App() {


  return (
    <div className="App">
      <Provider store={store}>
        <IndexRouter />
      </Provider>
    </div>
  );
}

export default App;
