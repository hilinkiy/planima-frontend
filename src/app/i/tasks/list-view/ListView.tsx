'use client'

import { DragDropContext } from '@hello-pangea/dnd'
import { useTasks } from '@/app/i/tasks/hooks/useTasks'
import { useTaskDnd } from '@/app/i/tasks/hooks/useTaskDnd'
import styles from './ListView.module.scss'
import { COLUMNS } from '@/app/i/tasks/columns.data'
import { ListRowParent } from '@/app/i/tasks/list-view/ListRowParent'

export function ListView() {
	const { items, setItems } = useTasks()
	const { onDragEnd } = useTaskDnd()

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<div className={styles.table}>
				<div className={styles.header}>
					<div>Task name</div>
					<div>Due date</div>
					<div>Priority</div>
					<div className='flex items-center justify-center'></div>
				</div>
				<div className={styles.parentsWrapper}>
					{COLUMNS.map(column => (
						<ListRowParent value={column.value} label={column.label} items={items} setItems={setItems} key={column.value} />
					))}
				</div>
			</div>
		</DragDropContext>
	)
}