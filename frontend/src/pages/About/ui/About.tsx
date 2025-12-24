import { FC } from 'react';
import aboutBg from '../../../app/assets/images/courses.png';
import styles from './About.module.pcss';

const About: FC = () => {
    return (
        <section className={`section ${styles.about}`} style={{ backgroundImage: `url(${aboutBg})` }}>
            <div className="container">
                <div className={styles.inner}>
                    <h2 className={styles.title}>О платформе</h2>

                    <p className={styles.text}>
                        Данная образовательная платформа разработана с целью системного
                        повышения уровня цифровой грамотности пользователей и формирования
                        устойчивых навыков кибербезопасности.
                    </p>

                    <p className={styles.text}>
                        Основная задача платформы — трансформировать комплексные аспекты
                        информационной безопасности в доступные для усвоения практические
                        модели, обеспечивающие эффективную защиту персональных данных и
                        цифровых активов.
                    </p>

                    <p className={styles.text}>
                        Платформа реализует практико-ориентированную модель обучения,
                        исключающую избыточное использование специальной терминологии.
                        Образовательный контент построен на анализе типовых ситуаций,
                        моделирующих реальные угрозы цифрового пространства.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default About;
