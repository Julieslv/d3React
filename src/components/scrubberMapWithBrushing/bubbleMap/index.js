import { useMemo } from 'react';
import styled from 'styled-components';
import { Marks } from './Marks';
import { scaleSqrt, max } from 'd3';
const sizeValue = d => d['Total Dead and Missing']; // this is the value that we are interested in
const maxRadius = 20; // this is the max radius of our circles

const PointsOnAMap = ({ worldAtlas, filteredData, data }) => {
	const sizeScale = useMemo(() => {
		//^ https://github.com/d3/d3-scale/blob/v4.0.2/README.md#scaleSqrt
		return scaleSqrt()
			.domain([0, max(data, sizeValue)])
			.range([0, maxRadius]);
	}, [data]);

	return (
		<g>
			<Marks
				worldAtlas={worldAtlas}
				data={filteredData}
				sizeScale={sizeScale}
				sizeValue={sizeValue}
			/>
		</g>
	);
};

export default PointsOnAMap;
