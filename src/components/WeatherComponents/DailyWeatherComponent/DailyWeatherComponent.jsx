import { Suspense, lazy } from "react";
import { Box } from "@mui/material"
import { memo, useEffect, useRef } from "react";
import {useMediaQuery} from "@mui/material";

const DailyWeatherComponent = ({info}) => {
	const isMobile = useMediaQuery('(max-width: 740px)');
	const containerRef = useRef(null);
	const LazyDailyWeatherCard = lazy(() => import ("./DailyWeatherCard/DailyWeatherCard"));

	function test(info) {
		const times = {
			'06': 'Утро',
			'12': 'День',
			'21': 'Вечер',
		}
		if(info){
			const infoPerDay = new Map();
			info.map((el) => {
				const [dateInfo, timeInfo] = [...el['dt_txt'].split(' ')]
				const hour = timeInfo.split(':')[0];
				if(hour === '06' || hour === '12' || hour === '21') {
					if(infoPerDay.has(dateInfo)) {
						const value = infoPerDay.get(dateInfo);
						const key = times[hour];
						value[key] = el;
						infoPerDay.set(dateInfo, value);
					} else {
						const key = times[hour];
						infoPerDay.set(dateInfo,{[key]: el});
					}
				return el;
			}
			})
			return infoPerDay;
		}
	}
	const infoPerDays = Array.from(test(info.list) || []);

	const handleWheel = (e) => {
    e.preventDefault(); // отключить стандартную прокрутку страницы
		e.stopPropagation();
    if (containerRef.current) {
      containerRef.current.scrollLeft += e.deltaY; // смещение по горизонтали
    }
  };

	useEffect(() => {
    if(!isMobile) {
			const container = containerRef.current;
			const handleWheelEvent = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (container) {
        container.scrollLeft += e.deltaY;
      }
    };
    if (container) {
      container.addEventListener('wheel', handleWheelEvent, { passive: false });
    }
    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheelEvent);
      }
    };
		}
  }, [isMobile]);

	return (
		<Box 
			ref={containerRef}
			onWheel={handleWheel}
			sx={isMobile ? {
				display: 'flex',
				flexDirection: 'column',
				alignContent: 'center',
				justifyContent: 'space-around',
				gap: '1em',
				width: '100%',
			} : {
				display: 'flex',
				overflow: 'auto',
				scrollbarWidth: 'none',
				msOverflowStyle: 'none',
				alignItems: 'center',
				justifyContent:'space-between',
				gap: '2em',
				marginTop: '5em',
				padding: '1em',
				'&::-webkit-scrollbar': {
					display: 'none',
				}
			}}
			>
      {infoPerDays.map(([date, periods]) => (
				<Suspense key={date} fallback={<div>Загрузка ...</div>}>
					<LazyDailyWeatherCard date={date} periods={periods}/>
				</Suspense>
      ))}
    </Box>
	)
}

export default memo(DailyWeatherComponent)