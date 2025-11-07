const Overlay = ({style, handler}) => {
	return (
		<div 
		className={style}
		onClick={handler}
		></div>
	)
}

export default Overlay;