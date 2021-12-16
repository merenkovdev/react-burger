import PropTypes from 'prop-types';

const itemPropTypes = {
	_id: PropTypes.string,
	name: PropTypes.string,
	price: PropTypes.number,
	image: PropTypes.string,
	image_large: PropTypes.string,
	type: PropTypes.string,
	fat: PropTypes.number,
	calories: PropTypes.number,
	proteins: PropTypes.number,
	carbohydrates: PropTypes.number,
};

export {
	itemPropTypes,
};