import styled from 'styled-components';

export const AxisLeft = ({
	yScale,
	innerWidth,
	tickOffset = 3,
	gridStrokeColour,
}) =>
	yScale.ticks().map((tickValue) => (
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
	fill: rgba(155, 0, 0, 0.4);
	font-size: 0.675em;
	text-anchor: end;
`;
