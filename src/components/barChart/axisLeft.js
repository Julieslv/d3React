export const AxisLeft = ({ yScale, margin }) =>
	yScale.domain().map(domainValue => (
		<g transform={`translate(0 ,${yScale(domainValue)})`}>
			<text
				x={-margin.right}
				style={{ textAnchor: 'end' }}
				dy={yScale.bandwidth() / 2}>
				{domainValue}
			</text>
		</g>
	));
