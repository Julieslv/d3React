import React, { useState, useCallback } from 'react';
import * as d3 from 'd3';

import styled from 'styled-components';

/* const FetchData = async dataUrl => {
	const response = await fetch(dataUrl);
	// console.log(await response.text());
	return await response.text();
}; */

const dataUrl =
	'https://gist.githubusercontent.com/curran/b236990081a24761f7000567094914e0/raw/acd2b8cecfe51c520622fbaf407ee88b8796bfc6/cssNamedColors.csv';

d3.csv(dataUrl).then(data => {
	console.log(`${Math.round(d3.csvFormat(data).length / 1024)}kb`);
	console.log(`${data.length} rows`);
	console.log(`${data.columns.length} coloums`);
});

/* FetchData(dataUrl).then(text => {
	const data = d3.csvParse(text);
	// console.log(data);
	console.log(`${Math.round(text.length / 1024)}kb`);
	console.log(`${data.length} rows`);
	console.log(`${data.columns.length} coloums`);
}); */

const width = window.innerWidth;
const height = 500;
const circleRadius = 30;

const initialMousePosition = { x: width / 2, y: height / 2 };

const LoadData = () => {
	const [mousePosition, setMousePosition] = useState(initialMousePosition);

	const handleMouseMove = useCallback(
		event => {
			const { clientX, clientY } = event;
			setMousePosition({ x: clientX, y: clientY });
		},
		[setMousePosition]
	);
	return (
		<LoadEl>
			<svg width={width} height={height} onMouseMove={handleMouseMove}>
				<circle cx={mousePosition.x} cy={mousePosition.y} r={circleRadius} />
			</svg>
		</LoadEl>
	);
};

const LoadEl = styled.div`
	margin: 0 auto;
	background: pink;
	display: flex;
	justify-content: center;
	align-items: center;

	svg {
		fill: yellow;
		background-color: red;
	}
`;

export default LoadData;
