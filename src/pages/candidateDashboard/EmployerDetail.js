import React from 'react'
import { useParams } from 'react-router-dom'
import ChatModal from '../../components/reusable/ChatModal'
import Loading from '../../components/reusable/Loading'
import { useGetUsersQuery } from '../../features/auth/authApi'
import { useJobByIdQuery } from '../../features/job/jobApi'

const EmployerDetail = () => {
	const { id } = useParams()
	const { data: emails, isFetching: emailFetching } = useJobByIdQuery(id)

	const employerEmail = emails?.data?.email
	const { data: userData, isFetching } = useGetUsersQuery()

	if (isFetching || emailFetching) {
		return <Loading />
	}

	const recruiter = userData?.data?.find(user => user?.email === employerEmail)

	if (!recruiter) {
		return <Loading></Loading>
	}

	const {
		firstName,
		lastName,
		role,
		gender,
		companyName,
		employeeRange,
		companyCategory,
		roleInCompany,
		email,
	} = recruiter
	return (
		<div className="flex justify-center items-center overflow-auto p-5 md:p-10">
			<div className="bg-secondary/20 shadow-lg p-10 rounded-2xl w-full h-full  ">
				<div className="flex flex-wrap gap-3 w-full h-full justify-between border-b-2 border-primary p-2 ]">
					<p className="text-xl text-primary">Recruiter Profile</p>
					<p className="text-xl text-primary">
						{' '}
						Role :
						{recruiter?.role[0].toUpperCase() + recruiter?.role.slice(1)}
					</p>
					<div>
						{/* <button
							className="btn"
							// onClick={<ChatModal applicant={recruiter}></ChatModal>}
						>
							Send Message
						</button> */}
						<ChatModal applicant={recruiter}></ChatModal>
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
						<p>Company Name</p>
						<p className="text-xl"> {companyName}</p>
					</div>
					<div className="mt-2">
						<p>Employee Range</p>
						<p className="text-xl"> {employeeRange}</p>
					</div>
					<div className="mt-2">
						<p>Company Category</p>
						<p className="text-xl"> {companyCategory}</p>
					</div>
					<div className="mt-2">
						<p>RoleInCompany</p>
						<p className="text-xl"> {roleInCompany}</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default EmployerDetail
