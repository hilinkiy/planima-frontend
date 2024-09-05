import { Metadata } from 'next'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { Heading } from '@/components/ui/Heading'
import { Timer } from '@/app/i/timer/Timer'

export const metadata: Metadata = {
	title: 'Timer',
	...NO_INDEX_PAGE
}

export default function TimerPage() {
	return (
		<div>
			<Heading title='Timer' />
			<Timer />
		</div>
	)
}