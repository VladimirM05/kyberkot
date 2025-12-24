import { FC } from 'react';
import logoImg from '../../../app/assets/images/logo.svg';
import styles from "./Logo.module.pcss"
import { NavLink } from 'react-router-dom';

export const Logo: FC = () => {
	return (
		<NavLink className={styles.logo} to="/">
			<img className={styles['logo-img']} src={logoImg} alt="Иконка сайта"/>
			<span className={styles['logo-text']}>КИБЕРКОТ</span>
		</NavLink>
	);
};
