import { applyMiddleware, createStore, compose } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import thunk from 'redux-thunk'
import rootReducer from './App.reducer'

const persistConfig = {
 key: 'root',
 storage: storage,
 stateReconciler: autoMergeLevel2, // see "Merge Process" section for details.
 blacklist: ['navigation']
}

const initialState = {}

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() || window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const pReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
    pReducer,
    initialState,
    compose(applyMiddleware(thunk), devTools)
)
export const persistor = persistStore(store)
