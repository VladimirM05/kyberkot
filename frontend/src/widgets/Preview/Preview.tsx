import { FC } from 'react';
import preview from '../../app/assets/images/preview.png';
import cat from '../../app/assets/images/cat.png';
import Logo from '../../app/assets/images/preview-logo.svg';
import styles from './preview.module.pcss';


export const Preview: FC = () => {
	return (
		<section
			className={styles.preview
				
			}
			style={{ backgroundImage: `url(${preview})` }}
		>
			<div className="container">
				<div className={styles['preview-inner']}>
					<Logo className={styles['preview-logo-img']} />
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
					<a className={styles['start-course-btn']} href="!#">
						Начать обучение
					</a>
				</div>
			</div>
			<img className={styles.cat} src={cat} alt="Кошечка" />
		</section>
	);
};
