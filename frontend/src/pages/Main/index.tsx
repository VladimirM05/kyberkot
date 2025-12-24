import { FC } from 'react';
import { Preview } from '../../widgets/Preview/Preview';
import { PopularCourses } from '../../widgets/PopularCourses';

export const Main: FC = () => {
	return (
		<>
			<Preview />
			<PopularCourses />
		</>
	);
};
