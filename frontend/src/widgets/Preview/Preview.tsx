import { FC } from 'react';
import preview from '../../app/assets/images/preview.png';
import cat from '../../app/assets/images/cat.png';
import logoImg from '../../app/assets/images/preview-logo.svg';
import styles from './preview.module.pcss';
import {NavLink} from "react-router-dom";


export const Preview: FC = () => {
	return (
		<section
			className={styles.preview}
			style={{ backgroundImage: `url(${preview})` }}
		>
			<div className="container">
				<div className={styles['preview-inner']}>
					<img className={styles['logo-img']} src={logoImg} alt="Иконка сайта"/>
					<h1 className={styles['preview-title']}>
						Погрузись в мир кибербезопасности
					</h1>
					<span className={styles['preview-text']}>
						Учись защищать себя и свои данные в цифровом мире,
						<br />
						защити свое будущее и получи знания по кибербезопасности с
						<br />
						КиберКотом!
					</span>
					<NavLink className={styles['start-course-btn']} to="courses/">
						Начать обучение
					</NavLink>
				</div>
			</div>
			<img className={styles.cat} src={cat} alt="Кошечка" />
		</section>
	);
};
