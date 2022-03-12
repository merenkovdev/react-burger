import { TOrder, TUser } from './../../../types/api';
import { TTopping } from '../../../types/ingredient';
import { TItem } from '../../../types/api';

const bunMock: TItem = {
	_id: "60d3b41abdacab0026a733c7",
	name: "Флюоресцентная булка R2-D3",
	type: "bun",
	proteins: 44,
	fat: 26,
	carbohydrates: 85,
	calories: 643,
	price: 988,
	image: "https://code.s3.yandex.net/react/code/bun-01.png",
	image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
};

const uidToppingMock = "N4ExNxw0h15PQn4jpWIQb";

const toppingMock: TTopping = {
	_id: "60d3b41abdacab0026a733c9",
	name: "Мясо бессмертных моллюсков Protostomia",
	type: "main",
	proteins: 433,
	fat: 244,
	carbohydrates: 33,
	calories: 420,
	price: 1337,
	image: "https://code.s3.yandex.net/react/code/meat-02.png",
	image_large: "https://code.s3.yandex.net/react/code/meat-02-large.png",
	uid: uidToppingMock,
};

const uidSauceMock = 'orFKVr2DZ1NqJIXCOP8Jc';

const sauceMock: TTopping = {
	_id: "60d3b41abdacab0026a733cd",
	name: "Соус фирменный Space Sauce",
	type: "sauce",
	proteins: 50,
	fat: 22,
	carbohydrates: 11,
	calories: 14,
	price: 80,
	image: "https://code.s3.yandex.net/react/code/sauce-04.png",
	image_large: "https://code.s3.yandex.net/react/code/sauce-04-large.png",
	uid: uidSauceMock,
};

const sortedItems = {
	bun: [bunMock],
	main: [toppingMock],
	sauce: [sauceMock],
};

const mockOrder1: TOrder = {
	createdAt: "2022-03-09T20:00:36.691Z",
	ingredients: ["60d3b41abdacab0026a733c6", "60d3b41abdacab0026a733c6", "60d3b41abdacab0026a733cc"],
	name: "Space био-марсианский краторный spicy бессмертный бургер",
	number: 11411,
	status: "done",
	updatedAt: "2022-03-09T20:00:36.928Z",
	_id: "6229076425b9a4001b6e3ca5",
};

const mockOrder2: TOrder = {
	createdAt: "2022-03-09T19:57:48.188Z",
	ingredients: ["60d3b41abdacab0026a733c7", "60d3b41abdacab0026a733c7", "60d3b41abdacab0026a733cd"],
	name: "Флюоресцентный space бургер",
	number: 11410,
	status: "done",
	updatedAt: "2022-03-09T19:57:48.401Z",
	_id: "622906bc25b9a4001b6e3ca2",
};

const mockUser: TUser = {
	name: 'test777',
	email: 'test777@gmail.com',
};

export {
	bunMock,
	toppingMock,
	sauceMock,
	uidSauceMock,
	uidToppingMock,
	sortedItems,
	mockOrder1,
	mockOrder2,
	mockUser,
};