import React from 'react';

// import PieArc from './components/pieArc/arc';
// import Face from './components/face/face';
// import Load from './components/loadeDataExample/dataExample';
// import BarChart from './components/barChart/barChart';
// import ScatterPlot from './components/scatterPlot/ScatterPlot';
// import LineChart from './components/lineChart/lineChart';
// import GeoChart from './components/geoChart/geoChart';
// import SelectScatter from './components/selectChart/ScatterPlot';
// import PointsOnAMap from './components/pointsOnAMap/pointsOnAMap';
// import WorkingWithTime from './components/workingWithTime/workingWithTime';
// import PointsOnAMapMissingMigrants from './components/pointsOnAMapMissingMigrants/pointsOnAMap';
// import ScrubberMap from './components/scrubberMap/scrubberMap';
import ScrubberMapWithBrushing from './components/scrubberMapWithBrushing/scrubberMapWithBrushing.js';

import styled from 'styled-components';

const App = () => {
	return (
		<>
			<FlexColumn>
				<div>{/* <SelectScatter /> */}</div>
			</FlexColumn>
			<FlexCenter>
				<ScrubberMapWithBrushing />
				{/* <ScrubberMap /> */}
				{/* <PointsOnAMapMissingMigrants /> */}
				{/* <WorkingWithTime /> */}
				{/* <PointsOnAMap /> */}
				{/* <GeoChart /> */}
				{/* <LineChart /> */}
				{/* <BarChart /> */}
				{/* <ScatterPlot /> */}
				{/* <PieArc /> */}
				{/* <Load /> */}
				{/* <Face /> */}
			</FlexCenter>
		</>
	);
};

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
	display: flex;
	justify-content: center;
	align-items: center;
	flex-wrap: wrap;
	min-height: 100vh;
`;

export default App;
