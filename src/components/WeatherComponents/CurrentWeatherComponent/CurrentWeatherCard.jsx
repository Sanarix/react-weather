import getWindDir from '../../../functions/getWindDir';
import { PRESSURECOEFFICIENT } from '../../../constants/coefficients';
import {Box, Typography, useMediaQuery} from '@mui/material';
import windImg from '../../../img/weather/wind.svg';
import windDirImg from '../../../img/weather/windDir.svg';
import waterProcentImg from '../../../img/weather/waterProcent.svg';
import pressureImg from '../../../img/weather/pressure.svg';
import cloudProcentImg from '../../../img/weather/cloudProcent.svg';
import { memo } from 'react';

const CurrentWeatherCard = ({weatherInfo, styles, cityName}) => {
	const isMobile = useMediaQuery('(max-width: 740px)');
	const imgSrcDesctop = `https://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@4x.png`;
	const imgSrcMobile = `https://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`;
	const temperature = Math.floor(weatherInfo.main.temp);
	const feelsTemperature = Math.floor(weatherInfo.main.feels_like);
	const description = weatherInfo.weather[0].description.charAt(0).toUpperCase() + weatherInfo.weather[0].description.slice(1);
	const pressure  = (weatherInfo.main.pressure * PRESSURECOEFFICIENT).toFixed();
	const wind = Math.floor(weatherInfo.wind.speed);
	const windGust = Math.floor(weatherInfo.wind.gust) || 0;
	const windDir = getWindDir(weatherInfo.wind.deg);

	return (
		<Box className={styles.currentWeatherCard}>
			<Typography variant="h3" align='center'>{cityName}</Typography>
			<header className={styles.currentWeatherCard__head}>
				<Box id={styles.head__temperature}>
					<span id={styles.temperature__number}>
						<b>
							{
								temperature > 0 ? 
								`+${temperature}` 
								: temperature
						}°</b>
					</span>
					<Typography id={styles.temperature__subnumber}>Ощущается как <span>
							{
								feelsTemperature > 0 ? 
								`+${feelsTemperature}` 
								: feelsTemperature
							}
							°C
						</span>
					</Typography>
				</Box>
				<Box id={styles.head__info}>
					<div className={styles.currentWeatherCard__image}>
					<img src={isMobile ? imgSrcMobile : imgSrcDesctop} alt="weather-icon" />
					</div>
					<Typography variant='h5' className={styles.currentWeatherCard__subheader}>
						{description}
					</Typography>
				</Box>
			</header>
			<Box className={styles.currentWeatherCard__body}>
				<Box className={`${styles.body__cell} ${styles['body__cell-wind']}`}>
							<Box className={styles['cell__item-wind']}>
								<Box sx={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									marginRight: '1em'
								}}>
										<img src={windDirImg} alt="Направление" className={styles.cardImg} />
										<Typography align='center'><span>{windDir}</span></Typography>
								</Box>
								<img src={windImg} alt="Ветер" className={styles.cardImg}/>
								<Typography> <span>{wind} м/с</span></Typography>
							</Box>
							{
								windGust > 0 && 
								<Typography>Порывы до: <span>{windGust} м/с</span></Typography>
							}
				</Box>
				<Box className={styles.body__cell}>
					<Box className={styles.cell__item}>
						<img src={waterProcentImg} alt="Влажность" className={styles.cardImg}/>
						<Typography><span>{weatherInfo.main.humidity} %</span></Typography>
					</Box>
					<Typography>{!isMobile && 'Влажность'}</Typography>
				</Box>
				<Box className={styles.body__cell}>
					<Box className={styles.cell__item}>
						<img src={pressureImg} alt="Давление" className={styles.cardImg}/>
						<Typography><span>{pressure} мм.рт.ст.</span></Typography>
					</Box>
					<Typography>{!isMobile && 'Давление'}</Typography>
				</Box>
				<Box className={styles.body__cell}>
					<Box className={styles.cell__item}>
						<img src={cloudProcentImg} alt="Процент облачности" className={styles.cardImg}/>
						<Typography><span>{weatherInfo.clouds.all}</span> %</Typography>
					</Box>
					<Typography>{!isMobile && 'Облачность'}</Typography>
				</Box>
			</Box>
		</Box>
	)
}

export default memo(CurrentWeatherCard);