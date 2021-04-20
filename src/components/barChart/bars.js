export const Bars = ({
	data,
	yScale,
	xScale,
	yAccessor,
	xAccessor,
	keyAccessor,
	barFillColour,
}) =>
	data.map((d, i) => (
		<rect
			key={keyAccessor}
			// key={i}
			x={0}
			y={yScale(yAccessor(d))}
			width={xScale(xAccessor(d))}
			height={yScale.bandwidth()}
			fill={barFillColour}
		/>
	));
