import React from 'react'
import { useSelector } from 'react-redux'
import { useGetJobsQuery } from '../../features/job/jobApi'
import { RxAvatar } from 'react-icons/rx'

const CandidateDashboard = () => {
	const { data, isLoading, isError } = useGetJobsQuery()
	const {
		user: {
			firstName,
			lastName,
			email,
			role,
			gender,
			country,
			address,
			city,
			postCode,
		},
	} = useSelector(state => state.auth)
	return (
		<div className="flex justify-center items-center overflow-auto p-5 md:p-10">
			<div className="bg-secondary/20 shadow-lg p-10 rounded-2xl w-full h-full  ">
				<div className="flex flex-wrap gap-3 w-full h-full justify-between border-b-2 border-primary p-2 ]">
					<p className="text-xl text-primary">My Profile</p>
					<p className="text-xl text-primary">
						{' '}
						Role : {role[0].toUpperCase() + role.slice(1)}
					</p>
					<div>
						<RxAvatar className="text-2xl text-primary" />
					</div>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2">
					<div className="mt-2">
						<p>First Name</p>
						<p className="text-xl"> {firstName}</p>
					</div>
					<div className="mt-2">
						<p>Last Name</p>
						<p className="text-xl"> {lastName}</p>
					</div>
					<div className="mt-2">
						<p>Email</p>
						<p className="text-xl"> {email}</p>
					</div>
					<div className="mt-2">
						<p>Gender</p>
						<p className="text-xl"> {gender}</p>
					</div>
					<div className="mt-2">
						<p>Address</p>
						<p className="text-xl"> {address}</p>
					</div>
					<div className="mt-2">
						<p>PostCode</p>
						<p className="text-xl"> {postCode}</p>
					</div>
					<div className="mt-2">
						<p>City</p>
						<p className="text-xl"> {city}</p>
					</div>
					<div className="mt-2">
						<p>Country</p>
						<p className="text-xl"> {country}</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default CandidateDashboard
