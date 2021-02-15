import userReducer from '../reducers/userReducer'
import { createStore, applyMiddleware,compose } from 'redux'
import thunk from 'redux-thunk'

const store = createStore(userReducer,
    compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
      ))

export default store