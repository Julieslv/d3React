import styled from 'styled-components';
import { scaleLinear, timeFormat, extent } from 'd3';
import { useData } from './useData';
import { AxisBottom } from './AxisBottom';
import { AxisLeft } from './AxisLeft';
import { Marks } from './Marks';

const width = 960;
const height = 500;
const margin = { top: 20, right: 30, bottom: 65, left: 90 };
const xAxisLabelOffset = 50;
const yAxisLabelOffset = 45;
const gridStrokeColour = '#00000035';
// const markFillColour = '#ff000065';

const ScatterPlot = () => {
	const data = useData();

	if (!data) {
		return <pre>Loading...</pre>;
	}

	const innerHeight = height - margin.top - margin.bottom;
	const innerWidth = width - margin.left - margin.right;

	const xValue = d => d.timestamp;
	const xAxisLabel = 'Time';

	const yValue = d => d.temperature;
	const yAxisLabel = 'Temperature';

	const xAxisTickFormat = timeFormat('%a');

	const xScale = scaleLinear()
		.domain(extent(data, xValue))
		.range([0, innerWidth])
		.nice();

	const yScale = scaleLinear()
		.domain(extent(data, yValue))
		.range([innerHeight, 0])
		.nice();

	return (
		<>
			<h1>Basic line chart</h1>
			<svg width={width} height={height}>
				<g transform={`translate(${margin.left},${margin.top})`}>
					<AxisBottom
						xScale={xScale}
						innerHeight={innerHeight}
						tickFormat={xAxisTickFormat}
						tickOffset={7}
						gridStrokeColour={gridStrokeColour}
					/>
					<TextEl
						className='axis-label'
						textAnchor='middle'
						transform={`translate(${-yAxisLabelOffset},${
							innerHeight / 2
						}) rotate(-90)`}>
						{yAxisLabel}
					</TextEl>
					<AxisLeft
						yScale={yScale}
						innerWidth={innerWidth}
						tickOffset={7}
						gridStrokeColour={gridStrokeColour}
					/>

					<TextEl
						className='axis-label'
						x={innerWidth / 2}
						y={innerHeight + xAxisLabelOffset}
						textAnchor='middle'>
						{xAxisLabel}
					</TextEl>
					<Marks
						data={data}
						xScale={xScale}
						yScale={yScale}
						xValue={xValue}
						yValue={yValue}
						tooltipFormat={xAxisTickFormat}
						circleRadius={5}
					/>
				</g>
			</svg>
		</>
	);
};

const TextEl = styled.text`
	fill: rgba(155, 0, 0, 0.2);
	font-size: 2em;
	font-weight: 700;
	text-anchor: middle;
`;

export default ScatterPlot;
