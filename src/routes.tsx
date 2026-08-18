import { createBrowserRouter } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'
import { NotFoundPage, PublicOnly, RequireAdmin, RequireAuth } from '@/router'
import { LoginPage } from '@/pages/auth/LoginPage'
import { OverviewPage } from '@/pages/OverviewPage'
import { UsersPage } from '@/pages/UsersPage'
import { TransactionsPage } from '@/pages/TransactionsPage'
import { UnauthorizedPage } from '@/pages/UnauthorizedPage'

export const router = createBrowserRouter([
  {
    element: <PublicOnly />,
    children: [{ path: '/auth/login', element: <LoginPage /> }],
  },
  {
    element: <RequireAuth />,
    children: [
      {
        element: <RequireAdmin />,
        children: [
          {
            path: '/',
            element: <AppShell />,
            children: [
              { index: true, element: <OverviewPage /> },
              { path: 'users', element: <UsersPage /> },
              { path: 'transactions', element: <TransactionsPage /> },
            ],
          },
        ],
      },
    ],
  },
  { path: '/unauthorized', element: <UnauthorizedPage /> },
  { path: '*', element: <NotFoundPage /> },
])