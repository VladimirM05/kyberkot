import { FC } from 'react';
import styles from './Header.module.pcss';
import { Logo } from '../../shared/Logo';
import { NavLink } from 'react-router-dom';

interface MenuLinks {
	text: string;
	href: string;
}

const menuLinks: MenuLinks[] = [
	{
		text: 'Курсы',
		href: '/courses',
	},
	{
		text: 'Тесты',
		href: '!#',
	},
	{
		text: 'Стоимость',
		href: '!#',
	},
	{
		text: 'О платформе',
		href: '!#',
	},
	{
		text: 'Контакты',
		href: '!#',
	},
];

export const Header: FC = () => {
	return (
		<header className={styles.header}>
			<Logo />
			<ul className={styles['menu-list']}>
				{menuLinks.map(link => (
					<li className={styles['menu-item']} key={link.text}>
						<NavLink className={styles['menu-link']} to={link.href}>
							{link.text}
						</NavLink>
					</li>
				))}
			</ul>
			<a className={styles['reg-btn']} href="!#">
				Войти
			</a>
		</header>
	);
};
