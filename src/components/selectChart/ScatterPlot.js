import React, { useState } from 'react';
import styled from 'styled-components';
import {
	scaleLinear,
	scaleOrdinal,
	schemeCategory10,
	format,
	extent,
} from 'd3';

import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

import { useData } from './components/useData';
import { AxisBottom } from './components/AxisBottom';
import { AxisLeft } from './components/AxisLeft';
import { Marks } from './components/Marks';
import { ColorLegend } from './components/ColorLegend';

const width = 960;
const height = 500;
const margin = { top: 20, right: 230, bottom: 65, left: 90 };
const xAxisLabelOffset = 50;
const yAxisLabelOffset = 45;
const gridStrokeColour = '#edaad0';
const markFillColour = '#d3599d';
const circleRadius = 7;

const attributes = [
	{ value: 'sepal_length', label: 'Sepal Length' },
	{ value: 'sepal_width', label: 'Sepal Width' },
	{ value: 'petal_length', label: 'Petal Length' },
	{ value: 'petal_width', label: 'Petal Width' },
	{ value: 'species', label: 'Species' },
];

const getLabel = (value) => {
	for (let i = 0; i < attributes.length; i++) {
		if (attributes[i].value === value) {
			return attributes[i].label;
		}
	}
};

const ScatterPlot = () => {
	const data = useData();

	const initialXAttribute = 'petal_length';
	// Dropdown
	const [xAttribute, setXAttribute] = useState(initialXAttribute);
	const xValue = (d) => d[xAttribute];
	const xAxisLabel = getLabel(xAttribute);

	const initialYAttribute = 'sepal_width';
	// Dropdown
	const [yAttribute, setYAttribute] = useState(initialYAttribute);
	const yValue = (d) => d[yAttribute];
	const yAxisLabel = getLabel(yAttribute);

	const colorValue = (d) => d.species;
	const colorLegendLabel = 'Species';

	if (!data) {
		return <pre>Loading...</pre>;
	}

	const innerHeight = height - margin.top - margin.bottom;
	const innerWidth = width - margin.left - margin.right;

	const siFormat = format('.2s');
	const xAxisTickFormat = (tickValue) => siFormat(tickValue).replace('G', 'B');

	const xScale = scaleLinear()
		.domain(extent(data, xValue))
		.range([0, innerWidth])
		.nice();

	const yScale = scaleLinear()
		.domain(extent(data, yValue))
		.range([0, innerHeight]);

	const colorScale = scaleOrdinal()
		.domain(data.map(colorValue))
		.range([`#c7398a45`, `#d4cec065`, `#4f912545`]);

	return (
		<ScatterPlotChart>
			<Controls>
				<div className='col-flex'>
					<div className='label'>
						<b>X:</b>
					</div>
					<Dropdown
						options={attributes}
						placeholder={xAttribute}
						value={xAttribute}
						onChange={({ value }) => setXAttribute(value)} //
					/>
				</div>
				<div className='col-flex'>
					<div className='label'>
						<b>Y:</b>
					</div>
					<Dropdown
						options={attributes}
						placeholder={yAttribute}
						value={yAttribute}
						onChange={({ value }) => setYAttribute(value)}
					/>
				</div>
			</Controls>

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
						}) rotate(-90)`}
						textAnchor='middle'>
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
						y={innerHeight + xAxisLabelOffset}
						textAnchor='middle'>
						{xAxisLabel}
					</TextEl>
					<g transform={`translate(${innerWidth + 20}, 20)`}>
						<TextEl textAnchor='left'>{colorLegendLabel}</TextEl>
						<ColorLegend
							colorScale={colorScale}
							tickSpacing={20}
							tickSize={15}
							tickTextOffset={15}
							tickSize={circleRadius}
						/>
					</g>
					<Marks
						data={data}
						xScale={xScale}
						yScale={yScale}
						xValue={xValue}
						yValue={yValue}
						colorScale={colorScale}
						colorValue={colorValue}
						tooltipFormat={xAxisTickFormat}
						circleRadius={circleRadius}
					/>
				</g>
			</svg>
		</ScatterPlotChart>
	);
};
const ScatterPlotChart = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: #ffffff;
	padding: 5rem 2rem;
`;

const Controls = styled.div`
	.col-flex {
		display: flex;
		justify-content: center;
		align-content: space-between;
	}
	display: flex;
	/* justify-content: center; */
	align-content: space-between;
	.label {
		color: #d3599d;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		font-size: 1.5rem;
		padding: 0 1em;
	}
	.Dropdown-root {
		margin-right: 2rem;
		display: inline-block;
		.Dropdown-option {
			&.is-selected,
			:hover {
				background-color: #f8d3e7;
			}
		}
	}
`;

const TextEl = styled.text`
	fill: #d3599d;
	font-size: 2em;
	font-weight: 700;
`;

export default ScatterPlot;
