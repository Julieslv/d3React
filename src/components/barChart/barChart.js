import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';
import Loading from '../loading/loading';

// console.log(d3);
const dataUrl =
	'https://gist.githubusercontent.com/curran/0ac4077c7fc6390f5dd33bf5c06cb5ff/raw/605c54080c7a93a417a3cea93fd52e7550e76500/UN_Population_2019.csv';
const BarChart = () => {
	const [data, setData] = useState(null);

	useEffect(() => {
		const newRow = d => {
			d.Population = +d['2020'];
			return d;
		};
		d3.csv(dataUrl, newRow).then(data => {
			// pass in the data to setData and slice at 10 i.e. top 10
			setData(data.slice(0, 10));
		});
	}, []);

	if (!data) {
		return <Loading />;
	}

	console.log(data[0]);

	const width = window.innerWidth;
	const height = 500;

	const yScale = d3
		.scaleBand()
		.domain(data.map(d => d.Country))
		.range([0, height]);

	const xScale = d3
		.scaleLinear()
		.domain([0, d3.max(data, d => d.Population)])
		.range([0, width]);

	return (
		<svg width={width} height={height}>
			{data.map(d => (
				<rect
					key={d['Country code']}
					x={0}
					y={yScale(d.Country)}
					width={xScale(d.Population)}
					height={yScale.bandwidth()}
				/>
			))}
		</svg>
	);
};

export default BarChart;
