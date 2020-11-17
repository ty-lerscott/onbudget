import cn from 'classnames'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { Switch, Route } from 'react-router-dom'
import React, { useState, useRef, useEffect } from 'react'

import {
	Header,
	SideNav,
	HeaderName,
	SideNavLink,
	SideNavItems,
	SkipToContent,
	HeaderGlobalBar,
	HeaderMenuButton,
	HeaderGlobalAction
} from 'carbon-components-react'

import { FaceMask24, RecentlyViewed32 } from '@carbon/icons-react'

import AppLoading from 'components/Loading/AppLoading'
import NotificationCenter from 'components/NotificationCenter/NotificationCenter'

import HomeController from 'controllers/Home/Home'
import RequestAccessController from 'controllers/RequestAccess/RequestAccess'
import ForgotPasswordController from 'controllers/ForgotPassword/ForgotPassword'
import TransactionHistoryController from 'controllers/TransactionHistory/TransactionHistory'

import { logoutAction } from 'components/SignIn/SignInActions'
import { isAuthenticated } from 'state/selectors/UserSelectors'

import './Header.scss'

const App = ({ route, logout, isSignedIn, navigateTo, children, ...rest }) => {
	const [isSideNavExpanded, setIsSideNavExpanded] = useState(false)
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const dropdownRef = useRef(null)

	useEffect(() => {
		if (isMenuOpen) {
			dropdownRef.current.focus()
		}
	}, [isMenuOpen])

	if (!route?.routes) {
		return null
	}

	const handleOpenPanel = () => {
		setIsMenuOpen(true)
	}

	const handleClosePanel = () => {
		setIsMenuOpen(false)
	}

	const signOut = () => {
		logout()
		setIsMenuOpen(false)
	}

	const todo = () => {
		console.warn('todo')
	}

	const handleToggleLeftMenu = () => {
		setIsSideNavExpanded(!isSideNavExpanded)
	}

	const handleNavigation = path => () => {
		navigateTo(path)
	}

	return (
		<main className='App'>
			<Header aria-label='On Budget' className='Header'>
				<SkipToContent />
				<HeaderMenuButton
					isCollapsible
					aria-label='Open menu'
					onClick={handleToggleLeftMenu}
					isActive={isSideNavExpanded}
					onBlur={handleToggleLeftMenu}
				/>
				<HeaderName prefix='' onClick={handleNavigation('/')}>
					OnBudget
				</HeaderName>
				<HeaderGlobalBar>
					{isSignedIn && (
						<HeaderGlobalAction
							aria-label='Search'
							className='ProfileAction'
							onBlur={handleClosePanel}
							onClick={handleOpenPanel}>
							<FaceMask24 className='Icon' />
						</HeaderGlobalAction>
					)}
				</HeaderGlobalBar>

				<div className='DropdownMenu'>
					<ul
						ref={dropdownRef}
						className={cn('menu', { 'menu--opened': isMenuOpen })}>
						<li className='ListItem'>
							<button className='TextButton' onClick={signOut}>
								Sign Out
							</button>
						</li>
						<li className='ListItem Disabled'>
							<button className='TextButton' onClick={todo}>
								Settings [COMING SOON]
							</button>
						</li>
					</ul>
				</div>
				<SideNav
					isRail
					aria-label='Side navigation'
					expanded={isSideNavExpanded}>
					<SideNavItems>
						<SideNavLink
							onClick={handleNavigation('/transaction-history')}
							renderIcon={RecentlyViewed32}>
							Transaction History
						</SideNavLink>
					</SideNavItems>
				</SideNav>
			</Header>

			<NotificationCenter />
			<AppLoading />

			<Switch>
				<Route
					exact
					path='/'
					render={props => <HomeController {...props} />}
				/>
				<Route
					exact
					path='/request-access'
					render={props => <RequestAccessController {...props} />}
				/>
				<Route
					exact
					path='/forgot-password'
					render={props => <ForgotPasswordController {...props} />}
				/>
				<Route
					exact
					path='/transaction-history'
					render={props => (
						<TransactionHistoryController {...props} />
					)}
				/>
			</Switch>
		</main>
	)
}

App.propTypes = {
	logout: PropTypes.func,
	route: PropTypes.object,
	children: PropTypes.node,
	isSignedIn: PropTypes.bool,
	navigateTo: PropTypes.func
}

const mapDispatchToProps = {
	navigateTo: push,
	logout: logoutAction
}

const mapStateToProps = state => ({
	isSignedIn: isAuthenticated(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
