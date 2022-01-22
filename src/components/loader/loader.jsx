import styles from './loader.module.css';

const Loader = () => {
	return (
		<div className={ styles.loader + ' pt-20 pb-20' }>
			<p className="text text_type_main-medium">...Загрузка</p>
		</div>
	)
};

export default Loader;