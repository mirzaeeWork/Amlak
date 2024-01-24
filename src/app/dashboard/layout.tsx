import DashboardSideBar from '@/components/layout/DashboardLayout/DashboardSideBar'
import { Metadata } from 'next'
import React from 'react'

type dashboardType = {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: 'پنل کاربری املاک',
}


function LayoutDashboard({ children }: dashboardType) {
  return (
    <DashboardSideBar>
      {children}
    </DashboardSideBar>
  )
}

export default LayoutDashboard