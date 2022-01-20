import { tickFormat } from 'd3';
export const AxisLeft = ({ yScale, innerWidth, tickOffset = 3 }) =>
	//? https://github.com/d3/d3-scale/blob/v4.0.2/README.md#tickFormat
	yScale.ticks().map(tickValue => (
		<g
			key={tickValue}
			className='tick'
			transform={`translate(0,${yScale(tickValue)})`}>
			<line x2={innerWidth} />
			{yScale.tickFormat()(tickValue) ? (
				<text style={{ textAnchor: 'end' }} x={-tickOffset} dy='.32em'>
					{tickValue}
				</text>
			) : null}
		</g>
	));
