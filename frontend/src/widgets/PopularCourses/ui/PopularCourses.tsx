import { FC, useEffect, useState } from 'react';
import coursesBg from '../../../app/assets/images/courses.png';
import paws from '../../../app/assets/images/paws.svg';
import styles from './PopularCourses.module.pcss';
import { CourseCard } from '../../../entities/ui/CourseCard';
import { NavLink } from 'react-router-dom';
import { getCourses } from '../../../api/courses';

interface Course {
	id: string;
	name: string;
	description: string;
	price: number;
	duration: number;
	difficulty: string;
}

export const PopularCourses: FC = () => {
	const [courses, setCourses] = useState<Course[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getCourses()
			.then(setCourses)
			.finally(() => setLoading(false));
	}, []);

	return (
		<section
			className={`section ${styles.courses}`}
			style={{ backgroundImage: `url(${coursesBg})` }}
		>
			<div className="container">
				<div className={styles['courses-inner']}>
					<div className={styles['courses-titles']}>
						<h2 className={styles['courses-title']}>Популярные курсы</h2>
						<h4 className={styles['courses-subtitle']}>
							Выбери курс и начни путь к цифровой безопасности
						</h4>
					</div>

					<div className={styles['courses-cards']}>
						{loading && <span>Загрузка...</span>}

						{courses.map(course => (
							<CourseCard
								id={course.id}
								key={course.name}
								title={course.name}
								descr={course.description}
								duration={course.duration}
								difficulty={course.difficulty}
								price={course.price}
							/>
						))}
					</div>

					<NavLink className={styles['all-courses-btn']} to="/courses">
						Смотреть все курсы
					</NavLink>
				</div>
			</div>

			<img className={`${styles.paws} ${styles['paws-1']}`} src={paws} alt="Лапки"/>
			<img className={`${styles.paws} ${styles['paws-2']}`} src={paws} alt="Лапки"/>
		</section>
	);
};
