import styled from 'styled-components';
import { scaleLinear, format, extent } from 'd3';
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
const markFillColour = '#ff000065';

const ScatterPlot = () => {
	const data = useData();

	if (!data) {
		return <pre>Loading...</pre>;
	}

	const innerHeight = height - margin.top - margin.bottom;
	const innerWidth = width - margin.left - margin.right;

	const xValue = d => d.petal_length;
	const xAxisLabel = 'Petal Length';

	const yValue = d => d.sepal_width;
	const yAxisLabel = 'Sepal Width';

	const siFormat = format('.2s');
	const xAxisTickFormat = tickValue => siFormat(tickValue).replace('G', 'B');

	const xScale = scaleLinear()
		.domain(extent(data, xValue))
		.range([0, innerWidth])
		.nice();

	const yScale = scaleLinear()
		.domain(extent(data, yValue))
		.range([0, innerHeight]);

	return (
		<>
			<h1>Iris</h1>
			<svg width={width} height={height}>
				<g transform={`translate(${margin.left},${margin.top})`}>
					<AxisBottom
						xScale={xScale}
						innerHeight={innerHeight}
						tickFormat={xAxisTickFormat}
						tickOffset={5}
						gridStrokeColour={gridStrokeColour}
					/>
					<TextEl
						className='axis-label'
						transform={`translate(${-yAxisLabelOffset},${
							innerHeight / 2
						}) rotate(-90)`}>
						{yAxisLabel}
					</TextEl>
					<AxisLeft
						yScale={yScale}
						innerWidth={innerWidth}
						tickOffset={5}
						gridStrokeColour={gridStrokeColour}
					/>
					<TextEl
						className='axis-label'
						x={innerWidth / 2}
						y={innerHeight + xAxisLabelOffset}>
						{xAxisLabel}
					</TextEl>
					<Marks
						data={data}
						xScale={xScale}
						yScale={yScale}
						xValue={xValue}
						yValue={yValue}
						tooltipFormat={xAxisTickFormat}
						circleRadius={7}
						markFillColour={markFillColour}
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
