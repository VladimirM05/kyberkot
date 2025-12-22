import { FC } from 'react';
import LogoImg from '../../../app/assets/images/logo.svg';
import styles from "./Logo.module.pcss"
import { NavLink } from 'react-router-dom';

export const Logo: FC = () => {
	return (
		<NavLink className={styles.logo} to="/">
			<LogoImg className={styles['logo-img']} />
			<span className={styles['logo-text']}>КИБЕРКОТ</span>
		</NavLink>
	);
};
