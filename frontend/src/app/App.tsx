import { FC, lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Main } from '../pages/Main'
import { Header } from '../widgets/Header/Header';
import { Footer } from '../widgets/Footer';

import './styles/global.pcss';

const Courses = lazy(() => import("../pages/Courses/index"))

export const App: FC = () => {
	return (
		<BrowserRouter>
			<Header />

			<main className="main">
				<Suspense fallback={<div>Загрузка...</div>}>
					<Routes>
						<Route path="/" element={<Main />} />
						<Route path="/courses" element={<Courses />} />
						<Route path="*" element={<div>404 – страница не найдена</div>} />
					</Routes>
				</Suspense>
			</main>

			<Footer />
		</BrowserRouter>
	);
}
