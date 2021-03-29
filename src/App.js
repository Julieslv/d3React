import React from 'react';

import PieArc from './components/pieArc/arc';
import Face from './components/face/face';
import Load from './components/loadeDataExample/dataExample';

import styled from 'styled-components';

const App = () => {
	return (
		<PageEl>
			<PieArc />
			{/* <Load /> */}
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
	flex-wrap: wrap;
`;

export default App;
