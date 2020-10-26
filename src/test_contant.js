// for test only
import iPhone6 from 'assets/phoneCases/iphone6/iphone6.png';
import iPhone8 from 'assets/phoneCases/iphone8/iphone8.png';
import iPhone11 from 'assets/phoneCases/iphone11/11/iphone11.png';

const iphones = [
  {
    name: 'iPhone 6',
    price: 400,
    image: iPhone6,
    status: 0, // 0 don't have, 1 have, 2 using
  },
  {
    name: 'iPhone 6s',
    price: 450,
    image: iPhone6,
    status: 0, // 0 don't have, 1 have, 2 using
  },
  {
    name: 'iPhone 8',
    price: 500,
    image: iPhone8,
    status: 1, // 0 don't have, 1 have, 2 using
  },
  {
    name: 'iPhone 11',
    price: 1000,
    image: iPhone11,
    status: 2, // 0 don't have, 1 have, 2 using
  },
];

export { iphones };
