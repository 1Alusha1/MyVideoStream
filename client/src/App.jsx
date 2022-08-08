import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './views/auth/Login';
import Registration from './views/auth/Registration';
import AuthLayout from './layouts/AuthLayout';
import MainLayout from './layouts/MainLayout';
import Main from './views/main/Main';
import UserChanal from './views/main/user-chanal/UserChanal';
import UserUploadVideo from './views/main/user-chanal/UserUploadVideo';
import UserVideos from './views/main/user-chanal/UserVideos';
import UserVideo from './views/main/user-chanal/UserVideo';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<AuthLayout />}>
          <Route index element={<Login />}></Route>
          <Route path='registration' element={<Registration />}></Route>
        </Route>
        <Route path='/main' element={<MainLayout />}>
          <Route index element={<Main />}></Route>
          <Route path='/main/chanal/:id' element={<UserChanal />}></Route>
          <Route
            path='/main/chanal/:id/upload-video'
            element={<UserUploadVideo />}
          ></Route>
          <Route path='/main/chanal/:id/video' element={<UserVideos />}></Route>
          <Route path='/main/video/:id' element={<UserVideo />}></Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
