export default function getDayAndMonthString(dateString) {
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