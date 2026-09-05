import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AdminProvider } from './admin/AdminContext';
import { ScrollToTop } from './components/layout/ScrollToTop';
import { Home } from './pages/Home';
import { Sponsors } from './pages/Sponsors';
import { SponsorDetail } from './pages/SponsorDetail';
import { Students } from './pages/Students';
import { Team } from './pages/Team';
import { Schedule } from './pages/Schedule';
import { Blog } from './pages/Blog';
import { BlogPostPage } from './pages/BlogPost';
import { Login } from './pages/Login';
import { NotFound } from './pages/NotFound';

export function App() {
  return (
    <AdminProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sponsors" element={<Sponsors />} />
          <Route path="/sponsors/:sponsorId" element={<SponsorDetail />} />
          <Route path="/students" element={<Students />} />
          <Route path="/team" element={<Team />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AdminProvider>
  );
}
