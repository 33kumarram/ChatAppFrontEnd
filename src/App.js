import './App.css';
import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom';
import { LoginPage } from './Components/LogIn/LoginPage';
import { HomePage } from './Components/home/HomePage';
import { WriteArticle } from './Components/articles/WriteArticle';
import { ArticleDetailView } from './Components/articles/articleDetailView';
import { Header } from './Components/header/header';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import About from './Components/about/about';
import Contact from './Components/contact/contact';


const PrivateRoute = ({ token, ...props }) => {
  return token ?
    <>
      <Header />
      <Outlet />
    </> :
    <Navigate replace to='/' />
}

function App() {
  const user = useSelector(state => state.user)

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' Component={LoginPage} exact />
          <Route path='/home' element={<PrivateRoute token={user?.token} />}>
            <Route path='/home' Component={HomePage} />
          </Route>
          <Route path='/home/writearticle' element={<PrivateRoute token={user?.token} />}>
            <Route path='/home/writearticle' Component={WriteArticle} />
          </Route>
          <Route path='/home/article/detailview/:id' element={<PrivateRoute token={user?.token} />}>
            <Route path='/home/article/detailview/:id' Component={ArticleDetailView} />
          </Route>
          <Route path='/home/article/update' element={<PrivateRoute token={user?.token} />}>
            <Route path='/home/article/update' Component={WriteArticle} />
          </Route>
          <Route path='/about' element={<PrivateRoute token={user?.token} />}>
            <Route path='/about' Component={About} />
          </Route>
          <Route path='/contact' element={<PrivateRoute token={user?.token} />}>
            <Route path='/contact' Component={Contact} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
