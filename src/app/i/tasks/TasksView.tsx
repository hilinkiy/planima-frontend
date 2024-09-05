'use client'

import { ListView } from './list-view/ListView'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { Loader } from 'lucide-react'
import { SwitcherView } from '@/app/i/tasks/SwitcherView'
import { KanbanView } from '@/app/i/tasks/kanban-view/KanbanView'

export type TypeView = 'list' | 'kanban'

export function TasksView() {
	const [type, setType, isLoading] = useLocalStorage<TypeView>(
		{key: 'view-type', defaultValue: 'list'}
	)

	if(isLoading) return <Loader />

	return (
		<div>
			<SwitcherView type={type} setType={setType} />
			{type === 'list' ? <ListView /> : <KanbanView />}
		</div>
	)
}