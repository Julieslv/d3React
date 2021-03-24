import * as d3 from 'd3';

const message = data =>
	`${Math.round(d3.csvFormat(data).length / 1024)}kb | ${data.length} rows | ${
		data.columns.length
	} columns`;

export default message;
