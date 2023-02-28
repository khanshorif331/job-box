import React from 'react'
import { Link } from 'react-router-dom'
import { FaChevronLeft } from 'react-icons/fa'
import { useSelector } from 'react-redux'
const Sidebar = () => {
	const {
		user: { role },
	} = useSelector(state => state.auth)
	const employerRoutes = [
		{
			name: 'My Profile',
			path: 'employer',
		},
		{
			name: 'Posted Jobs',
			path: 'posted-jobs',
		},
		{
			name: 'Add Job',
			path: 'add-job',
		},
		{
			name: 'Chats',
			path: 'chats',
		},
	]
	const candidateRoutes = [
		{
			name: 'My Profile',
			path: 'candidate',
		},
		{
			name: 'Applied Jobs',
			path: 'applied-jobs',
		},
		{
			name: 'Chats',
			path: 'chats',
		},
	]
	return (
		<div className="bg-primary/10 col-span-2 h-screen sticky top-0">
			<ul className="flex flex-col gap-2 w-full h-full  p-3">
				<div className="flex justify-between items-center text-primary my-1">
					<Link to="/" className="flex items-center">
						<FaChevronLeft />
						<h1>Back</h1>
					</Link>
					<h1 className="text-xl">Dashboard</h1>
				</div>

				{role === 'employer' &&
					employerRoutes.map(({ name, path }) => (
						<li>
							<Link
								className="hover:bg-primary hover:text-white bg-primary/10 transition-all w-full block py-2 px-3 rounded-full"
								to={path}
							>
								{name}
							</Link>
						</li>
					))}

				{role === 'candidate' &&
					candidateRoutes.map(({ name, path }) => (
						<li>
							<Link
								className="hover:bg-primary hover:text-white bg-primary/10 transition-all w-full block py-2 px-3 rounded-full"
								to={path}
							>
								{name}
							</Link>
						</li>
					))}
			</ul>
		</div>
	)
}

export default Sidebar
