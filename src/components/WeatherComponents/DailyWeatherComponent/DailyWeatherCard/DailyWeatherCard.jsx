import { Box, Card, CardContent, Typography} from "@mui/material";
import Divider from '@mui/material/Divider';
import temperatureImg from '../../../../img/weather/temperature.svg';
import styles from '../../../Main/style.module.css';

const DailyWeatherCard = ({date, periods}) => {
	const period = ['Утро', 'День', 'Вечер'];

	function getDayAndMonthString(dateString) {
		const numOfDay = new Date(dateString).getDay();
		const days = {
			0: 'Воскресенье',
			1: 'Понедельник',
			2: 'Вторник',
			3: 'Среда',
			4: 'Четверг',
			5: 'Пятница',
			6: 'Суббота',
		}
		const months = {
			'01': 'Января',
			'02': 'Февраля',
			'03': 'Марта',
			'04': 'Апреля',
			'05': 'Мая',
			'06': 'Июня',
			'07': 'Июля',
			'08': 'Августа',
			'09': 'Сентября',
			'10': 'Октября',
			'11': 'Ноября',
			'12': 'Декабря',
		}
		const [year, month, day] = dateString.split('-');
		return `${days[numOfDay]}, ${day} ${months[month]}`;
	}
	
	return (
		<Card sx={{ minWidth: 350, width: 'auto' }}>
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

export default DailyWeatherCard;