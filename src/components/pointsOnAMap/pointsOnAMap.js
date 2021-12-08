import styled from 'styled-components';
// import { scaleLinear, timeFormat, extent } from 'd3';
import { useWorldAtlas } from './useWorldAtlas';
import { useCities } from './useCities';
import { Marks } from './Marks';
import { scaleSqrt, max } from 'd3';

const width = 960;
const height = 500;

const PointsOnAMap = () => {
	const worldAtlas = useWorldAtlas();
	const cities = useCities();
	// console.log(cities);

	if (!worldAtlas || !cities) {
		return (
			<Loading>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<em>Loading...</em>
			</Loading>
		);
	}

	const sizeValue = d => d.population; // this is the value that we are interested in
	const maxRadius = 20; // this is the max radius of our circles
	//^ https://github.com/d3/d3-scale/blob/v4.0.2/README.md#scaleSqrt
	const sizeScale = scaleSqrt()
		.domain([0, max(cities, sizeValue)])
		.range([0, maxRadius]);

	return (
		<svg width={width} height={height}>
			<Marks
				worldAtlas={worldAtlas}
				cities={cities}
				sizeScale={sizeScale}
				sizeValue={sizeValue}
			/>
		</svg>
	);
};

export default PointsOnAMap;

const Loading = styled.pre`
	display: inline-block;
	position: relative;
	width: 80px;
	height: 80px;
	div {
		animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
		transform-origin: 40px 40px;
	}
	div:after {
		content: ' ';
		display: block;
		position: absolute;
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: #fff;
		margin: -4px 0 0 -4px;
	}
	div:nth-child(1) {
		animation-delay: -0.036s;
	}
	div:nth-child(1):after {
		top: 63px;
		left: 63px;
	}
	div:nth-child(2) {
		animation-delay: -0.072s;
	}
	div:nth-child(2):after {
		top: 68px;
		left: 56px;
	}
	div:nth-child(3) {
		animation-delay: -0.108s;
	}
	div:nth-child(3):after {
		top: 71px;
		left: 48px;
	}
	div:nth-child(4) {
		animation-delay: -0.144s;
	}
	div:nth-child(4):after {
		top: 72px;
		left: 40px;
	}
	div:nth-child(5) {
		animation-delay: -0.18s;
	}
	div:nth-child(5):after {
		top: 71px;
		left: 32px;
	}
	div:nth-child(6) {
		animation-delay: -0.216s;
	}
	div:nth-child(6):after {
		top: 68px;
		left: 24px;
	}
	div:nth-child(7) {
		animation-delay: -0.252s;
	}
	div:nth-child(7):after {
		top: 63px;
		left: 17px;
	}
	div:nth-child(8) {
		animation-delay: -0.288s;
	}
	div:nth-child(8):after {
		top: 56px;
		left: 12px;
	}
	@keyframes lds-roller {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`;
