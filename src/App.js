import { Provider, useDispatch } from 'react-redux';
import store from './redux/store';

import { Main } from "./components/Main/Main";

import { useState } from "react";
import { fetchProducts } from './redux/services/ShowList';
import { setInitial } from './redux/slices/EditSlice';

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

function App() {

  const [state, setState] = useState([]);
  const dispatch = useDispatch();
  const data = dispatch(fetchProducts(0));
  data.unwrap()
    .then((PromiseResult) => {
      setState(PromiseResult)
      dispatch(setInitial({
        items: PromiseResult
      }))
    })
    .catch((rejected) => {
      console.log();
    });




  return (
    <>
      <Main prop={state} />
    </>

  );
}

export default AppWrapper;