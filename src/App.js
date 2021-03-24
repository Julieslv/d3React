import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';

import Face from './components/face';
import Load from './components/loadeDataExample';

import message from './utilities/message';

import styled from 'styled-components';

const dataUrl =
	'https://gist.githubusercontent.com/curran/b236990081a24761f7000567094914e0/raw/acd2b8cecfe51c520622fbaf407ee88b8796bfc6/cssNamedColors.csv';

const App = () => {
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

	return (
		<PageEl>
			<div>
				<h1>Data is {data ? message(data) : 'loading'}</h1>
			</div>
			<Load />
			<Face />
		</PageEl>
	);
};

const PageEl = styled.div`
	margin: 0 auto;
	background: pink;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-wrap: wrap;
`;

export default App;
