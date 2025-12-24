import { FC } from 'react';
import { Logo } from '../../../shared/Logo';
import tg from '../../../app/assets/images/tg.svg'
import vk from '../../../app/assets/images/vk.svg'
import styles from './footer.module.pcss';



interface LegalArray {
	text: string;
}

const legalArray: LegalArray[] = [
	{ text: 'Политика конфиденциальности' },
	{ text: 'Условия и положения' },
];

export const Footer: FC = () => {
	const currentYear = new Date().getFullYear();

	return (
		<footer className={styles.footer}>
			<div className={styles['footer-inner']}>
				<Logo />
				<div className={styles.about}>
					<span className={styles['about-text']}>
						Мы здесь если есть вопросы
					</span>
					<div className={styles.socials}>
						<a className={styles['social-link']} href="#">
							<img className={styles['social-link-tg']} src={tg} alt="Телеграм"/>
						</a>
						<a className={styles['social-link']} href="#">
							<img className={styles['social-link-vk']} src={vk} alt="ВКонтакте"/>
						</a>
					</div>
				</div>
				<ul className={styles['legal-menu']}>
					{legalArray.map(i => (
						<li className={styles['legal-item']} key={i.text}>
							<span className={styles['legal-text']}>{i.text}</span>
						</li>
					))}
				</ul>
			</div>
			<span className={styles.copyright}>
				© {currentYear} КиберКот. Все права защищены.
			</span>
		</footer>
	);
};
