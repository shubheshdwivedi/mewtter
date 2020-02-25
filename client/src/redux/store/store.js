import { createStore, applyMiddleware, compose} from "redux";
import {persistStore, persistReducer} from "redux-persist";
import ReduxThunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import Reducers from "./reducers";

const persistConfig = {
    key: 'root',
    storage
};

const persistData = persistReducer(persistConfig, Reducers);
const store = createStore(
    persistData,
    {},
    compose(applyMiddleware(ReduxThunk))
);
const persist = persistStore(store);
const redux = {
    store: store,
    persist: persist
};

export default redux;