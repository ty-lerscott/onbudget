import React from 'react'
import cn from 'classnames'
import { SkeletonText } from 'carbon-components-react'

import './Category.scss'

const CategorySkeleton = () => (
	<li
		data-testid='CategorySkeleton'
		className={cn('Category', 'CategorySkeleton')}
		style={{
			borderLeftColor: 'var(--shadow)'
		}}>
		<div className='left'>
			<span className='title'>
				<SkeletonText />
			</span>
			<span className='transactions'>
				<SkeletonText />
			</span>
		</div>
		<div className='right flex align-center'>
			<span className='amount'>
				<SkeletonText />
			</span>
		</div>
	</li>
)

export default CategorySkeleton
