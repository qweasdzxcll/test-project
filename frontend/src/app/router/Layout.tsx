import React from 'react'
import { Outlet } from 'react-router-dom'

export const Layout = () => {
  return (
    <div>
      <header>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
