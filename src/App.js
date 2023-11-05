import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import AppLayout from './components/AppLayout';
import Login from './components/Login';
import AllTour from './components/AllTour';
import { UserProvider } from './context/userContext';
import Tour from './components/Tour';
import { TourProvider } from './context/tourContext';
import User from './components/User';
import MyReviews from './components/MyReviews';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <div className="App">
      <UserProvider>
        <TourProvider>
          <Routes>
            <Route element={<AppLayout />}>
              <Route  path="overview" element={ <AllTour />} />
              <Route  path="tour/:id" element={ <Tour />} />
              <Route  path="me" element={ <User />} />
              <Route  path="myReviews" element={ <MyReviews/>} />
              <Route path="*" element={<Navigate replace to="/overview" />} />

            </Route>
            <Route  path="/login" element={ <Login />} />

          </Routes>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            />
            {/* Same as */}
            <ToastContainer />
        </TourProvider>
      </UserProvider>
    </div>
  );
}

export default App;
