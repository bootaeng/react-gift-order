// ✅ Root.tsx - BrowserRouter 제거!
import { Routes, Route } from 'react-router-dom'
import App from './App'
import LoginPage from './pages/LoginPage'
import NotFoundPage from './pages/NotFoundPage'
import MyPage from './pages/MyPage'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthProvider } from './contexts/AuthContext'

const PATHS = {
  HOME: '/',
  LOGIN: '/login',
  NOT_FOUND: '*',
}

const Root = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path={PATHS.HOME} element={<App />} />
        <Route path={PATHS.LOGIN} element={<LoginPage />} />
        <Route path={PATHS.NOT_FOUND} element={<NotFoundPage />} />
        <Route
          path="/my"
          element={
            <ProtectedRoute>
              <MyPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  )
}

export default Root
