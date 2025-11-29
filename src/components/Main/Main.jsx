import styles from "./style.module.css";
import { useCallback, useState } from "react";
import { useMediaQuery } from "@mui/material";
import weatherConfig from "../../config/weatherApi.json";
import cities from "../../cities/cities.json";
import CurrentWeatherCard from "../WeatherComponents/CurrentWeatherComponent/CurrentWeatherCard";
import { Box } from "@mui/material";

import DailyWeatherComponent from "../WeatherComponents/DailyWeatherComponent/DailyWeatherComponent";
import SelectComponent from "./Select/Select";
const Main = () => {
    const [loading, setLoading] = useState(false);
    const [cityName, setCityName] = useState("");
    const [currentWeatherInfo, setCurrentWeatherInfo] = useState("");
    const [dailyWeatherInfo, setDailyWeatherInfo] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [seacrhSortedList, setSearchSortedList] = useState([]);
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const isMobile = useMediaQuery('(max-width: 740px)');

    const handler = useCallback(async (e) => {
			setLoading(true);
			const city = seacrhSortedList.filter((el) => el.name === e.value)[0];
			if (city) {
				try {
					//получение погоды на сегодня
					const [weatherRes, forecastRes] = await Promise.all([
					fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${city.coords.lat}&lon=${city.coords.lon}&appid=${weatherConfig["API-Key"]}&units=metric&lang=ru`), 
					//получение погоды на 5 дней
					fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${city.coords.lat}&lon=${city.coords.lon}&appid=${weatherConfig["API-Key"]}&units=metric&lang=ru`)
				])
				const weatherData = await weatherRes.json();
				const forecastData = await forecastRes.json();

				setCityName(city.name);
				setCurrentWeatherInfo(weatherData);
				setDailyWeatherInfo(forecastData);
				}catch(err) {
						console.error('Ошибка', err);
				}finally {
						setLoading(false);
				}
			}
			if (!e || !e.value) {
				clear();
			}
    }, [seacrhSortedList])

    const searchHandler = useCallback((value) => {
			setSearchQuery(value);
			if (value.length) {
				const filtered = cities.filter((el) =>
						el.name
								.toLowerCase()
								.slice(0, value.length)
								.includes(value.toLowerCase())
				);
				setSearchSortedList(filtered);
				setMenuIsOpen(true);
			} else {
				setSearchSortedList([]);
				setMenuIsOpen(false);
			}
    }, [])

    function clear() {
			setSearchQuery("");
			setSearchSortedList([]);
			setMenuIsOpen(false);
			setDailyWeatherInfo([]);
    }

    return (
			<>
				<main className={styles.main}>
						<div className={styles.searchWrapper}>
								<SelectComponent 
								seacrhSortedList={seacrhSortedList}
								handler={handler}
								searchQuery={searchQuery}
								menuIsOpen={menuIsOpen}
								searchHandler={searchHandler}
								/>
						</div>
						{currentWeatherInfo && (
								<Box
										display={"flex"}
										sx={{
												alignContent: "center",
												justifyContent: "space-around",
												width: (isMobile && "90%") || "80%",
												marginTop: "5%",
												flexDirection: "column",
										}}
								>
										<Box
												display={"flex"}
												sx={{
														alignContent: "center",
														justifyContent: "space-around",
														width: '100%',
												}}
										>
												<CurrentWeatherCard
														styles={styles}
														cityName={cityName}
														weatherInfo={currentWeatherInfo}
												/>
										</Box>
										<DailyWeatherComponent info={dailyWeatherInfo} />
								</Box>
						)}
				</main>
			</>
    );
};
export default Main;
