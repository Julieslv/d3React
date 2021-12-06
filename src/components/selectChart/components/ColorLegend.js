import React from 'react';
import styled from 'styled-components';

export const ColorLegend = ({
	colorScale,
	tickSpacing = 20,
	tickSize = circleRadius,
	tickTextOffset = 20,
	fadeOpacity = 0.5,
	onHover,
	hoveredValue,
}) => {
	return colorScale.domain().map((domainValue, i) => (
		<g
			transform={`translate(10,${i * tickSpacing + 20})`}
			className='tick'
			key={`${i}_domain`}
			onMouseEnter={() => onHover(domainValue)}
			onMouseOut={() => onHover(null)} // null refered to as a sentinel value in CS
			opacity={hoveredValue && domainValue !== hoveredValue ? fadeOpacity : 1}>
			<circle fill={colorScale(domainValue)} r={tickSize} />
			<TextEl x={tickTextOffset} dy='.32em' key={`key${i}`}>
				{domainValue}
			</TextEl>
		</g>
	));
};

const TextEl = styled.text`
	fill: rgba(155, 0, 0, 0.4);
	font-size: 0.675em;
	cursor: default; // we leave at default and in pointer as pointer indicated interactivity as opposed ot our hover interaction
`;
