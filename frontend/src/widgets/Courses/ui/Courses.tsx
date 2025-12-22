import { FC } from 'react';
import courses from '../../../app/assets/images/courses.png';
import Paws from '../../../app/assets/images/paws.svg';
import styles from './Courses.module.pcss';
import { CourseCard } from '../../../entities/ui/CourseCard';
import { NavLink } from 'react-router-dom';

interface CoursesCards {
	title: string;
	descr: string;
	duration: number;
}

const coursesCards: CoursesCards[] = [
	{
		title: 'Основы кибербезопасности',
		descr:
			'Стартовый курс для новичков: базовые угрозы, защита данных, практика с КиберКотом.',
		duration: 12,
	},
	{
		title: 'Этичный хакинг',
		descr:
			'Учитесь тестировать системы на уязвимости с лучшими практиками и подсказками.',
		duration: 18,
	},
	{
		title: 'GDPR и Законодательство',
		descr:
			'Всё о защите данных и нормативных требованиях для бизнеса с советами по безопасности.',
		duration: 10,
	},
];

export const Courses: FC = () => {
	return (
		<section
			className={`section ${styles.courses}`}
			style={{ backgroundImage: `url(${courses})` }}
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
						{coursesCards.map(card => (
							<CourseCard
								title={card.title}
								descr={card.descr}
								duration={card.duration}
							/>
						))}
					</div>
					<NavLink className={styles['all-courses-btn']} to="/courses">
						Смотреть все курсы
					</NavLink>
				</div>
			</div>
			<Paws className={`${styles.paws} ${styles['paws-1']}`} />
			<Paws className={`${styles.paws} ${styles['paws-2']}`} />
		</section>
	);
};
