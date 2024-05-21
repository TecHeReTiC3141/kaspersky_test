import { Link } from "react-router-dom";

export default function HomePage() {

    return (
        <main className="flex flex-col items-center justify-center flex-grow max-w-5xl mx-auto">
            <h2 className="mt-20 mb-10 text-5xl font-bold text-center">
                Управляйте информацией о сотрудниках эффективно и удобно
            </h2>
            <p className="text-center text-lg mb-6 px-12 text-blue-800 dark:text-violet-300 font-thin">
                Наш дашборд предоставляет вам все необходимые инструменты для управления данными сотрудников. Вы
                можете добавлять, редактировать и просматривать информацию о сотрудниках в реальном времени.
            </p>
            <div className="flex justify-center space-x-5 items-start">
                <Link to="/dashboard"
                      className="bg-purple-600 text-white py-4 px-3 shadow-lg tracking-wide rounded-xl hover:bg-purple-700">
                    Перейти к дашбордам
                </Link>
                <button className="border-2 bg-transparent border-purple-600 text-purple-600 tracking-wide py-3 px-3 shadow-lg
                text-lg rounded-xl hover:bg-purple-700 hover:text-white">
                    Как это работает
                </button>
            </div>

            <div className="w-full dark:hidden">
                <img src="/landing_screen.png" alt="Landing screen"
                     className="mt-8 shadow-lg border border-gray-300 rounded-lg"/>
            </div>
            <div className="w-full hidden dark:block">
                <img src="/landing_screen_dark.png" alt="Landing screen"
                     className="mt-8 shadow-lg border border-gray-300 rounded-lg"/>
            </div>
        </main>
    )
}