import { Routes, Route } from 'react-router-dom'
import App from './App'
import LoginPage from './pages/LoginPage'
import NotFoundPage from './pages/NotFoundPage'
import MyPage from './pages/MyPage'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthProvider } from './contexts/AuthContext'
import OrderPage from './pages/OrderPage'

const PATHS = {
  HOME: '/',
  LOGIN: '/login',
  NOT_FOUND: '*',
  ORDER: '/order/:productId',
}

const Root = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path={PATHS.HOME} element={<App />} />
        <Route path={PATHS.LOGIN} element={<LoginPage />} />
        <Route
          path={PATHS.ORDER}
          element={
            <ProtectedRoute>
              <OrderPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my"
          element={
            <ProtectedRoute>
              <MyPage />
            </ProtectedRoute>
          }
        />
        <Route path={PATHS.NOT_FOUND} element={<NotFoundPage />} />
      </Routes>
    </AuthProvider>
  )
}

export default Root
