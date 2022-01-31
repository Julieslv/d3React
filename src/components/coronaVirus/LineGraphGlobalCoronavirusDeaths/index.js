import { range } from 'd3';
import { useData } from './useData';
import { LineChart } from './LineChart';
import Loading from '../../loading/loading';

const width = window.innerWidth;
const height = window.innerHeight;

const GlobalCoronavirusDeaths = () => {
	const data = useData();
	return data ? (
		<LineChart data={data} width={width} height={height} />
	) : (
		<div>Loading...</div>
	);
};

export default GlobalCoronavirusDeaths;
