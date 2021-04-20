import React from 'react';
import * as d3 from 'd3';
import Loading from '../loading/loading';
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

	const yScale = d3
		.scaleBand()
		.domain(data.map(d => yAccessor(d)))
		.range([0, innerHeight])
		.paddingInner(0.1);

	const xScale = d3
		.scaleLinear()
		.domain([0, d3.max(data, d => xAccessor(d))])
		.range([0, innerWidth]);

	// console.log(xScale.ticks());
	// console.log(yScale.domain());

	return (
		<svg width={width} height={height}>
			<g transform={`translate(${margin.left}, ${margin.top})`}>
				<AxisBottom
					xScale={xScale}
					innerHeight={innerHeight}
					gridStrokeColour={gridStrokeColour}
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
				/>
				<TextEl
					x={innerWidth / 2}
					y={innerHeight + margin.bottom}
					textAnchor='middle'>
					Population
				</TextEl>
			</g>
		</svg>
	);
};

const TextEl = styled.text`
	fill: rgba(155, 0, 0, 0.2);
	font-size: 2em;
	font-weight: 700;
	transform: translateY(-0.75em);
`;

export default BarChart;
