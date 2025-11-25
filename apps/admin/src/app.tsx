import { DashboardApp } from './dashboard-app'
import { DashboardPlugin } from './dashboard-app/types'
import { localPlugins } from './local-plugins'

import './index.css'

interface AppProps {
  plugins?: DashboardPlugin[]
}

function App({ plugins = [] }: AppProps) {
  const app = new DashboardApp({
    plugins: [...localPlugins, ...plugins],
  })

  return <div>{app.render()}</div>
}

export default App
