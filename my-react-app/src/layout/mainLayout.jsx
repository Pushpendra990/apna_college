import React from 'react'
import Header from '../componant/header'
import { Outlet } from 'react-router-dom'

export default function MainLayout() {
  return (
    <div>
      <Header/>
      <Outlet/>
    </div>
  )
}
