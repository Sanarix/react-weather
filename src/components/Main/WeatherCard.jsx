import getWindDir from '../../functions/getWindDir';

const WeatherCard = ({weatherInfo, styles}) => {
	const CelciumCoefficient = 273.15;
	const PressureCoefficient = 0.75;

	return (
		<div className={styles.weatherCard}>
			<h1 className={styles.weatherCard_header}>{weatherInfo.name}</h1>
			<h2 className={styles.weatherCard_subheader}> Сейчас {weatherInfo.weather[0].description}
			</h2>
			<img className={styles.weatherCard_image} src={` https://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`} alt="weather-icon" />
			<ul className={styles.weatherCard_list}>
				<li>Температура: {
				Math.floor(weatherInfo.main.temp - CelciumCoefficient)
				}{'\u00b0'}C
				</li>
				<li>Ощущается как: {
				Math.floor(weatherInfo.main.feels_like - CelciumCoefficient)
				}{'\u00b0'}C
				</li>
				<li>Влажность: {weatherInfo.main.humidity} %</li>
				<li>Давление: {(weatherInfo.main.pressure * PressureCoefficient).toFixed()} мм.рт.ст.</li>
				<li>Ветер: {Math.floor(weatherInfo.wind.speed)} м/с</li>
				<li>Порывы ветра до: {Math.floor(weatherInfo.wind.gust) || 0}  м/с</li>
				<li>Направление ветра: {getWindDir(weatherInfo.wind.deg)}</li>
				<li>Процент облачности: {weatherInfo.clouds.all} %</li>
			</ul>
		</div>
	)
}

export default WeatherCard;