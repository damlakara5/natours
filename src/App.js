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
import Payment from './components/Payment';
import MyBookings from './components/MyBookings';
import Favs from './components/Favs';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Signup from './components/Signup';
import Billing from './components/Billing';


function App() {

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        //amount of time that data in the cache stay fresh
        staleTime: 5 * 60 * 1000 
        
      }
    }
  })


  return (
    <div className="App">
      <UserProvider>
        <TourProvider>
        <QueryClientProvider  client={queryClient}  >
          <Routes>
            <Route element={<AppLayout />}>
              <Route  path="overview" element={ <AllTour />} />
              <Route  path="tour/:id" element={ <Tour />} />
              <Route  path="my-tours" element={ <Payment/>} />
              <Route  path="my-bookings" element={ <MyBookings/>} />
              <Route  path="me" element={ <User />} />
              <Route  path="myReviews" element={ <MyReviews/>} />
              <Route  path="favs" element={ <Favs/>} />
              <Route  path="billing" element={ <Billing/>} />
              <Route path="*" element={<Navigate replace to="/overview" />} />

            </Route>
            <Route  path="/login" element={ <Login />} />
            <Route  path="/signup" element={ <Signup />} />

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
            style={{fontSize: "16px"}}
            />
            {/* Same as */}
            <ToastContainer />
            </QueryClientProvider>
        </TourProvider>
      </UserProvider>
    </div>
  );
}

export default App;
