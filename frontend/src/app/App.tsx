import { FC, lazy, Suspense } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom';

import {AuthProvider} from "./context/AuthContext";
import { Main } from '../pages/Main'
import { Header } from '../widgets/Header/Header';
import { Footer } from '../widgets/Footer';

const Course = lazy(() => import("../pages/Course/index"))
const Courses = lazy(() => import("../pages/Courses/index"))
const CourseLearn = lazy(() => import("../pages/CourseLearn/index"))
const About = lazy(() => import("../pages/About/index"))

import './styles/global.pcss';


export const App: FC = () => {
	return (
		<AuthProvider>
			<HashRouter>
				<Header />
				<main className="main">
					<Suspense fallback={<div>Загрузка...</div>}>
						<Routes>
							<Route path="/" element={<Main />} />
							<Route path="/courses" element={<Courses />} />
							<Route path="/courses/:id" element={<Course />} />
							<Route path="/courses/:id/learn" element={<CourseLearn />} />
							<Route path="/about" element={<About />} />
							<Route path="*" element={<div>404 – страница не найдена</div>} />
						</Routes>
					</Suspense>
				</main>
				<Footer />
			</HashRouter>
		</AuthProvider>
	);
}
