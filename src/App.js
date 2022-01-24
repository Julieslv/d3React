import React, { useEffect } from 'react';

import PieArc from './components/pieArc/arc';
import Face from './components/face/face';
import Load from './components/loadeDataExample/dataExample';
import BarChart from './components/barChart/barChart';
import ScatterPlot from './components/scatterPlot/ScatterPlot';
import LineChart from './components/lineChart/lineChart';
import GeoChart from './components/geoChart/geoChart';
import SelectScatter from './components/selectChart/ScatterPlot';
import PointsOnAMap from './components/pointsOnAMap/pointsOnAMap';
import WorkingWithTime from './components/workingWithTime/workingWithTime';
import PointsOnAMapMissingMigrants from './components/pointsOnAMapMissingMigrants/pointsOnAMap';
import ScrubberMap from './components/scrubberMap/scrubberMap';
import ScrubberMapWithBrushing from './components/scrubberMapWithBrushing/scrubberMapWithBrushing.js';
import ScatterPlotLogScale from './components/scatterPlotLogScale';
import ChloroplethMapMissingMigrants from './components/choroplethMapMissingMigrants/pointsOnAMap';

import styled from 'styled-components';

const App = () => {
	// ^ set the document title in the component
	// useEffect(() => {
	// 	document.title = 'This is a title';
	// }, []);
	return (
		<ContainerEl>
			<FlexColumn>
				<div>{/* <SelectScatter /> */}</div>
			</FlexColumn>
			<FlexCenter>
				{/* <ChloroplethMapMissingMigrants /> */}
				{/* <ScatterPlotLogScale /> */}
				{/* <ScrubberMapWithBrushing /> */}
				{/* <ScrubberMap /> */}
				{/* <PointsOnAMapMissingMigrants /> */}
				{/* <WorkingWithTime /> */}
				{/* <PointsOnAMap /> */}
				{/* <GeoChart /> */}
				<LineChart />
				{/* <BarChart /> */}
				{/* <ScatterPlot /> */}
				{/* <PieArc /> */}
				{/* <Load /> */}
				{/* <Face /> */}
			</FlexCenter>
		</ContainerEl>
	);
};

const ContainerEl = styled.div`
	h1 {
		color: #ffaba9;
		font-size: 5rem;
		/* margin-bottom: 0; */
		/* text-transform: uppercase; */
		font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
	}
	p {
		color: #ffaba9;
	}
	a {
		color: #ffaba9;
	}
`;
const FlexColumn = styled.div`
	margin: 0 auto;
	/* display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center; */
`;

const FlexCenter = styled.div`
	margin: 0 auto;
	background: #ffe9ed;
	background: #f5fbf9;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	flex-wrap: wrap;
	min-height: 100vh;
	margin: 1rem;
`;

export default App;
