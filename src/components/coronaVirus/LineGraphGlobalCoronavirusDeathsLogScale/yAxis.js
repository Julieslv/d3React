import { useRef, useEffect } from 'react';
import { select, axisLeft } from 'd3';

export const YAxis = ({ yScale, innerWidth }) => {
	const ref = useRef();
	useEffect(() => {
		const yAxisG = select(ref.current);
		const yAxis = axisLeft(yScale)
			.tickSize(-innerWidth)
			.tickPadding(18)
			// .tickFormat(tickValue => tickValue);
			.ticks(10, '~s');
		yAxisG.call(yAxis);
	}, []);
	/* because d3 is manipulating the dom, we leave this element alone so that we don't get conflicts between d3 and react */
	return <g ref={ref} />;
};
