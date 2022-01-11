import styled from 'styled-components';

export const AxisLeft = ({ yScale, innerWidth, tickOffset = 3 }) =>
	yScale.ticks().map((tickValue, i) => (
		<GroupEl
			className='tick'
			transform={`translate(0,${yScale(tickValue)})`}
			key={`tickValue_${i}`}>
			<line x2={innerWidth} />
			<text style={{ textAnchor: 'end' }} x={-tickOffset} dy='.32em'>
				{tickValue}
			</text>
		</GroupEl>
	));

const GroupEl = styled.g`
	text {
		font-size: 0.65em;
		fill: #635f5d;
	}
`;
