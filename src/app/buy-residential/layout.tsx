import SideBar from '@/components/module/SideBar'
import React from 'react'

type dashboardType = {
    children: React.ReactNode
  }
  
function LayoutBuyResidential({children}:dashboardType) {
    return (
        <SideBar>
            {children}
        </SideBar>
    )
}

export default LayoutBuyResidential