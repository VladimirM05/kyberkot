import { FC, useEffect, useState } from 'react';
import { getCourses } from '../../../api/courses';
import { CourseCard } from '../../../entities/ui/CourseCard';
import coursesBg from "../../../app/assets/images/courses.png";
import styles from './Courses.module.pcss';

interface Course {
	id: string;
	name: string;
	description: string;
	price: number;
	duration: number;
	difficulty: string;
}

const Courses: FC = () => {
	const [courses, setCourses] = useState<Course[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getCourses()
			.then(setCourses)
			.finally(() => setLoading(false));
	}, []);

	return (
		<section className={styles.courses} style={{backgroundImage: `url(${coursesBg})`}}>
			<div className="container">
				<h1 className={styles.title}>
					Выбери курс и начни путь к цифровой безопасности
				</h1>

				<div className={styles.filters}>
					<button className={styles.filter}>Все</button>
					<button className={styles.filter}>Для начинающих</button>
					<button className={styles.filter}>Продвинутые</button>

					<div className={styles.search}>
						<input placeholder="Поиск по курсам" />
					</div>
				</div>

				<div className={styles.grid}>
					{loading && <span>Загрузка...</span>}

					{courses.map(course => (
						<CourseCard
							key={course.id}
							id={course.id}
							title={course.name}
							descr={course.description}
							duration={course.duration}
							difficulty={course.difficulty}
							price={course.price}
						/>
					))}
				</div>
			</div>
		</section>
	);
};

export default Courses
