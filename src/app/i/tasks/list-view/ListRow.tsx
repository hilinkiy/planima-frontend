import type { ITaskResponse, TypeTaskFormState } from '@/types/task.types'
import type { Dispatch, SetStateAction } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTaskDebounce } from '@/app/i/tasks/hooks/useTaskDebounce'
import cn from 'clsx'
import { GripVertical, Loader, Trash } from 'lucide-react'
import Checkbox from '@/components/ui/checkbox'
import { TransparentField } from '@/components/ui/fields/TransparentField'
import { DatePicker } from '@/components/ui/task-edit/date-picker/DatePicker'
import { SingleSelect } from '@/components/ui/task-edit/date-picker/SingleSelect'
import { useDeleteTask } from '@/app/i/tasks/hooks/useDeleteTask'
import styles from './ListView.module.scss'

interface IListRow {
	item: ITaskResponse
	setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>
}

export function ListRow({item, setItems}: IListRow) {
	const {register, control, watch} = useForm<TypeTaskFormState>({
		defaultValues: {
			name: item.name,
			isCompleted: item.isCompleted,
			createdAt: item.createdAt,
			priority: item.priority,
		}
	})

	useTaskDebounce({watch, itemId: item.id})

	const { deleteTask, isDeletePending } = useDeleteTask()

	return (
		<div className={cn(
			styles.row,
			watch('isCompleted') ? styles.completed : '',
			'animation-opacity'
		)}>
			<div>
				<span className='inline-flex items-center gap-2.5 w-full'>
					<button aria-describedby='todo-item'>
						<GripVertical className={styles.grip} />
					</button>
					<Controller
						render={({ field: { value, onChange } }) => (
							<Checkbox onChange={onChange} checked={value} />
						)}
						name='isCompleted' control={control} />
					<TransparentField {...register('name')} />
				</span>
			</div>
			<div>
				<Controller render={({field: {value, onChange}}) => (
					<DatePicker onChange={onChange} value={value || ''} />
				)} name='createdAt' control={control} />
			</div>
			<div className='capitalize'>
				<Controller render={({field: {value, onChange}}) => (
					<SingleSelect
						data={['high', 'medium', 'low'].map(item => ({
							value: item,
							label: item
						}))}
						onChange={onChange}
						value={value || ''}
					/>
				)} name='priority' control={control} />
			</div>
			<div>
				<button
					onClick={() => item.id ? deleteTask(item.id) : setItems(prev => prev?.slice(0, -1))}
					className='opacity-50 transition-opacity hover:opacity-100'>
					{isDeletePending ? <Loader size={15} /> : <Trash size={15} />}
				</button>
			</div>
		</div>
	)
}