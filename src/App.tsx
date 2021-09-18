import React from 'react';

import { Provider } from 'react-redux';

import store from './store/'
import Orderbook from './container/Orderbook';

function App() {
  return (
    <Provider store={store}>
      <Orderbook/>
    </Provider>
  );
}

export default App;
