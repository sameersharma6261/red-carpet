import { Outlet } from 'react-router';
import './App.css';
import Display from './components/Display';
import BackgroundMusic from './components/BackgroundMusic';
// import Video from './components/Video';

function App() {
  return (
   <>
   <div className="circleee"></div>
    <div className="circleee"></div>
    <div className="circleee"></div>
    <div className="circleee"></div>
    <div className="circleee"></div>
   <Display />
   <Outlet />
   <BackgroundMusic />
   {/* <Video /> */}
   <div className="circleee"></div>
   </>
  );
}

export default App;