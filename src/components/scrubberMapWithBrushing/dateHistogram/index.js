import { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import {
	scaleLinear,
	scaleTime,
	max,
	timeFormat,
	extent,
	bin,
	ticks,
	timeMonths,
	sum,
	select,
	brushX,
} from 'd3';
import styled from 'styled-components';
import { AxisBottom } from './AxisBottom';
import { AxisLeft } from './AxisLeft';
import { Marks } from './Marks';

// put stuff here that you do not have to re-render, not part of export and therefor re-render
const width = 960;
const margin = { top: 0, right: 30, bottom: 20, left: 50 };
const xAxisLabelOffset = 50;
const yAxisLabelOffset = 40;
const circleRadius = 3;
const tickOffset = 10;

//https://d3-wiki.readthedocs.io/zh_CN/master/Time-Formatting/
const xAxisTickFormat = timeFormat('%m/%d/%Y');
const xAxisLabel = 'Time';

const yValue = d => d['Total Dead and Missing'];
const yAxisLabel = 'Total Dead and Missing';

const DateHistogram = ({ data, height, setBrushExtent, xValue }) => {
	const innerHeight = height - margin.top - margin.bottom;
	const innerWidth = width - margin.left - margin.right;

	//? the useMemo method does not seem to be doing what it ought to do?
	const xScale = useMemo(() => {
		return scaleTime()
			.domain(extent(data, xValue))
			.range([0, innerWidth])
			.nice();
	}, [data, xValue, innerWidth]);

	// Set up data bins
	// https://github.com/d3/d3-array/blob/v3.1.1/README.md#bin
	const binnedData = useMemo(() => {
		const [start, stop] = xScale.domain();
		return (
			bin()
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
				}))
		);
	}, [xValue, xScale, data]);

	const yScale = useMemo(() => {
		return scaleLinear()
			.domain([0, max(binnedData, d => d.y)])
			.range([innerHeight, 0]);
	}, [binnedData, innerHeight]);

	const brushed = ({ selection }) => {
		if (selection === null) {
			circle.attr('stroke', null);
		} else {
			const [x0, x1] = selection.map(x.invert);
			circle.attr('stroke', d => (x0 <= d && d <= x1 ? 'red' : null));
		}
	};

	// reference to DOM element
	const brushRef = useRef();

	// UseEffect() before we return the function.
	useEffect(() => {
		// effect
		const brush = brushX().extent([
			[0, 0], // where brush starts
			[innerWidth, innerHeight], // where brush ends
		]);

		brush(select(brushRef.current));

		brush.on('brush', (event, d) => {
			setBrushExtent(event.selection.map(xScale.invert));
		});
		return () => {
			// cleanup
		};
	}, [innerWidth, innerHeight, setBrushExtent, xScale.invert]); // dependency's array

	return (
		<>
			<rect width={width} height={height} fill='white' /> ;
			<GroupEl transform={`translate(${margin.left},${margin.top})`}>
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
			</GroupEl>
			{/* referenced DOM element */}
			<g ref={brushRef}></g>
		</>
	);
};

export default DateHistogram;

const GroupEl = styled.g`
	.axis-label {
		font-size: 0.65em;
		fill: #635f5d;
	}
	.tick line {
		stroke: #ffb6c150;
	}
`;
