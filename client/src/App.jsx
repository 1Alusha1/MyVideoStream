import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './views/auth/Login';
import Registration from './views/auth/Registration';
import AuthLayout from './layouts/AuthLayout';
import MainLayout from './layouts/MainLayout';
import Main from './views/main/Main';
import UserUploadVideo from './views/main/user-channel/UserUploadVideo';
import UserVideos from './views/main/user-channel/UserVideos';
import UserVideo from './views/main/user-channel/UserVideo';
import UserChannelLayout from './layouts/UserChannelLayout';
import UserAbout from './views/main/user-channel/UserAbout';
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
          <Route path='/main/video/:id' element={<UserVideo />}></Route>
        </Route>
        <Route path='/main/channel' element={<UserChannelLayout />}>
          <Route
            path='/main/channel/:id/upload-video'
            element={<UserUploadVideo />}
          ></Route>
          <Route path='/main/channel/:id/video' element={<UserVideos />}></Route>
          <Route path='/main/channel/:id/about' element={<UserAbout />}></Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
