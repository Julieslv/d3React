import { useState, useCallback, useEffect } from 'react';
import {
	csv,
	scaleLinear,
	scaleTime,
	max,
	timeFormat,
	extent,
	bin,
	ticks,
	timeMonths,
	sum,
} from 'd3';
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

	// Set up data bins
	// https://github.com/d3/d3-array/blob/v3.1.1/README.md#bin
	const [start, stop] = xScale.domain();
	const binnedData = bin()
		.value(xValue)
		.domain(xScale.domain())
		// Setup up the intervals for the buckets https://github.com/d3/d3-time/blob/v3.0.0/README.md#_interval
		.thresholds(timeMonths(start, stop))(data)
		.map(array => ({
			// https://github.com/d3/d3-array/blob/v3.1.1/README.md#sum
			// Returns the sum of the given iterable of numbers.
			y: sum(array, yValue),
			x0: array.x0,
			x1: array.x1,
		}));

	const yScale = scaleLinear()
		.domain([0, max(binnedData, d => d.y)])
		.range([innerHeight, 0]);

	// console.log('binnedData');
	// console.log(binnedData);
	// console.log('yScale.domain()');
	// console.log(yScale.domain());
	return (
		<>
			<h1>
				This dataset about missing migrants comes from the{' '}
				<a href='https://missingmigrants.iom.int/downloads'>
					{' '}
					{/*^ How to do an empty space in react */}
					Missing Migrants Project
				</a>
				.
			</h1>

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
						binnedData={binnedData}
						xScale={xScale}
						yScale={yScale}
						tooltipFormat={d => d}
						innerHeight={innerHeight}
					/>
				</g>
			</SvgEl>
		</>
	);
};

export default WorkingWithTime;

const SvgEl = styled.svg`
	.axis-label {
		font-size: 2.2em;
		fill: #635f5d;
	}
	.tick line {
		stroke: #ffb6c1;
	}
`;
