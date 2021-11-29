export const Marks = ({
	data,
	xScale,
	yScale,
	xValue,
	yValue,
	tooltipFormat,
	circleRadius,
	colorValue,
	colorScale,
	markFillColour,
}) =>
	data.map((d, i) => (
		<circle
			key={i}
			className='mark'
			fill={colorScale(colorValue(d))}
			cx={xScale(xValue(d))}
			cy={yScale(yValue(d))}
			r={circleRadius}>
			<title>{tooltipFormat(xValue(d))}</title>
		</circle>
	));
