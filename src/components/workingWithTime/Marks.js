import styled from 'styled-components';
export const Marks = ({
	binnedData,
	xScale,
	yScale,
	innerHeight,
	tooltipFormat,
}) =>
	binnedData.map((d, i) => (
		<RectEl
			className='mark'
			x={xScale(d.x0)}
			y={yScale(d.y)}
			width={xScale(d.x1) - xScale(d.x0)}
			height={innerHeight - yScale(d.y)}
			key={`circle_${i}`}>
			<title>{tooltipFormat(d.y)}</title>
		</RectEl>
	));

const RectEl = styled.rect`
	fill: #ff000050;
`;
