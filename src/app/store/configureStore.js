import { createStore, applyMiddleware } from "redux";
import {persistStore} from 'redux-persist';
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "../reducers/rootReducer";
import thunk from "redux-thunk";

export const configureStore = () => {

  const composedEnhancer = composeWithDevTools(
    applyMiddleware(thunk),
  );

  const store = createStore(rootReducer, composedEnhancer);

  const persistor = persistStore(store)

  return {store, persistor};
};
