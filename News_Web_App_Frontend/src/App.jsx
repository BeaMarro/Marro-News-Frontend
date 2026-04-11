import HomePage from './pages/HomePage';
import JournalistArticlesPage from './pages/JournalistArticlesPage';
import IndividualArticlePage from './pages/IndividualArticlePage';
import AllArticlesPage from './pages/AllArticlesPage';
import JournalistsPage from './pages/JournalistsPage';
import AccountPage from './pages/AccountPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import './App.css';
import ArticlesByGenrePage from './pages/ArticlesByGenrePage';
import ArticleApprovalPage from './pages/ArticleApprovalPage';
import FavouritesListPage from './pages/FavouritesListPage';
import LoginForm from './components/login-register/LoginForm';
import RegisterForm from './components/login-register/RegisterForm';
import JournalistInformationPage from './pages/JournalistInformationPage';
import SearchResults from './pages/SearchResults';
import NotificationContainer from './notification/WebSocketNotifications';
import FavouritesListStatistics from './pages/FavouritesListStatistics';
import PerformanceStatistics from './pages/PerformanceStatistics';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar/>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/account" element={<AccountPage/>} />
              <Route path="/manage-articles" element={<JournalistArticlesPage />} />
              <Route path="/article/:id" element={<IndividualArticlePage />} />
              <Route path="/articles" element={<AllArticlesPage/>} />
              <Route path="/articles/:genre" element={<ArticlesByGenrePage/>} />
              <Route path="/journalists" element={<JournalistsPage/>} />
              <Route path="/journalist/:id" element={<JournalistInformationPage/>} />
              <Route path="/performance-statistics" element={<PerformanceStatistics/>} />
              <Route path="/approval-requests" element={<ArticleApprovalPage/>} />
              <Route path="/search/:query" element={<SearchResults/>} />
              <Route path="/favourites" element={<FavouritesListPage/>} />
              <Route path="/favourites-statistics" element={<FavouritesListStatistics />} />
              <Route path="/login" element={<LoginForm/>} />
              <Route path="/register" element={<RegisterForm/>} />
            </Routes>
            <NotificationContainer />
      </div>
    </Router>
  );
}

export default App 
