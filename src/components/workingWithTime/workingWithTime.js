import { useState, useCallback, useEffect } from 'react';
import { csv, scaleLinear, scaleTime, max, timeFormat, extent } from 'd3';
import styled from 'styled-components';
import Loading from '../shared/loading/loading';
import { useData } from './useData';
import { AxisBottom } from './AxisBottom';
import { AxisLeft } from './AxisLeft';
import { Marks } from './Marks';

const width = 960;
const height = 500;
const margin = { top: 20, right: 30, bottom: 65, left: 90 };
const xAxisLabelOffset = 60;
const yAxisLabelOffset = 55;
const circleRadius = 3;
const tickOffset = 10;

const WorkingWithTime = () => {
	const data = useData();

	if (!data) {
		return <Loading />;
	}

	const innerHeight = height - margin.top - margin.bottom;
	const innerWidth = width - margin.left - margin.right;

	const xValue = d => new Date(d['Reported Date']);
	const xAxisLabel = 'Time';

	const yValue = d => d['Total Dead and Missing'];
	const yAxisLabel = 'Total Dead and Missing';

	//https://d3-wiki.readthedocs.io/zh_CN/master/Time-Formatting/
	const xAxisTickFormat = timeFormat('%m/%d/%Y');

	const xScale = scaleTime()
		.domain(extent(data, xValue))
		.range([0, innerWidth])
		.nice();

	const yScale = scaleLinear()
		.domain(extent(data, yValue))
		.range([innerHeight, 0]);

	return (
		<SvgEl width={width} height={height}>
			<g transform={`translate(${margin.left},${margin.top})`}>
				<AxisBottom
					xScale={xScale}
					innerHeight={innerHeight}
					tickFormat={xAxisTickFormat}
					tickOffset={tickOffset}
				/>
				<text
					className='axis-label'
					textAnchor='middle'
					transform={`translate(${-yAxisLabelOffset},${
						innerHeight / 2
					}) rotate(-90)`}>
					{yAxisLabel}
				</text>
				<AxisLeft yScale={yScale} innerWidth={innerWidth} tickOffset={5} />
				<text
					className='axis-label'
					x={innerWidth / 2}
					y={innerHeight + xAxisLabelOffset}
					textAnchor='middle'>
					{xAxisLabel}
				</text>
				<Marks
					data={data}
					xScale={xScale}
					yScale={yScale}
					xValue={xValue}
					yValue={yValue}
					tooltipFormat={xAxisTickFormat}
					circleRadius={circleRadius}
				/>
			</g>
		</SvgEl>
	);
};

export default WorkingWithTime;

const SvgEl = styled.svg`
	.axis-label {
		font-size: 2.2em;
		fill: #635f5d;
	}
`;
