import { FC } from 'react';
import CourseIcon from '../../../app/assets/images/course-icon.svg';
import styles from './CourseCard.module.pcss';

interface CourseCardProps {
	title: string;
	descr: string;
	duration: number;
}

export const CourseCard: FC<CourseCardProps> = ({ title, descr, duration }) => {
	return (
		<div className={styles.course} key={title}>
			<div className={styles['course-title']}>
				<CourseIcon className={styles['course-title-img']} />
				<h6 className={styles['course-title-text']}>{title}</h6>
			</div>
			<span className={styles['course-descr']}>{descr}</span>
			<span className={styles['course-duration']}>{`${duration}+ часов`}</span>
			<a className={styles['course-btn']} href="!#">
				Подробнее
			</a>
		</div>
	);
};
