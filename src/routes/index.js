import App from 'controllers/App/App'

import HistoryRoutes from 'routes/history'
import AuthRoutes from 'routes/authentication'

const routes = [
	{
		component: App,
		routes: AuthRoutes.concat(HistoryRoutes)
	}
]

export default routes
