import React, { Fragment, useState } from 'react';
import BubbleMap from './bubbleMap';
import DateHistogram from './dateHistogram';
import { LoadingDot as Loading } from '../shared/loading/loading';
import { useWorldAtlas } from './useWorldAtlas';
import { useData } from './useData';
// move non changing data out of rendered exported react function
const width = 960;
const height = 650;
const dataHistogramSize = 0.2;
const xValue = d => d['Reported Date'];
const ScrubberMapWithBrushing = () => {
	const worldAtlas = useWorldAtlas();
	const data = useData();
	const [brushExtent, setBrushExtent] = useState();

	// console.log(brushExtent);

	if (!worldAtlas || !data) {
		return <Loading />;
	}
	// Filter the data once the data is loaded

	const filteredData = brushExtent
		? data.filter(d => {
				const date = xValue(d);
				return date > brushExtent[0] && date < brushExtent[1];
		  })
		: data;

	return (
		<>
			<h1>
				This dataset about missing migrants comes from the{' '}
				<a href='https://missingmigrants.iom.int/downloads'>
					{' '}
					{/*^ How to do an empty space in react */}
					Missing Migrants Project
				</a>
				.
			</h1>
			<svg width={width} height={height}>
				<BubbleMap
					worldAtlas={worldAtlas}
					filteredData={filteredData}
					data={data}
				/>
				<g transform={`translate(0, ${height - dataHistogramSize * height})`}>
					<DateHistogram
						data={data}
						height={dataHistogramSize * height}
						setBrushExtent={setBrushExtent}
						xValue={xValue}
					/>
				</g>
			</svg>
		</>
	);
};

export default ScrubberMapWithBrushing;
