import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './views/auth/Login';
import Registration from './views/auth/Registration';
import AuthLayout from './layouts/AuthLayout';
import MainLayout from './layouts/MainLayout';
import Main from './views/main/Main';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<AuthLayout />}>
          <Route index element={<Login />}></Route>
          <Route path='registration' element={<Registration />}></Route>
        </Route>
        <Route path="/main" element={<MainLayout/>}>
          <Route index element={<Main />}></Route>

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
