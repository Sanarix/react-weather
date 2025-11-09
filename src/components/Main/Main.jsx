import styles from "./style.module.css";
import { useState } from "react";
import weatherConfig from "../../config/weatherApi.json";
import cities from "../../cities/cities.json";
import CurrentWeatherCard from "../WeatherComponents/CurrentWeatherComponent/CurrentWeatherCard";
import { Box } from "@mui/material";
import Select from "react-select";
import DailyWeatherComponent from "../WeatherComponents/DailyWeatherComponent/DailyWeatherComponent";
const Main = () => {
    const [loading, setLoading] = useState(false);
    const [cityName, setCityName] = useState("");
    const [currentWeatherInfo, setCurrentWeatherInfo] = useState("");
    const [dailyWeatherInfo, setDailyWeatherInfo] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [seacrhSortedList, setSearchSortedList] = useState([]);
    const [menuIsOpen, setMenuIsOpen] = useState(false); // добавляем это

    async function handler(e) {
        setLoading(true);
        const city = seacrhSortedList.filter((el) => el.name === e.value)[0];
        if (city) {
            try {
                const [weatherRes, forecastRes] = await Promise.all([
                fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${city.coords.lat}&lon=${city.coords.lon}&appid=${weatherConfig["API-Key"]}&units=metric&lang=ru`), 
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
    }

    function searchHandler(value) {
        setSearchQuery(value);
        if (value.length) {
            const filtered = cities.filter((el) =>
                el.name
                    .toLowerCase()
                    .slice(0, value.length)
                    .includes(value.toLowerCase())
            );
            setSearchSortedList(filtered);
            setMenuIsOpen(true); // открываем меню при вводе
        } else {
            setSearchSortedList([]);
            setMenuIsOpen(false); // закрываем меню, если пустой ввод
        }
    }

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
                    <Select
                        options={
                            seacrhSortedList?.map((el) => ({
                                value: el.name,
                                label: el.name,
                            })) || []
                        }
                        onChange={handler}
                        onInputChange={(value) => searchHandler(value)}
                        value={
                            searchQuery ? { value: searchQuery, label: searchQuery } : null
                        }
                        placeholder="Поиск города"
                        isClearable
                        menuIsOpen={menuIsOpen}
                        noOptionsMessage={() => "Город не найден"}
                        styles={{
                            dropdownIndicator: (base) => ({
                                ...base,
                                display: "none", // скрываем стрелку
                                zIndex: 200,
                            }),
                            control: (base) => ({
                                ...base,
                                width: "100%",
                                height: "50px",
                                zIndex: 200,
                            }),
                            container: (base) => ({ ...base, width: "100%" }),
                        }}
                    />
                </div>
                {currentWeatherInfo && (
                    <Box
                        display={"flex"}
                        sx={{
                            alignContent: "center",
                            justifyContent: "space-around",
                            width: "80%",
                            marginTop: "5%",
                            flexDirection: "column",
                        }}
                    >
                        <Box
                            display={"flex"}
                            sx={{
                                alignContent: "center",
                                justifyContent: "space-around",
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
