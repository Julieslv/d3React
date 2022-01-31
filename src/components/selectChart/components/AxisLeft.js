import styled from 'styled-components';

export const AxisLeft = ({
	yScale,
	innerWidth,
	tickOffset = 3,
	gridStrokeColour,
}) =>
	yScale.ticks().map(tickValue => (
		<g
			key={tickValue}
			className='tick'
			transform={`translate(0,${yScale(tickValue)})`}>
			<line x2={innerWidth} stroke={gridStrokeColour} />
			<TextEl x={-tickOffset} dy='.32em'>
				{tickValue}
			</TextEl>
		</g>
	));

const TextEl = styled.text`
	fill: #c0267e;
	font-size: 0.675em;
	text-anchor: end;
`;
