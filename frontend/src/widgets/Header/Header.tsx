import {FC, useState} from 'react';
import styles from './Header.module.pcss';
import { Logo } from '../../shared/Logo';
import { NavLink } from 'react-router-dom';
import AuthModal from "../AuthModal";
import {useAuth} from "../../app/context/AuthContext";

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
		text: 'О платформе',
		href: '/about',
	},
	{
		text: 'Контакты',
		href: '!#',
	},
];

export const Header: FC = () => {
	const { isAuth, logout } = useAuth();
	const [openAuth, setOpenAuth] = useState(false);

	return (
		<>
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

				{!isAuth ? (
					<button
						className={styles['reg-btn']}
						onClick={() => setOpenAuth(true)}
					>
						Войти
					</button>
				) : (
					<button
						className={styles['reg-btn']}
						onClick={logout}
					>
						Выйти
					</button>
				)}
			</header>

			{openAuth && <AuthModal onClose={() => setOpenAuth(false)} />}
		</>
	);
};
