import styled from 'styled-components';
// import { scaleLinear, timeFormat, extent } from 'd3';
import { useData } from './useData';
import { Marks } from './Marks';

const width = 960;
const height = 500;

const GeoChart = () => {
	const data = useData();

	if (!data) {
		return <pre>Loading...</pre>;
	}

	return (
		<svg width={width} height={height}>
			<Marks data={data} />
		</svg>
	);
};

export default GeoChart;
