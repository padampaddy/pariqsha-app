import "./App.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import Modal from "./components/Modal";
import AppRouter from "./router/AppRouter";
function App() {
  return (
    <Provider store={store}>
      <>
        <Modal />
        <AppRouter />
      </>
    </Provider>
  );
}

export default App;
