import type { ITaskResponse } from '@/types/task.types'
import type { Dispatch, SetStateAction } from 'react'
import { Draggable, Droppable } from '@hello-pangea/dnd'
import styles from './ListView.module.scss'
import { ListRow } from '@/app/i/tasks/list-view/ListRow'
import { combine } from '@hello-pangea/dnd/src/animation'
import { FILTERS } from '@/app/i/tasks/columns.data'
import { ListAddRowInput } from '@/app/i/tasks/list-view/ListAddRowInput'
import { filterTasks } from '@/app/i/tasks/filter-tasks'

interface IListRowParent {
	value: string
	label: string
	items: ITaskResponse[] | undefined
	setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>
}

export function ListRowParent({
	value, label, items, setItems,
} : IListRowParent) {
	return (
		<Droppable droppableId={value}>
			{provided => (
					<div
						ref={provided.innerRef}
						{...provided.droppableProps}
					>
						<div className={styles.colHeading}>
							<div className='w-full'>{label}</div>
						</div>
						{filterTasks(items, value)?.map((item, index) => (
							<Draggable draggableId={item.id} index={index} key={item.id}>
								{provided => (
									<div
										ref={provided.innerRef}
										{...provided.draggableProps}
										{...provided.dragHandleProps}
									>
										<ListRow item={item} setItems={setItems} key={item.id} />
									</div>
								)}
							</Draggable>
						))}

						{provided.placeholder}
						{value !== 'completed' && !items?.some(item => !item.id) && (
							<ListAddRowInput setItems={setItems} filterDate={FILTERS[value] ? FILTERS[value].format() : undefined} />
						)}

					</div>
			)}
		</Droppable>
	)
}