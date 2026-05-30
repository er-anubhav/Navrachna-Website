import { Outlet } from 'react-router-dom'
import { HeaderV1 } from './HeaderV1'
import { FooterV1 } from './FooterV1'

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <HeaderV1 />
      <main id="main-content" className="flex-1">
        <Outlet />
      </main>
      <FooterV1 />
    </div>
  )
}