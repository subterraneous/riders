import type { RouteObject } from "react-router-dom"

import { LandingLayout } from "~/layouts"
import { HomePage, AuthPage, AuthLoginPage } from "~/pages"

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <LandingLayout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "auth",
        element: <AuthPage />,
        children: [
          // TODO: Router guard de auth
          {
            path: "entrar",
            element: <AuthLoginPage />
          }
          // {
          //   path: "cadastro"
          // }
        ]
      }
    ]
  }
]
