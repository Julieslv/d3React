import styled from 'styled-components';
export const YMarkerLine = ({ value, yScale, innerWidth }) => {
	const markerLineY = yScale(value);
	const markerLineX1 = 0;
	const markerLineX2 = innerWidth;
	return (
		<>
			<MarkerLineEl
				x1={markerLineX1}
				y1={markerLineY}
				x2={markerLineX2}
				y2={markerLineY}
			/>
			<text
				textAnchor='end'
				alignmentBaseline='middle'
				x={markerLineX1 - 8}
				y={markerLineY}>
				{value}
			</text>
		</>
	);
};

const MarkerLineEl = styled.line`
	/* stroke: 10px; */
	stroke: red;
	stroke-width: 2px;
`;
