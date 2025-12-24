import { FC, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCourses} from '../../../api/courses';
import styles from './Course.module.pcss';
import {useAuth} from "../../../app/context/AuthContext";

interface CourseData {
    id: string;
    name: string;
    description: string;
    price: number;
    duration: number;
    difficulty: string;
}

type Tab = 'description' | 'content' | 'bookmarks';

const Course: FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [course, setCourse] = useState<CourseData | null>(null);
    const [loading, setLoading] = useState(true);
    const [tab, setTab] = useState<Tab>('description');

    const { isAuth } = useAuth();


    useEffect(() => {
        getCourses()
            .then((courses: CourseData[]) => {
                const found = courses.find(c => c.id === id);
                setCourse(found || null);
            })
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return (
            <section className={styles.course}>
                <div className="container">Загрузка...</div>
            </section>
        );
    }

    if (!course) {
        return (
            <section className={styles.course}>
                <div className="container">Курс не найден</div>
            </section>
        );
    }

    return (
        <section className={styles.course}>
            <div className="container">
                <div className={styles.layout}>

                    <aside className={styles.left}>
                        <h1 className={styles.title}>{course.name}</h1>

                        <div className={styles.progress}>
                            <div className={styles.progressBar} />
                            <span>0% материалов пройдено</span>
                        </div>

                        <button
                            className={styles.start}
                            disabled={!isAuth}
                            onClick={() => navigate(`/courses/${course.id}/learn`)}
                        >
                            {isAuth ? "Начать" : "Войдите, чтобы начать"}
                        </button>

                        <nav className={styles.menu}>
                            <button
                                className={tab === 'description' ? styles.active : ''}
                                onClick={() => setTab('description')}
                            >
                                Описание
                            </button>
                            <button
                                className={tab === 'content' ? styles.active : ''}
                                onClick={() => setTab('content')}
                            >
                                Содержание
                            </button>
                            <button
                                className={tab === 'bookmarks' ? styles.active : ''}
                                onClick={() => setTab('bookmarks')}
                            >
                                Закладки
                            </button>
                        </nav>
                    </aside>

                    <main className={styles.content}>
                        {tab === 'description' && (
                            <>
                                <h2>О курсе</h2>
                                <p className={styles["course-description"]}>Пройдя данный курс, вы научитесь безошибочно распознавать поддельные письма, СМС и сообщения. Практические уроки и симулятор атак дадут вам навыки, которые сразу защитят ваши деньги и данные от кибермошенников.<br />
                                    Кибербезопасность — это не скучные правила для IT-специалистов. Это цифровые привычки, которые становятся таким же естественным щитом, как ключ от входной двери.<br />
                                    Что будет в этом курсе?<br />
                                    Мы не будем грузить вас сложными терминами, а объясним все на понятных примерах из жизни.<br />
                                    Мы дадим вам практические инструменты, которые защитят вас уже сегодня:<br />
                                    •  Вы научитесь видеть удочку мошенников за километр. Узнаете, как отличить настоящее письмо от банка от фишинговой подделки, и что делать, если друг в мессенджере просит «одолжить денег».<br />
                                    •  Вы превратите свои пароли из слабого звена в надежную защиту. Поймете, почему 123456 — это катастрофа, и как создать один главный пароль, который запомните только вы, а все остальные за вас создаст и надежно сохранит умная программа.<br />
                                    •  Вы поймете, какая информация о вас в соцсетях — золотая жила для злоумышленников и как своими постами мы иногда сами помогаем им нас обмануть.<br />
                                    Главный миф, который мы развеем: «Мошенникам нечего взять с обычного человека».<br />
                                    Правда: Ваши данные — это деньги. Ваши аккаунты — это инструменты. Ваша личность — это прикрытие.<br />
                                    Мы подготовили для вас не просто лекции, а интерактивные симуляторы, где вы в безопасной среде потренируетесь отражать атаки, и четкие чек-листы, которые помогут не упустить ничего важного.<br />
                                    Начните этот путь длиной в несколько часов, чтобы на годы вперед обезопасить свою цифровую жизнь.</p>

                                <h3>Детали курса</h3>
                                <ul>
                                    <li>Длительность: {course.duration} часов</li>
                                    <li>Уровень: {course.difficulty}</li>
                                </ul>

                                <h3>Для кого этот курс</h3>
                                <p>
                                    Для пользователей, которые хотят повысить уровень
                                    цифровой безопасности и защитить свои данные.
                                </p>
                            </>
                        )}

                        {tab === 'content' && (
                            <>
                                <h2>Содержание курса</h2>
                                <ul>
                                    <li>Урок 1. Фишинг: как распознать удочку мошенников</li>
                                    <li>Урок 2. Главные признаки фишинговых атак</li>
                                    <li>Урок 3. Мобильный фишинг: СМС и поддельные приложения</li>
                                    <li>Урок 4. Отработка навыков</li>
                                    <li>Тест 1</li>
                                    <li>Тест 2</li>
                                    <li>Тест 3</li>
                                </ul>
                            </>
                        )}

                        {tab === 'bookmarks' && (
                            <>
                                <h2>Закладки</h2>
                                <p>У вас пока нет сохранённых материалов.</p>
                            </>
                        )}
                    </main>

                    <aside className={styles.right}>
                        <div className={styles.card}>
                            <h4>Сертификат</h4>
                            <p>Сертификат выдается</p>
                        </div>

                        <div className={styles.card}>
                            <h4>В курс входят</h4>
                            <ul>
                                <li>4 урока</li>
                                <li>3 теста</li>
                            </ul>
                        </div>
                    </aside>

                </div>
            </div>
        </section>
    );
};

export default Course;
