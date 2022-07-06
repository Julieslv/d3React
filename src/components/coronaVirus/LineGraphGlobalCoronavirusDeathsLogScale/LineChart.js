import { useEffect } from 'react';
import { scaleTime, extent, scaleLog, max, line, timeFormat } from 'd3';
import { XAxis } from './xAxis';
import { YAxis } from './yAxis';

const xValue = d => d.date;
const yValue = d => d.deathTotal;

import styled from 'styled-components';
const margin = { top: 80, right: 80, bottom: 80, left: 150 };
const threshold = 1500000;

const formatDate = timeFormat('%b %d');

export const LineChart = ({ data, width, height }) => {
	useEffect(() => {
		document.title = 'Corona Virus Log scale';
	}, []);
	const innerWidth = width - margin.left - margin.right;
	const innerHeight = height - margin.top - margin.bottom;

	const xScale = scaleTime()
		.domain(extent(data, xValue))
		.range([0, innerWidth]);

	const yScale = scaleLog()
		.domain([1, max(data, yValue)]) // log scales can't start at 0
		.range([innerHeight, 0]);

	const lineGenerator = line()
		.x(d => xScale(xValue(d)))
		.y(d => yScale(yValue(d)));

	const mostRecentDate = xScale.domain()[1];

	return (
		<>
			<text>Some stuff here I can't remember</text>
			<h1>Corona Virus Log scale</h1>
			<SVGEl width={width} height={height}>
				<g transform={`translate(${margin.left},${margin.top})`}>
					<XAxis xScale={xScale} innerHeight={innerHeight} />
					<YAxis yScale={yScale} innerWidth={innerWidth} />
					<path d={lineGenerator(data)} />
					<text transform={`translate(0, ${-margin.top / 2})`}>
						Global Coronavirus over time
					</text>
					<text
						className='axis-label'
						textAnchor='middle'
						transform={`translate(-${margin.left / 2}, ${
							innerHeight / 2
						}) rotate(90)`}>
						Cumulative Deaths
					</text>
					<text
						className='axis-label'
						textAnchor='middle'
						// alignmentBaseline='hanging'
						transform={`translate(${innerWidth / 2}, ${
							innerHeight + margin.bottom
						})`}>
						Time
					</text>
				</g>
			</SVGEl>
		</>
	);
};

const SVGEl = styled.svg`
	path {
		fill: none;
		stroke: black;
		stroke-width: 5px;
	}
	.marker-line {
		stroke: black;
		stroke-width: 2px;
	}
	text {
		font-size: 2em;
		&.axis-label {
			fill: red;
			font-size: 1.3rem;
		}
	}
	.domain {
		display: none;
	}
	.tick line {
		stroke: #bbbbbb;
	}
	.tick text {
		fill: #565656;
		font-size: 14px;
	}
`;
