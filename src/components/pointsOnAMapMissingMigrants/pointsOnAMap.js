import styled from 'styled-components';
// import { scaleLinear, timeFormat, extent } from 'd3';
import { LoadingDot as Loading } from '../shared/loading/loading';
import { useWorldAtlas } from './useWorldAtlas';
import { useData } from './useData';
import { Marks } from './Marks';
import { scaleSqrt, max } from 'd3';

const width = 960;
const height = 500;

const PointsOnAMap = () => {
	const worldAtlas = useWorldAtlas();
	const data = useData();

	if (!worldAtlas || !data) {
		return <Loading />;
	}

	const sizeValue = d => d['Total Dead and Missing']; // this is the value that we are interested in
	const maxRadius = 20; // this is the max radius of our circles
	//^ https://github.com/d3/d3-scale/blob/v4.0.2/README.md#scaleSqrt
	const sizeScale = scaleSqrt()
		.domain([0, max(data, sizeValue)])
		.range([0, maxRadius]);

	return (
		<svg width={width} height={height}>
			<Marks
				worldAtlas={worldAtlas}
				data={data}
				sizeScale={sizeScale}
				sizeValue={sizeValue}
			/>
		</svg>
	);
};

export default PointsOnAMap;
