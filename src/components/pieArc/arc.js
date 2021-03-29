import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';

import styled from 'styled-components';
const dataUrl =
	'https://gist.githubusercontent.com/curran/b236990081a24761f7000567094914e0/raw/acd2b8cecfe51c520622fbaf407ee88b8796bfc6/cssNamedColors.csv';

const PieArc = () => {
	const [data, setData] = useState(null);
	/* set state will call the App() function to render which will inturn cause the data fetch and memory leak
	 * we use useEffect to help with this.
	 * can manage when this side effect happens
	 */
	useEffect(() => {
		d3.csv(dataUrl).then(setData);
	}, []);
	// the array of state change(dependencies) where you want the effect to take place.
	// in our cse it's empty as we only wan this to render once.

	data ? console.log(data[0]) : console.log('no data');

	const width = window.innerWidth;
	const height = 500;
	const centerX = width / 2;
	const centerY = height / 2;

	const dataArc = d3.arc().innerRadius(0).outerRadius(width);
	const colorPie = d3.pie().value(1);
	if (data)
		return (
			<svg width={width} height={height}>
				<g transform={`translate(${centerX}, ${centerY})`}>
					{/* 					{data.map((d, i) => (
						<path
							fill={d['RGB hex value']}
							key={i}
							d={dataArc({
								startAngle: (i / data.length) * 2 * Math.PI,
								endAngle: ((i + 1) / data.length) * 2 * Math.PI,
							})}
						/>
					))} */}
				</g>
			</svg>
		);
	if (!data) return <DotCarousel className='dot-carousel'></DotCarousel>;
};

const DotCarousel = styled.div`
	position: relative;
	left: -9999px;
	width: 10px;
	height: 10px;
	border-radius: 50%;
	background-color: #9880ff;
	color: #9880ff;
	box-shadow: 9984px 0 0 0 #9880ff, 9999px 0 0 0 #9880ff, 10014px 0 0 0 #9880ff;
	animation: dotCarousel 1.5s infinite linear;

	@keyframes dotCarousel {
		0% {
			box-shadow: 9984px 0 0 -1px #9880ff, 9999px 0 0 1px #9880ff,
				10014px 0 0 -1px #9880ff;
		}
		50% {
			box-shadow: 10014px 0 0 -1px #9880ff, 9984px 0 0 -1px #9880ff,
				9999px 0 0 1px #9880ff;
		}
		100% {
			box-shadow: 9999px 0 0 1px #9880ff, 10014px 0 0 -1px #9880ff,
				9984px 0 0 -1px #9880ff;
		}
	}
`;

export default PieArc;
