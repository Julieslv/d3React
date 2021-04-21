import styled from 'styled-components';

export const AxisBottom = ({
	xScale,
	innerHeight,
	gridStrokeColour,
	tickFormat,
}) =>
	xScale.ticks().map(tickValue => (
		<g transform={`translate(${xScale(tickValue)},0)`}>
			<line
				// x1={xScale(tickValue)} // the default is 0
				// x2={xScale(tickValue)}
				// y1='0'
				y2={innerHeight}
				stroke={gridStrokeColour}
			/>
			<TextEl y={innerHeight + 3} style={{ textAnchor: 'middle' }} dy='.71em'>
				{tickFormat(tickValue)}
			</TextEl>
		</g>
	));

const TextEl = styled.text`
	fill: rgba(155, 0, 0, 0.4);
	font-size: 0.675em;
	text-anchor: middle;
	dy: 0.71em;
`;
