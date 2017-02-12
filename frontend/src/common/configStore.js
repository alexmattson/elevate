import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';
import createLogger from 'redux-logger';

const logger = createLogger();
const middlewares = [thunk, logger];
let devToolsExtension = f => f;

/* istanbul ignore if  */
// if (process.env.NODE_ENV === 'dev') {
//   const createLogger = require('redux-logger');
//
//   const logger = createLogger({ collapsed: true });
//   middlewares.push(logger);
//   debugger;
//   if (window.__REDUX_DEVTOOLS_EXTENSION__) {
//     devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__();
//   }
// }

if (window.__REDUX_DEVTOOLS_EXTENSION__) {
  devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__();
}

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(...middlewares),
    devToolsExtension
  ));
  /* istanbul ignore if  */
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./rootReducer', () => {
      const nextRootReducer = require('./rootReducer').default; // eslint-disable-line
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
