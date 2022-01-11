import styled from 'styled-components';
// import { scaleLinear, timeFormat, extent } from 'd3';
import { Marks } from './Marks';
import { scaleSqrt, max } from 'd3';

const PointsOnAMap = ({ worldAtlas, data }) => {
	const sizeValue = d => d['Total Dead and Missing']; // this is the value that we are interested in
	const maxRadius = 20; // this is the max radius of our circles
	//^ https://github.com/d3/d3-scale/blob/v4.0.2/README.md#scaleSqrt
	const sizeScale = scaleSqrt()
		.domain([0, max(data, sizeValue)])
		.range([0, maxRadius]);

	return (
		<g>
			<Marks
				worldAtlas={worldAtlas}
				data={data}
				sizeScale={sizeScale}
				sizeValue={sizeValue}
			/>
		</g>
	);
};

export default PointsOnAMap;
