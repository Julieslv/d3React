import React, { useState } from 'react';

import styled from 'styled-components';
import Dropdown from './dropDown';

const options = [
	{ value: 'dog', label: 'Dog' },
	{ value: 'cat', label: 'Cat' },
	{ value: 'hamster', label: 'Hamster' },
	{ value: 'parrot', label: 'Parrot' },
	{ value: 'spider', label: 'Spider' },
	{ value: 'goldfish', label: 'Goldfish' },
];

const SelectChart = () => {
	const [optionValue, setValueOption] = useState();
	console.log(`optionValue: ${optionValue}`);
	return (
		<SelectChartEl>
			<label htmlFor='pet-select'>Choose a pet: </label>
			<Dropdown
				options={options}
				id='pet-select'
				onSelectedValueChange={setValueOption}
			/>
		</SelectChartEl>
	);
};

export default SelectChart;

const SelectChartEl = styled.div`
	padding: 10px;
	label {
		display: inline-block;
		padding-right: 10px;
	}
`;
