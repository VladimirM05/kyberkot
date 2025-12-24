import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CourseTheme, getCourseThemes } from '../../../api/course_themes';
import { ThemeBlock, getThemeBlocks } from '../../../api/theme_blocks';
import styles from './CourseLearn.module.pcss';

const API_HOST = 'http://localhost:8000';

const getImageUrl = (img?: string) => {
    if (!img) return '';
    if (img.startsWith('http')) return img;
    return `http://localhost:8000/media/${img.replace(/^\/+/, '')}`;
};

const CourseLearn: FC = () => {
    const { id: courseId } = useParams<{ id: string }>();

    const [themes, setThemes] = useState<CourseTheme[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [blocks, setBlocks] = useState<ThemeBlock[]>([]);
    const [progress, setProgress] = useState(0);
    const [loading, setLoading] = useState(true);

    const progressKey = `progress-${courseId}`;

    /* Загрузка тем курса */
    useEffect(() => {
        if (!courseId) return;

        getCourseThemes(courseId)
            .then(data => {
                const sorted = [...data].sort((a, b) => a.order - b.order);
                setThemes(sorted);

                const saved = Number(localStorage.getItem(progressKey)) || 0;
                setProgress(Math.min(saved, sorted.length - 1));
                setActiveIndex(0);
            })
            .finally(() => setLoading(false));
    }, [courseId]);

    /* Загрузка блоков темы */
    useEffect(() => {
        if (!themes[activeIndex]) return;

        getThemeBlocks(themes[activeIndex].id).then(data => {
            setBlocks([...data].sort((a, b) => a.order - b.order));
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }, [themes, activeIndex]);

    /* Навигация */
    const nextTheme = () => {
        if (activeIndex < themes.length - 1) {
            const next = activeIndex + 1;
            setActiveIndex(next);

            const newProgress = Math.max(progress, next);
            setProgress(newProgress);
            localStorage.setItem(progressKey, String(newProgress));
        }
    };

    const prevTheme = () => {
        if (activeIndex > 0) setActiveIndex(activeIndex - 1);
    };

    /* Переход по вкладкам */
    const goToTheme = (index: number) => {
        if (index <= progress) setActiveIndex(index);
    };

    const completed = progress;

    if (loading) {
        return (
            <section className={styles.course}>
                <div className="container">Загрузка курса…</div>
            </section>
        );
    }

    return (
        <section className={styles.course}>
            <div className="container">
                <div className={styles.wrapper}>

                    {/* Табы тем */}
                    <div className={styles.tabs}>
                        {themes.map((t, i) => (
                            <button
                                key={t.id}
                                disabled={i > progress}
                                className={`
                                    ${i === activeIndex ? styles.active : ''}
                                    ${i <= progress ? styles.done : ''}
                                `}
                                onClick={() => goToTheme(i)}
                            >
                                {t.name}
                            </button>
                        ))}
                    </div>

                    {/* Прогресс */}
                    {themes.length > 0 && (
                        <div className={styles.progress}>
                            <div className={styles.progressInfo}>
                                Пройдено тем: {completed + 1} из {themes.length}
                            </div>
                            <div className={styles.progressBar}>
                                <div
                                    className={styles.progressFill}
                                    style={{
                                        width: `${((completed + 1) / themes.length) * 100}%`
                                    }}
                                />
                            </div>
                        </div>
                    )}

                    {/* Контент темы */}
                    <article className={styles.content}>
                        {blocks.length === 0 && (
                            <p className={styles.empty}>Материал загружается…</p>
                        )}
                        {blocks.map(block => {
                            switch (block.block_type) {
                                case 'title':
                                    return <h2 key={block.id}>{block.title}</h2>;
                                case 'text':
                                    return <p key={block.id}>{block.text}</p>;
                                case 'image':
                                    return (
                                        <img
                                            key={block.id}
                                            src={getImageUrl(block.image)}
                                            alt=""
                                            className={styles.image}
                                        />
                                    );
                                default:
                                    return null;
                            }
                        })}
                    </article>

                    {/* Навигация */}
                    <div className={styles.nav}>
                        <button
                            onClick={prevTheme}
                            disabled={activeIndex === 0}
                            style={{ visibility: activeIndex === 0 ? 'hidden' : 'visible' }}
                        >
                            Назад
                        </button>
                        <button
                            onClick={nextTheme}
                            disabled={activeIndex >= themes.length - 1}
                            style={{ visibility: activeIndex >= themes.length - 1 ? 'hidden' : 'visible' }}
                        >
                            Далее
                        </button>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default CourseLearn;
