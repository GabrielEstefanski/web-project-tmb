import { useEffect } from 'react';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import Router from './routes/router';
import Header from './components/Header/Header';
import { ToastContainer, toast } from 'react-toastify';
import { startConnection, subscribeToNotifications, stopConnection } from './services/signalrServices';

const App = () => {
  useEffect(() => {
    startConnection();

    subscribeToNotifications((message: string) => {
      toast.info(message);
    });

    return () => {
      stopConnection();
    };
  }, []);
  return (
    <>
      <Header/>
      <main className="p-4">
        <Router/>
      </main>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={true} newestOnTop={true} closeOnClick pauseOnFocusLoss draggable pauseOnHover />
    </>
  )
}

export default App
