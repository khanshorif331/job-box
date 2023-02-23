import React from 'react'
import { useParams } from 'react-router-dom'
import ChatModal from '../../components/reusable/ChatModal'
import Loading from '../../components/reusable/Loading'
import { useGetUsersQuery } from '../../features/auth/authApi'

const ApplicantDetails = () => {
	const { id } = useParams()
	const { data, isFetching } = useGetUsersQuery()
	const applicant = data?.data?.find(applicant => applicant._id === id)
	if (isFetching) {
		return <Loading></Loading>
	}
	const {
		address,
		city,
		country,
		email,
		firstName,
		gender,
		lastName,
		postcode,
		role,
		_id,
	} = applicant

	return (
		<div className="flex justify-center items-center overflow-auto p-5 md:p-10">
			<div className="bg-secondary/20 shadow-lg p-10 rounded-2xl w-full h-full  ">
				<div className="flex flex-wrap gap-3 w-full h-full justify-between border-b-2 border-primary p-2 ]">
					<p className="text-xl text-primary">Candidate Profile</p>
					<p className="text-xl text-primary">
						{' '}
						Role : {role[0].toUpperCase() + role.slice(1)}
					</p>
					<div>
						<ChatModal applicant={applicant}></ChatModal>
						{/* <button
							onClick={() => <ChatModal id={_id}></ChatModal>}
							className="btn"
						>
							Send Message
						</button> */}
						{/* <RxAvatar className="text-2xl text-primary" /> */}
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
						<p>City</p>
						<p className="text-xl"> {city}</p>
					</div>
					<div className="mt-2">
						<p>Country</p>
						<p className="text-xl"> {country}</p>
					</div>
					<div className="mt-2">
						<p>Postcode</p>
						<p className="text-xl"> {postcode}</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ApplicantDetails
