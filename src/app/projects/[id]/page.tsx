"use client"

import React, { useState } from 'react'
import ProjectHeader from '../ProjectHeader'
import BoardView from '../BoardView'
import ListView from '../ListView'
import Timeline from '../TimeLine'
import TableView from '../Table'
import ModalNewTask from '@/app/(components)/ModalNewTask'


type Props = {
	params: { id: string }
}

const Project = ({ params }: Props) => {
	const { id } = params;
	const [activeTab, setActiveTab] = useState("Board");
	const [isModelNewTaskOpen, setIsModelNewTaskOpen] = useState(false);

	return (
		<div>

			<ModalNewTask
				isOpen={isModelNewTaskOpen}
				onClose={() => setIsModelNewTaskOpen(false)}
				id={id}
			/>
			<ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />

			{
				activeTab === "Board" && (
					<BoardView
						id={id}
						setIsModelNewTaskOpen={setIsModelNewTaskOpen}
					/>
				)
			}
			{
				activeTab === "List" && (
					<ListView
						id={id}
						setIsModelNewTaskOpen={setIsModelNewTaskOpen}
					/>
				)
			}
			{
				activeTab === "Timeline" && (
					<Timeline
						id={id}
						setIsModalNewTaskOpen={setIsModelNewTaskOpen}
					/>
				)
			}
			{
				activeTab === "Table" && (
					<TableView
						id={id}
						setIsModalNewTaskOpen={setIsModelNewTaskOpen}
					/>
				)
			}
		</div>
	)
}

export default Project