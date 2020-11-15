import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Page from 'components/Page/Page'
import SignInModal from 'components/SignIn/SignIn'
import Dashboard from 'components/Dashboard/Dashboard'

import { isAuthenticated } from 'state/selectors/UserSelectors'
import { hasFirebaseLoaded } from 'state/selectors/FirebaseSelectors'

import './Home.scss'

const Home = ({ isSignedIn, hasFirebaseLoaded }) =>
	!hasFirebaseLoaded ? null : (
		<Page name='Home'>{isSignedIn ? <Dashboard /> : <SignInModal />}</Page>
	)

Home.propTypes = {
	isSignedIn: PropTypes.bool,
	hasFirebaseLoaded: PropTypes.bool
}

const mapStateToProps = state => ({
	isSignedIn: isAuthenticated(state),
	hasFirebaseLoaded: hasFirebaseLoaded(state)
})

export default connect(mapStateToProps)(Home)
