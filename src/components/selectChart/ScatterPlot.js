import React, { useState } from 'react';
import styled from 'styled-components';
import { scaleLinear, format, extent } from 'd3';

import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

import { useData } from './components/useData';
import { AxisBottom } from './components/AxisBottom';
import { AxisLeft } from './components/AxisLeft';
import { Marks } from './components/Marks';
import { DropdownOLD } from './components/Dropdown';

const width = 960;
const height = 500;
const margin = { top: 20, right: 30, bottom: 65, left: 90 };
const xAxisLabelOffset = 50;
const yAxisLabelOffset = 45;
const gridStrokeColour = '#00000035';
const markFillColour = '#ff000065';

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

	const options = ['one', 'two', 'three'];
	const defaultOption = options[0];

	if (!data) {
		return <pre>Loading...</pre>;
	}

	console.log(data.columns);

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

	return (
		<>
			<Controls>
				<div>
					<label htmlFor='x-select'>X: </label>
					{/* 					<DropdownOLD
						options={attributes}
						id='x-select'
						selectedValue={xAttribute}
						onSelectedValueChange={setXAttribute}
					/> */}
					<Dropdown
						options={attributes}
						onChange={setXAttribute}
						value={xAttribute}
						placeholder={xAttribute}
					/>
				</div>
				<div>
					<label htmlFor='x-select'>Y: </label>
					{/* 					<DropdownOLD
						options={attributes}
						id='x-select'
						selectedValue={yAttribute}
						onSelectedValueChange={setYAttribute}
					/> */}
					<Dropdown
						options={attributes}
						onChange={setYAttribute}
						value={yAttribute}
						placeholder={yAttribute}
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

const Controls = styled.div`
	display: flex;
	/* justify-content: center; */
	align-content: space-between;
	label {
		display: inline-block;
		margin: 0 1em;
	}
	select {
		margin-right: 2rem;
	}
`;

const TextEl = styled.text`
	fill: rgba(155, 0, 0, 0.2);
	font-size: 2em;
	font-weight: 700;
	text-anchor: middle;
`;

export default ScatterPlot;
