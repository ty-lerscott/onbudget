import loadable from '@loadable/component'

import App from 'controllers/App/App'

// import AdminRoutes from 'routes/admin';
// import WorkoutRoutes from 'routes/workout';

const routes = [
	{
		component: App,
		routes: [
			{
				path: '/',
				exact: true,
				component: loadable(() => import('controllers/Home/Home'))
			},
			{
				path: '/request-access',
				exact: true,
				component: loadable(() =>
					import('controllers/RequestAccess/RequestAccess')
				)
			},
			{
				path: '/forgot-password',
				exact: true,
				component: loadable(() =>
					import('controllers/ForgotPassword/ForgotPassword')
				)
			}
		]
	}
]

export default routes
