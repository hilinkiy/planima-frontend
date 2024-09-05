import debounce from 'lodash.debounce'
import { useCallback, useEffect } from 'react'
import { TypeTaskFormState } from '@/types/task.types'
import { useUpdateTasks } from '@/app/i/tasks/hooks/useUpdateTasks'
import { useCreateTask } from '@/app/i/tasks/hooks/useCreateTask'
import { UseFormWatch } from 'react-hook-form'

interface IUseTaskDebounce {
	watch: UseFormWatch<TypeTaskFormState>
	itemId: string
}

export function useTaskDebounce({watch, itemId}: IUseTaskDebounce) {
	const {updateTask} = useUpdateTasks()
	const {createTask} = useCreateTask()

	const debounceCreateTask = useCallback(
		debounce((formData: TypeTaskFormState) => {
			createTask(formData)
		}, 444),
		[]
	)

	const debounceUpdateTask = useCallback(
		debounce((formData: TypeTaskFormState) => {
			updateTask({id: itemId, data: formData})
		}, 444),
		[]
	)

	useEffect(() => {
		const { unsubscribe } = watch(formData => {
			if (itemId) {
				debounceUpdateTask({
					...formData,
					priority: formData.priority || undefined
				})
			} else {
				debounceCreateTask(formData)
			}
		})

		return () => {
			unsubscribe()
		}
	}, [watch(), debounceUpdateTask, debounceCreateTask])
}