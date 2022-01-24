import React from 'react';
import { max, scaleLinear, scaleBand, format } from 'd3';
import Loading from '../shared/loading/loading';
import styled from 'styled-components';

import { useData } from './useData';
import { AxisBottom } from './axisBottom';
import { AxisLeft } from './axisLeft';

import { Bars } from './bars';

// console.log(d3);
const BarChart = () => {
	const xAccessor = d => d.Population;
	const yAccessor = d => d.Country;
	const keyAccessor = d => d['Country code'];

	const data = useData(xAccessor);

	if (!data) {
		return <Loading />;
	}

	// console.log(data[0]);
	const gridStrokeColour = '#00000035';
	const barFillColour = '#ff000065';

	const width = window.innerWidth;
	const height = 500;
	const margin = {
		top: 20,
		right: 20,
		bottom: 90,
		left: 200,
	};

	const innerHeight = height - (margin.bottom + margin.top);
	const innerWidth = width - margin.right - margin.left;

	const yScale = scaleBand()
		.domain(data.map(d => yAccessor(d)))
		.range([0, innerHeight])
		.paddingInner(0.1);

	const xScale = scaleLinear()
		.domain([0, max(data, d => xAccessor(d))])
		.range([0, innerWidth]);

	/*
		http://bl.ocks.org/zanarmstrong/05c1e95bf7aa16c4768e
		https://github.com/d3/d3-format#d3-format

	*/

	/**
	 *
	 * @author JulieStephanie
	 * @date 2021-04-21
	 * @param format string as  '~s' see https://github.com/d3/d3-format#d3-format
	 * @returns a formated string that is easy to read and does not rob the graph of space.
	 */
	const xAxisTickFormat = tickValue =>
		format('~s')(tickValue).replace('G', 'B');

	// console.log(xScale.ticks());
	// console.log(yScale.domain());

	return (
		<>
			<h1>UN World Population Prospects 2019</h1>
			<p>
				This is the [United Nations World Population Prospects 2019
				Dataset](https://population.un.org/wpp/Download/Standard/Population/),
				cleaned and formatted as CSV
			</p>
			<svg width={width} height={height}>
				<g transform={`translate(${margin.left}, ${margin.top})`}>
					<AxisBottom
						xScale={xScale}
						innerHeight={innerHeight}
						gridStrokeColour={gridStrokeColour}
						tickFormat={xAxisTickFormat}
					/>
					<AxisLeft yScale={yScale} margin={margin} />
					<Bars
						data={data}
						yScale={yScale}
						xScale={xScale}
						yAccessor={yAccessor}
						xAccessor={xAccessor}
						keyAccessor={keyAccessor}
						barFillColour={barFillColour}
						tooltipFormat={xAxisTickFormat}
					/>
					<TextEl
						x={innerWidth / 2}
						y={innerHeight + margin.bottom}
						textAnchor='middle'>
						Population
					</TextEl>
				</g>
			</svg>
		</>
	);
};

const TextEl = styled.text`
	fill: rgba(155, 0, 0, 0.2);
	font-size: 2em;
	font-weight: 700;
	transform: translateY(-0.75em);
`;

export default BarChart;
