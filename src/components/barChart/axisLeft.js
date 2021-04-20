import styled from 'styled-components';

export const AxisLeft = ({ yScale, margin }) =>
	yScale.domain().map(domainValue => (
		<g transform={`translate(0 ,${yScale(domainValue)})`}>
			<TextEl
				x={-margin.right}
				style={{ textAnchor: 'end' }}
				dy={yScale.bandwidth() / 2}>
				{domainValue}
			</TextEl>
		</g>
	));

const TextEl = styled.text`
	fill: rgba(155, 0, 0, 0.4);
	font-size: 0.875em;
`;
