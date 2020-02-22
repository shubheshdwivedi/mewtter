import { createStore, applyMiddleware, compose} from "redux";
import {persistStore, persistReducer} from "redux-persist";
import ReduxThunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import createLogger from "../middlewares/Logger";
// import Reducer from "./reducers";
import Reducers from "./reducers";

const persistConfig = {
    key: 'root',
    storage
};

const persistData = persistReducer(persistConfig, Reducers);
const store = createStore(
    persistData,
    {},
    compose(applyMiddleware(ReduxThunk,
        createLogger(true)),
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__())
);
const persist = persistStore(store);
const redux = {
    store: store,
    persist: persist
};

export default redux;