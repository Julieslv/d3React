import styled from 'styled-components';
export const AxisBottom = ({
	xScale,
	innerHeight,
	tickFormat,
	tickOffset = 3,
}) =>
	xScale.ticks().map(tickValue => (
		<GroupEl
			className='tick'
			key={tickValue}
			transform={`translate(${xScale(tickValue)},0)`}>
			<line y2={innerHeight} />
			<text
				style={{ textAnchor: 'middle' }}
				dy='.71em'
				y={innerHeight + tickOffset}>
				{tickFormat(tickValue)}
			</text>
		</GroupEl>
	));

const GroupEl = styled.g`
	fill: #635f5d;
	text {
		font-size: 0.65em;
		fill: #635f5d;
	}
`;
