
import React, { useState, useEffect } from 'react';

const Weather = () => {
    const [weather, setWeather] = useState({});
    const [location, setLocation] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchWeather = async () => {
            if (!location) return; // Если местоположение не задано, ничего не делать

            setLoading(true);
            setError(''); // Сброс ошибки перед новым запросом
            const apiKey = '656255f48001926a444c3cfab8309039'; // Ваш ключ API
            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`);
                if (!response.ok) {
                     new Error('Не удалось получить данные о погоде');
                }
                const data = await response.json();
                console.log(data); // Вывод данных в консоль для отладки
                setWeather(data);
            } catch (err) {
                console.error(err); // Вывод ошибки в консоль для отладки
                setError(err.message); // Установка сообщения об ошибке
            } finally {
                setLoading(false); // Завершение загрузки
            }
        };

        fetchWeather();
    }, [location]);

    return (
        <div className="Weather">
            <header>
                <h1>Приложение погоды</h1>
            </header>
            <main>
                <form onSubmit={(event) => {
                    event.preventDefault();
                    setLocation(event.target.elements.location.value.trim()); // Удаление лишних пробелов
                }}>
                    <input type="text" name="location" placeholder="Введите позицию" />
                    <button type="submit">Введите позицию</button>
                </form>
                {loading ? (
                    <p>Загрузка...</p>
                ) : error ? (
                    <p style={{ color: 'red' }}>{error}</p> // Отображение ошибки
                ) : (
                    <>
                        {weather.main ? ( // Проверка наличия данных о погоде
                            <>
                                <h2>Текущая погода в {weather.name}</h2>
                                <p>Температура: {weather.main.temp} °C</p>
                                <p>Влажность: {weather.main.humidity} %</p>
                                <p>Скорость ветра: {weather.wind.speed} м/с</p> {/* Добавление скорости ветра */}
                                <p>Описание: {weather.weather[0].description}</p> {/* Описание погоды */}
                            </>
                        ) : (
                            <p>Введите местоположение для получения данных о погоде.</p> // Подсказка для пользователя
                        )}
                    </>
                )}

            </main>
        </div>
    );
};

export default Weather;