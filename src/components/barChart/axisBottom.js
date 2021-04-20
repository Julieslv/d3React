export const AxisBottom = ({ xScale, innerHeight, gridStrokeColour }) =>
	xScale.ticks().map(tickValue => (
		<g transform={`translate(${xScale(tickValue)},0)`}>
			<line
				// x1={xScale(tickValue)} // the default is 0
				// x2={xScale(tickValue)}
				// y1='0'
				y2={innerHeight}
				stroke={gridStrokeColour}
			/>
			<text y={innerHeight + 3} style={{ textAnchor: 'middle' }} dy='.71em'>
				{tickValue}
			</text>
		</g>
	));
