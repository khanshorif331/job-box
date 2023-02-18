import { createBrowserRouter } from 'react-router-dom'
import Dashboard from '../layout/dashboard/Dashboard'
import Main from '../layout/main/Main'
import AccountCreator from '../pages/register/AccountCreator'
import Home from '../pages/home/Home'
import JobDetails from '../pages/JobDetails'
import Jobs from '../pages/Jobs'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import PrivateRoute from '../utils/PrivateRoute'
import AddJob from '../pages/employeeDashboard/AddJob'
import EmployerDashboard from '../pages/employeeDashboard/EmployerDashboard'
import CandidateDashboard from '../pages/candidateDashboard/CandidateDashboard'
import AppliedJobs from '../pages/candidateDashboard/AppliedJobs'
import PostedJobs from '../pages/employeeDashboard/PostedJobs'
import Applicants from '../components/reusable/Applicants'
import ApplicantDetails from '../pages/employeeDashboard/ApplicantDetails'

const routes = createBrowserRouter([
	{
		path: '/',
		element: <Main />,
		children: [
			{
				path: '/',
				element: <Home />,
			},
			{
				path: '/jobs',
				element: <Jobs />,
			},
			{
				path: '/job-details/:id',
				element: <JobDetails />,
			},
			{
				path: '/login',
				element: <Login />,
			},
			{
				path: '/signup',
				element: <Signup />,
			},
			{
				path: '/register',
				element: (
					<PrivateRoute>
						<AccountCreator />
					</PrivateRoute>
				),
			},
			{
				path: '/register/:type',
				element: (
					<PrivateRoute>
						<AccountCreator />
					</PrivateRoute>
				),
			},
		],
	},
	{
		path: '/dashboard',
		element: (
			<PrivateRoute>
				<Dashboard />
			</PrivateRoute>
		),
		children: [
			{
				path: 'applied-jobs',
				element: <AppliedJobs />,
			},
			{
				path: 'add-job',
				element: <AddJob />,
			},
			{
				path: 'employer',
				element: <EmployerDashboard />,
			},
			{
				path: 'posted-jobs',
				element: <PostedJobs />,
			},
			{
				path: 'candidate',
				element: <CandidateDashboard />,
			},
			{
				path: 'applicants/:id',
				element: <Applicants />,
			},
			{
				path: 'applicantDetails/:id',
				element: <ApplicantDetails />,
			},
		],
	},
])

export default routes
