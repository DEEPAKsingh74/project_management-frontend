import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export interface Project {
	id: number,
	name: string,
	description?: string,
	startDate?: string,
	endDate?: string,
}

export enum Status {
	ToDo = "To Do",
	WorkInProgress = "Work In Progress",
	UnderReview = "Under Review",
	Completed = "Completed"
}

export enum Priority {
	Urgent = "Urgent",
	High = "High",
	Medium = "Medium",
	Low = "Low",
	Backlog = "Backlog"
}

export interface User {
	userId: string,
	username: string,
	email: string,
	profilePictureUrl?: string,
	cognitoId?: string,
	teamId?: number
}

export interface SearchResults {
	tasks?: Task[];
	projects?: Project[];
	users?: User[];
}

export interface Team {
	teamId: number;
	teamName: string;
	productOwnerUserId?: number;
	projectManagerUserId?: number;
}




export interface Attachment {
	id: number,
	fileURL: string,
	fileName: string,
	taskId: number,
	uploadedById: number
}

export interface Task {
	id: number,
	title: string,
	description?: string,
	status?: Status,
	priority?: Priority,
	tags?: string,
	startDate?: string,
	dueDate?: string,
	points?: number,
	projectId: number,
	authorUserId?: number,
	assignedUserId?: number

	author?: User,
	assignee?: User,
	comments?: Comment[],
	attachments?: Attachment[]
}


export const api = createApi({
	baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
	reducerPath: "api",
	tagTypes: ["Projects", "Tasks", "Users", "Teams"],
	endpoints: (build) => ({
		getProjects: build.query<Project[], void>({
			query: () => "projects",
			providesTags: ["Projects"]
		}),

		createProject: build.mutation<Project, Partial<Project>>({
			query: (project) => ({
				url: "projects",
				method: "POST",
				body: project
			}),
			invalidatesTags: ["Projects"]
		}),

		getTasks: build.query<Task[], { projectId?: number | null }>({
			query: ({ projectId }) =>
				projectId ? `tasks?projectId=${projectId}` : 'tasks', // If projectId is provided, append it to the query string, otherwise fetch all tasks.
			providesTags: (result) =>
				result
					? result.map(({ id }) => ({ type: "Tasks" as const, id }))
					: [{ type: "Tasks" as const }],
		}),


		createTasks: build.mutation<Task, Partial<Task>>({
			query: (task) => ({
				url: "tasks",
				method: "POST",
				body: task
			}),
			invalidatesTags: ["Tasks"]
		}),

		updateTaskStatus: build.mutation<Task, { taskId: number, status: string }>({
			query: ({ taskId, status }) => ({
				url: `tasks/${taskId}/status`,
				method: "POST",
				body: { status }
			}),
			invalidatesTags: (result, err, { taskId }) =>
				[{ type: "Tasks", id: taskId }]
		}),

		getUsers: build.query<User[], void>({
			query: () => "users",
			providesTags: ["Users"],
		}),
		createUser: build.mutation<User, Partial<User>>({
			query: (user) => ({
				url: "users",
				method: "POST",
				body: user
			}),
			invalidatesTags: ["Users"]
		}),
		getTeams: build.query<Team[], void>({
			query: () => "teams",
			providesTags: ["Teams"],
		}),
		search: build.query<SearchResults, string>({
			query: (query) => `search?query=${query}`,
		}),
	})
})


export const { useGetProjectsQuery, useCreateProjectMutation, useGetTasksQuery, useCreateTasksMutation,
	useUpdateTaskStatusMutation, useGetUsersQuery, useGetTeamsQuery, useSearchQuery, useCreateUserMutation
} = api;