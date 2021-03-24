import React, { useState, useCallback } from 'react';
import * as d3 from 'd3';
import Face from './components/face';

import styled from 'styled-components';

console.log(d3);

const FetchData = async dataUrl => {
	const response = await fetch(dataUrl);
	// console.log(await response.text());
	// const data = d3.csvParse(text);
	// console.log(data);
	return await response.text();
};

const dataUrl =
	'https://gist.githubusercontent.com/curran/b236990081a24761f7000567094914e0/raw/acd2b8cecfe51c520622fbaf407ee88b8796bfc6/cssNamedColors.csv';
FetchData(dataUrl).then(text => {
	// console.log(text);
});

const width = 960;
const height = 500;
const circleRadius = 30;

console.log(window.width);

const initialMousePosition = { x: width / 2, y: height / 2 };

const App = () => {
	const [mousePosition, setMousePosition] = useState(initialMousePosition);

	const handleMouseMove = useCallback(
		event => {
			const { clientX, clientY } = event;
			setMousePosition({ x: clientX, y: clientY });
		},
		[setMousePosition]
	);
	return (
		<PageEl>
			<svg width={width} height={height} onMouseMove={handleMouseMove}>
				<circle cx={mousePosition.x} cy={mousePosition.y} r={circleRadius} />
			</svg>

			{/* <Face /> */}
		</PageEl>
	);
};

const PageEl = styled.div`
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

export default App;
