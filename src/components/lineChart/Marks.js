import styled from 'styled-components';
import { line, curveNatural } from 'd3';
export const Marks = ({
	data,
	xScale,
	yScale,
	xValue,
	yValue,
	tooltipFormat,
	circleRadius,
}) => (
	<MarksEl>
		<path
			d={line()
				.x((d) => xScale(xValue(d)))
				.y((d) => yScale(yValue(d)))
				.curve(curveNatural)(data)} //https://bl.ocks.org/d3noob/ced1b9b18bd8192d2c898884033b5529
		/>
		{/* // remove if we don't want circles to show.  */}
		{data.map((d) => (
			<circle cx={xScale(xValue(d))} cy={yScale(yValue(d))} r={circleRadius}>
				<title>{tooltipFormat(xValue(d))}</title>
			</circle>
		))}
	</MarksEl>
);

const MarksEl = styled.g`
	path {
		fill: none;
		stroke: #ff000065;
		stroke-width: 3px;
		stroke-linejoin: round;
		stroke-linecap: round;
	}
	circle {
		fill: #ff000035;
	}
`;
