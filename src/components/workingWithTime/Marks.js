import styled from 'styled-components';
export const Marks = ({
	data,
	xScale,
	yScale,
	xValue,
	yValue,
	tooltipFormat,
	circleRadius,
}) =>
	data.map((d, i) => (
		<CircleEl
			className='mark'
			cx={xScale(xValue(d))}
			cy={yScale(yValue(d))}
			r={circleRadius}
			key={`circle_${i}`}>
			<title>{tooltipFormat(xValue(d))}</title>
		</CircleEl>
	));

const CircleEl = styled.circle`
	fill: #ff000050;
`;
