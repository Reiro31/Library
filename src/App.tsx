import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import NavBar from './Navbar/NavBar';
import Home from './pages/home/Home';
import store from './store/store';
import Client from './pages/client/Client';
import AddBook from './pages/login/AddBook';
import './App.css';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<NavBar />}>
        <Route index element={<Home />} />
        <Route path="/library" element={<Home />} />
        <Route path="/client" element={<Client />} />
        <Route path="/login" element={<AddBook />} />
      </Route>
    )
  );

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
