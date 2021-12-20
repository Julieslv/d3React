import React, { Fragment } from 'react';
import BubbleMap from './bubbleMap/';
import DateHistogram from './dateHistogram/';
import { LoadingDot as Loading } from '../shared/loading/loading';
import { useWorldAtlas } from './useWorldAtlas';
import { useData } from './useData';
const ScrubberMap = () => {
	const width = 960;
	const height = 650;
	const dataHistogramSize = 0.2;

	const worldAtlas = useWorldAtlas();
	const data = useData();

	if (!worldAtlas || !data) {
		return <Loading />;
	}
	return (
		<svg width={width} height={height}>
			<BubbleMap worldAtlas={worldAtlas} data={data} />
			<g transform={`translate(0, ${height - dataHistogramSize * height})`}>
				<DateHistogram data={data} height={dataHistogramSize * height} />
			</g>
		</svg>
	);
};

export default ScrubberMap;
