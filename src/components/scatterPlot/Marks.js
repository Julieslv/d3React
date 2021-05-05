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
	data.map(d => (
		<circle
			className='mark'
			fill={markFillColour}
			cx={xScale(xValue(d))}
			cy={yScale(yValue(d))}
			r={circleRadius}>
			<title>{tooltipFormat(xValue(d))}</title>
		</circle>
	));
