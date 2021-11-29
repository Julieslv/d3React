import styled from 'styled-components';

export const AxisBottom = ({
	xScale,
	innerHeight,
	tickFormat,
	tickOffset = 3,
	gridStrokeColour,
}) =>
	xScale.ticks().map((tickValue) => (
		<g
			className='tick'
			key={tickValue}
			transform={`translate(${xScale(tickValue)},0)`}>
			<line y2={innerHeight} stroke={gridStrokeColour} />
			<TextEl dy='.71em' y={innerHeight + tickOffset}>
				{tickFormat(tickValue)}
			</TextEl>
		</g>
	));

const TextEl = styled.text`
	fill: rgba(155, 0, 0, 0.4);
	font-size: 0.675em;
	text-anchor: middle;
`;
