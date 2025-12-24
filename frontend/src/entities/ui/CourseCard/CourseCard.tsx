import { FC } from 'react';
import courseIcon from '../../../app/assets/images/course-icon.svg';
import styles from './CourseCard.module.pcss';
import { NavLink } from "react-router-dom";

interface CourseCardProps {
    id: string;
    key: string;
    title: string;
    descr: string;
    duration: number;
    difficulty: string;
    price?: number;
}

export const CourseCard: FC<CourseCardProps> = ({
    id,
    key,
    title,
    descr,
    duration,
    difficulty,
    price = 0,
}) => {
    return (
        <NavLink to={`/courses/${id}`} className={styles.course} key={key}>
            <div className={styles['course-title']}>
                <img className={styles['course-title-img']} src={courseIcon} alt={"Иконка курса"}/>
                <h6 className={styles['course-title-text']}>{title}</h6>
            </div>

            <p className={styles['course-descr']} title={descr}>
                {descr}
            </p>

            <div className={styles['course-meta']}>
                <span className={styles['course-duration']}>
                    {`${duration}+ часов`}
                </span>

                <span className={styles['course-difficulty']}>
                    {difficulty}
                </span>
            </div>

            <span className={Number(price) === 0 ? styles['course-free'] : styles['course-price']}>
                {Number(price) === 0 ? 'Бесплатно' : `${Number(price).toFixed(0)} ₽`}
            </span>

            <span className={styles['course-btn']}>Подробнее</span>
        </NavLink>
    );
};
