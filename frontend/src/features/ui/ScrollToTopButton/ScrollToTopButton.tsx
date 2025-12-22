import { FC } from 'react';

import Arrow from '../../../app/assets/images/arrow.svg';

import styles from './ScrollToTopButton.module.pcss';

export const ScrollToTopButton: FC = () => {
	return (
		<button className={styles['scroll-to-top']} onClick={() => null}>
			<Arrow />
		</button>
	);
};
