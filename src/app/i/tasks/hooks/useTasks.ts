import { useQuery } from '@tanstack/react-query'
// @ts-ignore
import { taskService } from '@/services/task.service'
import { useEffect, useState } from 'react'
// @ts-ignore
import { ITaskResponse } from '@/types/task.types'

export function useTasks() {
	const {data} = useQuery({
		queryKey: ['tasks'],
		queryFn: () => taskService.getTasks()
	});

	const [items, setItems] = useState<ITaskResponse[] | undefined>(data?.data)

	useEffect(() => {
		setItems(data?.data)
	}, [data?.data])

	return {items, setItems}
}