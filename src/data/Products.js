import axios from "axios";
import {useState} from "react";

// let products =  [
//   {
//     _id: '1',
//     name: 'Velcro Ballerinas For Girls  (Pink)',
//     image: '/images/6.png',
//     description:
//       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
//     price: 89,
//     countInStock: 3,
//     rating: 4,
//     numReviews: 4,
//   },
//   {
//     _id: '2',
//     name: 'Velcro Sneakers For Boys & Girls  (Blue)',
//     image: '/images/5.png',
//     description:
//       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
//     price: 599,
//     countInStock: 10,
//     rating: 2,
//     numReviews: 2,
//   },
//   {
//     _id: '3',
//     name: 'Sesame Street Unisex-Child ELMO Puppet Slipper',
//     image: '/images/4.png',
//     description:
//       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
//     price: 929,
//     countInStock: 0,
//     rating: 3.5,
//     numReviews: 3,
//   },
//   {
//     _id: '4',
//     name: 'Lace Casual Boots For Boys & Girls  (Tan)',
//     image: '/images/3.png',
//     description:
//       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
//     price: 399,
//     countInStock: 10,
//     rating: 5,
//     numReviews: 9,
//   },
//   {
//     _id: '5',
//     name: 'Lace Walking Shoes For Boys & Girls  (Pink)',
//     image: '/images/2.png',
//     description:
//       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
//     price: 49,
//     countInStock: 7,
//     rating: 2,
//     numReviews: 2,
//   },
//   {
//     _id: '6',
//     name: 'Women Red Heels Sandal',
//     image: '/images/1.png',
//     description:
//       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
//     price: 29,
//     countInStock: 0,
//     rating: 0,
//     numReviews: 0,
//   },{
//     _id: '7',
//     name: 'TESTVelcro Ballerinas For Girls  (Pink)',
//     image: '/images/6.png',
//     description:
//         "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
//     price: 89,
//     countInStock: 3,
//     rating: 4,
//     numReviews: 4,
//   },
//   {
//     _id: '8',
//     name: 'TESTVelcro Sneakers For Boys & Girls  (Blue)',
//     image: '/images/5.png',
//     description:
//         "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
//     price: 599,
//     countInStock: 10,
//     rating: 2,
//     numReviews: 2,
//   },
//   {
//     _id: '9',
//     name: 'TESTSesame Street Unisex-Child ELMO Puppet Slipper',
//     image: '/images/4.png',
//     description:
//         "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
//     price: 929,
//     countInStock: 0,
//     rating: 3.5,
//     numReviews: 3,
//   },
//   {
//     _id: '10',
//     name: 'TESTLace Casual Boots For Boys & Girls  (Tan)',
//     image: '/images/3.png',
//     description:
//         "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
//     price: 399,
//     countInStock: 10,
//     rating: 5,
//     numReviews: 9,
//   },
//   {
//     _id: '11',
//     name: 'TESTLace Walking Shoes For Boys & Girls  (Pink)',
//     image: '/images/2.png',
//     description:
//         "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
//     price: 49,
//     countInStock: 7,
//     rating: 2,
//     numReviews: 2,
//   },
//   {
//     _id: '12',
//     name: 'TESTWomen Red Heels Sandal',
//     image: '/images/1.png',
//     description:
//         "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
//     price: 29,
//     countInStock: 0,
//     rating: 0,
//     numReviews: 0,
//   },
//   {
//     _id: '13',
//     name: 'TEST2Velcro Ballerinas For Girls  (Pink)',
//     image: '/images/6.png',
//     description:
//         "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
//     price: 89,
//     countInStock: 3,
//     rating: 4,
//     numReviews: 4,
//   },
//   {
//     _id: '14',
//     name: 'TEST2Velcro Sneakers For Boys & Girls  (Blue)',
//     image: '/images/5.png',
//     description:
//         "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
//     price: 599,
//     countInStock: 10,
//     rating: 2,
//     numReviews: 2,
//   },
//   {
//     _id: '15',
//     name: 'TEST2Sesame Street Unisex-Child ELMO Puppet Slipper',
//     image: '/images/4.png',
//     description:
//         "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
//     price: 929,
//     countInStock: 0,
//     rating: 3.5,
//     numReviews: 3,
//   },
//   {
//     _id: '16',
//     name: 'TEST2Lace Casual Boots For Boys & Girls  (Tan)',
//     image: '/images/3.png',
//     description:
//         "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
//     price: 399,
//     countInStock: 10,
//     rating: 5,
//     numReviews: 9,
//   },
//   {
//     _id: '17',
//     name: 'TEST2Lace Walking Shoes For Boys & Girls  (Pink)',
//     image: '/images/2.png',
//     description:
//         "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
//     price: 49,
//     countInStock: 7,
//     rating: 2,
//     numReviews: 2,
//   },
//   {
//     _id: '18',
//     name: 'TEST2Women Red Heels Sandal',
//     image: '/images/1.png',
//     description:
//         "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
//     price: 29,
//     countInStock: 0,
//     rating: 0,
//     numReviews: 0,
//   },{
//     _id: '19',
//     name: 'TEST2TESTVelcro Ballerinas For Girls  (Pink)',
//     image: '/images/6.png',
//     description:
//         "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
//     price: 89,
//     countInStock: 3,
//     rating: 4,
//     numReviews: 4,
//   },
//   {
//     _id: '20',
//     name: 'TEST2TESTVelcro Sneakers For Boys & Girls  (Blue)',
//     image: '/images/5.png',
//     description:
//         "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
//     price: 599,
//     countInStock: 10,
//     rating: 2,
//     numReviews: 2,
//   },
//   {
//     _id: '21',
//     name: 'TEST2TESTSesame Street Unisex-Child ELMO Puppet Slipper',
//     image: '/images/4.png',
//     description:
//         "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
//     price: 929,
//     countInStock: 0,
//     rating: 3.5,
//     numReviews: 3,
//   },
//   {
//     _id: '22',
//     name: 'TEST2TESTLace Casual Boots For Boys & Girls  (Tan)',
//     image: '/images/3.png',
//     description:
//         "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
//     price: 399,
//     countInStock: 10,
//     rating: 5,
//     numReviews: 9,
//   },
//   {
//     _id: '23',
//     name: 'TEST2TESTLace Walking Shoes For Boys & Girls  (Pink)',
//     image: '/images/2.png',
//     description:
//         "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
//     price: 49,
//     countInStock: 7,
//     rating: 2,
//     numReviews: 2,
//   },
//   {
//     _id: '24',
//     name: 'TEST2TESTWomen Red Heels Sandal',
//     image: '/images/1.png',
//     description:
//         "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
//     price: 29,
//     countInStock: 0,
//     rating: 0,
//     numReviews: 0,
//   },
//   {
//     _id: '25',
//     name: 'TEST2 Ballerinas For Girls  (Pink)',
//     image: '/images/6.png',
//     description:
//         "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
//     price: 89,
//     countInStock: 3,
//     rating: 4,
//     numReviews: 4,
//   },
//   {
//     _id: '26',
//     name: 'TEST2Velcro Sneakers For Boys & Girls  (Blue)',
//     image: '/images/5.png',
//     description:
//         "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
//     price: 599,
//     countInStock: 10,
//     rating: 2,
//     numReviews: 2,
//   },
//   {
//     _id: '27',
//     name: 'TEST2Sesame Street Unisex-Child ELMO Puppet Slipper',
//     image: '/images/4.png',
//     description:
//         "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
//     price: 929,
//     countInStock: 0,
//     rating: 3.5,
//     numReviews: 3,
//   },
//   {
//     _id: '28',
//     name: 'TEST2Lace Casual Boots For Boys & Girls  (Tan)',
//     image: '/images/3.png',
//     description:
//         "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
//     price: 399,
//     countInStock: 10,
//     rating: 5,
//     numReviews: 9,
//   },
//   {
//     _id: '29',
//     name: 'TEST2Lace Walking Shoes For Boys & Girls  (Pink)',
//     image: '/images/2.png',
//     description:
//         "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
//     price: 49,
//     countInStock: 7,
//     rating: 2,
//     numReviews: 2,
//   },
//   {
//     _id: '30',
//     name: 'TEST2Women Red Heels Sandal',
//     image: '/images/1.png',
//     description:
//         "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
//     price: 29,
//     countInStock: 0,
//     rating: 0,
//     numReviews: 0,
//   },{
//     _id: '31',
//     name: 'TEST2TESTVelcro Ballerinas For Girls  (Pink)',
//     image: '/images/6.png',
//     description:
//         "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
//     price: 89,
//     countInStock: 3,
//     rating: 4,
//     numReviews: 4,
//   },
//   {
//     _id: '32',
//     name: 'TEST2TESTVelcro Sneakers For Boys & Girls  (Blue)',
//     image: '/images/5.png',
//     description:
//         "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
//     price: 599,
//     countInStock: 10,
//     rating: 2,
//     numReviews: 2,
//   },
//   {
//     _id: '33',
//     name: 'TEST2TESTSesame Street Unisex-Child ELMO Puppet Slipper',
//     image: '/images/4.png',
//     description:
//         "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
//     price: 929,
//     countInStock: 0,
//     rating: 3.5,
//     numReviews: 3,
//   },
//   {
//     _id: '34',
//     name: 'TEST2TESTLace Casual Boots For Boys & Girls  (Tan)',
//     image: '/images/3.png',
//     description:
//         "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
//     price: 399,
//     countInStock: 10,
//     rating: 5,
//     numReviews: 9,
//   },
//   {
//     _id: '35',
//     name: 'TEST2TESTLace Walking Shoes For Boys & Girls  (Pink)',
//     image: '/images/2.png',
//     description:
//         "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
//     price: 49,
//     countInStock: 7,
//     rating: 2,
//     numReviews: 2,
//   },
//   {
//     _id: '36',
//     name: 'TEST3TESTWomen Red Heels Sandal',
//     image: '/images/1.png',
//     description:
//         "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
//     price: 29,
//     countInStock: 0,
//     rating: 0,
//     numReviews: 0,
//   },
//   {
//     _id: '37',
//     name: 'TEST3Velcro Ballerinas For Girls  (Pink)',
//     image: '/images/6.png',
//     description:
//         "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
//     price: 89,
//     countInStock: 3,
//     rating: 4,
//     numReviews: 4,
//   },
//   {
//     _id: '38',
//     name: 'TEST3Velcro Sneakers For Boys & Girls  (Blue)',
//     image: '/images/5.png',
//     description:
//         "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
//     price: 599,
//     countInStock: 10,
//     rating: 2,
//     numReviews: 2,
//   },
//   {
//     _id: '39',
//     name: 'TEST3Sesame Street Unisex-Child ELMO Puppet Slipper',
//     image: '/images/4.png',
//     description:
//         "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
//     price: 929,
//     countInStock: 0,
//     rating: 3.5,
//     numReviews: 3,
//   },
//   {
//     _id: '40',
//     name: 'TEST3Lace Casual Boots For Boys & Girls  (Tan)',
//     image: '/images/3.png',
//     description:
//         "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
//     price: 399,
//     countInStock: 10,
//     rating: 5,
//     numReviews: 9,
//   },
//   {
//     _id: '41',
//     name: 'TEST3Lace Walking Shoes For Boys & Girls  (Pink)',
//     image: '/images/2.png',
//     description:
//         "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
//     price: 49,
//     countInStock: 7,
//     rating: 2,
//     numReviews: 2,
//   },
//   {
//     _id: '42',
//     name: 'TEST3Women Red Heels Sandal',
//     image: '/images/1.png',
//     description:
//         "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
//     price: 29,
//     countInStock: 0,
//     rating: 0,
//     numReviews: 0,
//   },{
//     _id: '43',
//     name: 'TEST3TESTVelcro Ballerinas For Girls  (Pink)',
//     image: '/images/6.png',
//     description:
//         "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
//     price: 89,
//     countInStock: 3,
//     rating: 4,
//     numReviews: 4,
//   },
//   {
//     _id: '44',
//     name: 'TEST3TESTVelcro Sneakers For Boys & Girls  (Blue)',
//     image: '/images/5.png',
//     description:
//         "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
//     price: 599,
//     countInStock: 10,
//     rating: 2,
//     numReviews: 2,
//   },
//   {
//     _id: '45',
//     name: 'TEST3TESTSesame Street Unisex-Child ELMO Puppet Slipper',
//     image: '/images/4.png',
//     description:
//         "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
//     price: 929,
//     countInStock: 0,
//     rating: 3.5,
//     numReviews: 3,
//   },
//   {
//     _id: '46',
//     name: 'TEST3TESTLace Casual Boots For Boys & Girls  (Tan)',
//     image: '/images/3.png',
//     description:
//         "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
//     price: 399,
//     countInStock: 10,
//     rating: 5,
//     numReviews: 9,
//   },
//   {
//     _id: '47',
//     name: 'TEST3TESTLace Walking Shoes For Boys & Girls  (Pink)',
//     image: '/images/2.png',
//     description:
//         "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
//     price: 49,
//     countInStock: 7,
//     rating: 2,
//     numReviews: 2,
//   },
//   {
//     _id: '48',
//     name: 'TEST3TESTWomen Red Heels Sandal',
//     image: '/images/1.png',
//     description:
//         "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
//     price: 29,
//     countInStock: 0,
//     rating: 0,
//     numReviews: 0,
//   },
//   {
//     _id: '49',
//     name: 'TEST4Velcro Ballerinas For Girls  (Pink)',
//     image: '/images/6.png',
//     description:
//         "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
//     price: 89,
//     countInStock: 3,
//     rating: 4,
//     numReviews: 4,
//   },
//   {
//     _id: '50',
//     name: 'TEST4Velcro Sneakers For Boys & Girls  (Blue)',
//     image: '/images/5.png',
//     description:
//         "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
//     price: 599,
//     countInStock: 10,
//     rating: 2,
//     numReviews: 2,
//   },
//   {
//     _id: '51',
//     name: 'TEST4Sesame Street Unisex-Child ELMO Puppet Slipper',
//     image: '/images/4.png',
//     description:
//         "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
//     price: 929,
//     countInStock: 0,
//     rating: 3.5,
//     numReviews: 3,
//   },
//   {
//     _id: '52',
//     name: 'TEST4Lace Casual Boots For Boys & Girls  (Tan)',
//     image: '/images/3.png',
//     description:
//         "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
//     price: 399,
//     countInStock: 10,
//     rating: 5,
//     numReviews: 9,
//   },
//   {
//     _id: '53',
//     name: 'TEST4Lace Walking Shoes For Boys & Girls  (Pink)',
//     image: '/images/2.png',
//     description:
//         "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
//     price: 49,
//     countInStock: 7,
//     rating: 2,
//     numReviews: 2,
//   },
//   {
//     _id: '54',
//     name: 'TEST4Women Red Heels Sandal',
//     image: '/images/1.png',
//     description:
//         "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
//     price: 29,
//     countInStock: 0,
//     rating: 0,
//     numReviews: 0,
//   },{
//     _id: '55',
//     name: 'TEST4TESTVelcro Ballerinas For Girls  (Pink)',
//     image: '/images/6.png',
//     description:
//         "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
//     price: 89,
//     countInStock: 3,
//     rating: 4,
//     numReviews: 4,
//   },
//   {
//     _id: '56',
//     name: 'TEST4TESTVelcro Sneakers For Boys & Girls  (Blue)',
//     image: '/images/5.png',
//     description:
//         "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
//     price: 599,
//     countInStock: 10,
//     rating: 2,
//     numReviews: 2,
//   },
//   {
//     _id: '57',
//     name: 'TEST4TESTSesame Street Unisex-Child ELMO Puppet Slipper',
//     image: '/images/4.png',
//     description:
//         "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
//     price: 929,
//     countInStock: 0,
//     rating: 3.5,
//     numReviews: 3,
//   },
//   {
//     _id: '58',
//     name: 'TEST4TESTLace Casual Boots For Boys & Girls  (Tan)',
//     image: '/images/3.png',
//     description:
//         "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
//     price: 399,
//     countInStock: 10,
//     rating: 5,
//     numReviews: 9,
//   },
//   {
//     _id: '59',
//     name: 'TEST4TESTLace Walking Shoes For Boys & Girls  (Pink)',
//     image: '/images/2.png',
//     description:
//         "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
//     price: 49,
//     countInStock: 7,
//     rating: 2,
//     numReviews: 2,
//   },
//   {
//     _id: '60',
//     name: 'TEST4TESTWomen Red Heels Sandal',
//     image: '/images/1.png',
//     description:
//         "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
//     price: 29,
//     countInStock: 0,
//     rating: 0,
//     numReviews: 0,
//   },
//   {
//     _id: '61',
//     name: 'TEST5Velcro Ballerinas For Girls  (Pink)',
//     image: '/images/6.png',
//     description:
//         "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
//     price: 89,
//     countInStock: 3,
//     rating: 4,
//     numReviews: 4,
//   },
//   {
//     _id: '62',
//     name: 'TEST5Velcro Sneakers For Boys & Girls  (Blue)',
//     image: '/images/5.png',
//     description:
//         "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
//     price: 599,
//     countInStock: 10,
//     rating: 2,
//     numReviews: 2,
//   },
//   {
//     _id: '63',
//     name: 'TEST5Sesame Street Unisex-Child ELMO Puppet Slipper',
//     image: '/images/4.png',
//     description:
//         "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
//     price: 929,
//     countInStock: 0,
//     rating: 3.5,
//     numReviews: 3,
//   },
//   {
//     _id: '64',
//     name: 'TEST5Lace Casual Boots For Boys & Girls  (Tan)',
//     image: '/images/3.png',
//     description:
//         "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
//     price: 399,
//     countInStock: 10,
//     rating: 5,
//     numReviews: 9,
//   },
//   {
//     _id: '65',
//     name: 'TEST5Lace Walking Shoes For Boys & Girls  (Pink)',
//     image: '/images/2.png',
//     description:
//         "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
//     price: 49,
//     countInStock: 7,
//     rating: 2,
//     numReviews: 2,
//   },
//   {
//     _id: '66',
//     name: 'TEST5Women Red Heels Sandal',
//     image: '/images/1.png',
//     description:
//         "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
//     price: 29,
//     countInStock: 0,
//     rating: 0,
//     numReviews: 0,
//   },{
//     _id: '67',
//     name: 'TEST5TESTVelcro Ballerinas For Girls  (Pink)',
//     image: '/images/6.png',
//     description:
//         "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
//     price: 89,
//     countInStock: 3,
//     rating: 4,
//     numReviews: 4,
//   },
//   {
//     _id: '68',
//     name: 'TEST5TESTVelcro Sneakers For Boys & Girls  (Blue)',
//     image: '/images/5.png',
//     description:
//         "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
//     price: 599,
//     countInStock: 10,
//     rating: 2,
//     numReviews: 2,
//   },
//   {
//     _id: '69',
//     name: 'TEST5TESTSesame Street Unisex-Child ELMO Puppet Slipper',
//     image: '/images/4.png',
//     description:
//         "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
//     price: 929,
//     countInStock: 0,
//     rating: 3.5,
//     numReviews: 3,
//   },
//   {
//     _id: '70',
//     name: 'TEST5TESTLace Casual Boots For Boys & Girls  (Tan)',
//     image: '/images/3.png',
//     description:
//         "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
//     price: 399,
//     countInStock: 10,
//     rating: 5,
//     numReviews: 9,
//   },
//   {
//     _id: '71',
//     name: 'TEST5TESTLace Walking Shoes For Boys & Girls  (Pink)',
//     image: '/images/2.png',
//     description:
//         "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
//     price: 49,
//     countInStock: 7,
//     rating: 2,
//     numReviews: 2,
//   },
//   {
//     _id: '72',
//     name: 'TEST5TESTWomen Red Heels Sandal',
//     image: '/images/1.png',
//     description:
//         "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
//     price: 29,
//     countInStock: 0,
//     rating: 0,
//     numReviews: 0,
//   }
// ];

let products = []

export const setProd = (arr) => {
  products = arr
}

export const fetchData = () => {

  console.log("test1")
  axios.get(`http://localhost:5000/api/products/`)
      .then(res => {

        products = res.data
        console.log(products)

      })
      .catch(e => console.log(e))

}

export const getPageData = (pageNumber, elemPerPageCount) => {
  console.log(products)
  return products.slice(pageNumber * elemPerPageCount, (pageNumber + 1) * elemPerPageCount)
}

export const getPagesCount = (elemPerPageCount) => {
  return Math.ceil(products.length / elemPerPageCount)
}

export const getAllItems = () => {
  // console.log(products)
  return products
}


