import { Box, Card, CardContent, Typography} from "@mui/material";
import Divider from '@mui/material/Divider';
import temperatureImg from '../../../../img/weather/temperature.svg';
import styles from '../../../Main/style.module.css';
import { useMediaQuery } from "@mui/material";
import { memo } from "react";
import getDayAndMonthString from "../../../../functions/getDayAndMonthString";

const DailyWeatherCard = ({date, periods}) => {
	const period = ['Утро', 'День', 'Вечер'];
	const isMobile = useMediaQuery('(max-width: 740px)');
	
	return (
		<Card sx={{ minWidth: (isMobile ? 300 : 350), width: 'auto' }}>
			<CardContent>
				<Typography variant="h6" align="center">{getDayAndMonthString(date)}</Typography>
				{period.map((period) => {
					const isLast = period === 'Вечер';
					return (
						periods[period] ? (
							<div 
								key={period} 
								style={{ marginBottom: '10px' }}>
								<Typography 
									variant="h6" 
									align="center">
									{period}
								</Typography>
								<Box display={'flex'}>
									<Box 
										sx={{
											display: 'flex',
											alignContent:'center',
											justifyContent:'center'
											}}>
										<Box alignContent={'center'}>
											<img 
											src={temperatureImg} 
											alt="Температура" 
											className={styles.cardImg}/>
										</Box>
										<Typography 
											variant="body1" 
											alignContent={'center'}>
												{
													//Если температура больше нуля добавляем плюс
													Math.floor(periods[period].main.temp) > 0 ?
													`+${Math.floor(periods[period].main.temp)}`:
													Math.floor(periods[period].main.temp)
												}
												°C
										</Typography>
									</Box>
									<Box 
										sx={{
										display: 'flex',
										alignContent:'center', 
										justifyContent:'center'
										}}>
										<img 
											src={`https://openweathermap.org/img/wn/${periods[period].weather[0].icon}@2x.png`} 
											alt="Иконка погоды" />
										<Typography 
										alignContent={'center'}>
											{periods[period].weather[0].description}
										</Typography>
									</Box>
								</Box>
									{ !isLast && <Divider />}
							</div>
							) : null
						)})}
			</CardContent>
		</Card>
	);
}

export default memo(DailyWeatherCard);