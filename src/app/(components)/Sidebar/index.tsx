"use client"

import { useAppDispatch, useAppSelector } from '@/app/redux';
import { setIsSidebarCollapsed } from '@/state';
import { useGetProjectsQuery } from '@/state/api';
import { AlertCircle, AlertOctagon, AlertTriangle, Briefcase, ChevronDown, ChevronUp, Home, Layers3, LockIcon, LucideIcon, Search, Settings, ShieldAlert, User, Users, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react'

const Sidebar = () => {

	const [showProjects, setShowProjects] = useState(true);
	const [showPriorities, setShowPriorities] = useState(true);

	const {data: projects} = useGetProjectsQuery();

	const dispatch = useAppDispatch();
	const isSidebarCollapsed = useAppSelector(state => state.global.isSidebarCollapsed);
	const isDarkMode = useAppSelector(state => state.global.isDarkMode);

	const sidebarClassNames = `flex flex-col fixed h-[100%] justify-between shadow-xl transition-all duration-300 h-full z-40 dark:bg-black overflow-y-auto bg-white ${
		isSidebarCollapsed ? "w-0 hidden" : "w-64"
	}`

	return (
		<div className={`${sidebarClassNames}`}>
			<div className='flex h-[100%] w-full flex-col justify-start'>
				{/* logo */}
				<div className='z-50 flex min-h-[56px] w-64 items-center justify-between bg-white px-6 pt-3 dark:bg-black'>
					<div className='text-xl font-bold text-gray-800 dark:text-white'>
						PLANNIFY
					</div>

					{
						isSidebarCollapsed ? null : (
							<button className='py-3'
							onClick={()=> dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))}>
								<X className='h-6 w-6 text-gray-800 hover:text-gray-500 dark:text-white'/>
							</button>
						)
					}
				</div>

				{/* Team */}

				<div className='flex items-center gap-5 border-y-[1.5px] border-gray-500 px-8 py-4 dark:border-gray-700'>
					<Image
						src="/pl_logo.png"
						alt='logo'
						width={50}
						height={50}
						className='rounded-full w-[4rem] h-[3rem]'
					/>

					<div className=''>
						<h3 className='text-md font-bold tracking-wide dark:text-gray-200'>
						PLANNIFY TEAM
						</h3>

						<div className='mt-1 flex items-start gap-2'>
							<LockIcon className='mt-[0.1rem] h-3 w-3 text-gray-500 dark:gray-400' />
							<p className='text-xs text-gray-500'>Private</p>
						</div>
					</div>
				</div>

				{/* navbar links */}

				<nav className='w-full z-10'>
					<SideBarLinks
						icon={Home}
						label='Home'
						href='/'
					/>
					<SideBarLinks
						icon={Briefcase}
						label='TimeLine'
						href='/timeline'
					/>
					<SideBarLinks
						icon={Search}
						label='Search'
						href='/search'
					/>
					<SideBarLinks
						icon={Settings}
						label='Settings'
						href='/settings'
					/>
					<SideBarLinks
						icon={User}
						label='Users'
						href='/users'
					/>
					<SideBarLinks
						icon={Users}
						label='Team'
						href='/teams'
					/>
				</nav>

				<button onClick={()=> setShowProjects(!showProjects)}
					className='flex w-full items-center justify-between px-8 py-3 text-gray-500'>
						<span className=''>
							Projects
						</span>
						{
							showProjects ? (
								<ChevronUp className='h-5 w-5'/>
							) : (
								<ChevronDown className='h-5 w-5'/>
							)
						}
				</button>


				{
					showProjects && (
						projects?.map((project, index) => <SideBarLinks key={project.id} icon={Briefcase} label={project.name} href={`/projects/${project.id}`}/>)
					)
				}

				{/* projects list */}

				<button onClick={()=> setShowPriorities(!showPriorities)}
					className='flex w-full items-center justify-between px-8 py-3 text-gray-500'>
						<span className=''>
							Priorities
						</span>
						{
							showPriorities ? (
								<ChevronUp className='h-5 w-5'/>
							) : (
								<ChevronDown className='h-5 w-5'/>
							)
						}
				</button>

				{
					showPriorities && (
						<>
							<SideBarLinks href='/priority/urgent' icon={AlertCircle} label='Urgent'/>
							<SideBarLinks href='/priority/high' icon={ShieldAlert} label='High'/>
							<SideBarLinks href='/priority/medium' icon={AlertTriangle} label='Medium'/>
							<SideBarLinks href='/priority/low' icon={AlertOctagon} label='Low'/>
							<SideBarLinks href='/priority/backlog' icon={Layers3} label='Backlog'/>
						</>
					)
				}

			</div>
		</div>
	)
}


interface sideBarLinkProps {
	href: string,
	icon: LucideIcon,
	label: string,
	isCollapsed?: boolean
}

const SideBarLinks = ({
	href,
	icon: Icon,
	label, 
	isCollapsed,
}: sideBarLinkProps) => {

	const pathName = usePathname();
	const isActive = pathName === href || (pathName === "/" && href === "/dashboard");


	return (
		<Link
			href={href}
			className='w-full'
		>
			<div className={`relative flex cursor-pointer items-center gap-3 transition-colors hover:bg-gray-100 dark:bg-black dark:hover:bg-gray-700 
				${
					isActive ? "bg-grau-100 text-white dark:bg-gray-600" : ""
				} justify-start px-8 py-3 `}>

				{
					isActive && <div className="absolute left-0 top-0 h-[100%] w-[5px] bg-blue-200/70 rounded-md"/>
				}

				<Icon className='w-6 h-6 text-gray-800 dark:text-gray-100 '/>
				<span className={`font-medium text-gray-800 dark:text-gray-100`}>
					{label}
				</span>

			</div>

		</Link>
	)
}


export default Sidebar