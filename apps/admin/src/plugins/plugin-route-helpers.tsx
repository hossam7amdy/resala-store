import { ComponentType } from 'react'
import { Outlet } from 'react-router-dom'

export const withOutlet = (Component: ComponentType) => {
  const WrappedWithOutlet = () => (
    <>
      <Component />
      <Outlet />
    </>
  )
  WrappedWithOutlet.displayName = `WithOutlet(${
    Component.displayName || Component.name || 'Component'
  })`
  return WrappedWithOutlet
}
