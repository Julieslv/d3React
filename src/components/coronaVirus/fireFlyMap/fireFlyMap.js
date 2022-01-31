import styled from 'styled-components';

import { Cartography } from './Cartography';
import { useData } from './useData';

const FireFlyMap = () => {
	const data = useData();
	return <Cartography data={data} />;
};

export default FireFlyMap;
