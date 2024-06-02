import { RouteObject } from 'react-router-dom'

import AdminOrderPage from '@/pages/AdminOrderPage'
import CacheOutPage from '@/pages/CacheOutPage'
import MainLayout from '@/pages/MainLayout'
import OrderUploadPage from '@/pages/OrderUploadPage'
import PhotoUploadPage from '@/pages/PhotoUploadPage'
import ProducerOrderPage from '@/pages/ProducerOrderPage'
import UserInfoPage from '@/pages/UserInfoPage'
import UserReportPage from '@/pages/UserReportPage'

const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '', element: <AdminOrderPage /> },
      { path: 'producer', element: <ProducerOrderPage /> },
      { path: 'user/info', element: <UserInfoPage /> },
      { path: 'user/report', element: <UserReportPage /> },
      { path: 'cache', element: <CacheOutPage /> },
      { path: 'upload/photo', element: <PhotoUploadPage /> },
      { path: 'upload/order', element: <OrderUploadPage /> },
    ],
  },
]

export default routes
