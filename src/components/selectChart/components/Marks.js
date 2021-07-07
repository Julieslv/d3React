export const Marks = ({
	data,
	xScale,
	yScale,
	xValue,
	yValue,
	tooltipFormat,
	circleRadius,
	markFillColour,
}) =>
	data.map((d, i) => (
		<circle
			key={i}
			className='mark'
			fill={markFillColour}
			cx={xScale(xValue(d))}
			cy={yScale(yValue(d))}
			r={circleRadius}>
			<title>{tooltipFormat(xValue(d))}</title>
		</circle>
	));
