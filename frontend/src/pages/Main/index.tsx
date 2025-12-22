import { FC } from 'react';
import { Preview } from '../../widgets/Preview/Preview';
import { Courses } from '../../widgets/Courses';

export const Main: FC = () => {
	return (
		<>
			<Preview />
			<Courses />
		</>
	);
};
