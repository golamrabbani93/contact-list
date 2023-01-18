import React from 'react';
import {RiseLoader} from 'react-spinners';

import './Spinner.css';
const Spinner = () => {
	return (
		<div className="spinner">
			<RiseLoader color="#D94A38" />
		</div>
	);
};

export default Spinner;
