import type { FavoritesSection } from '@/types/sections/favorites-section.types';
import type { ReadonlyDeep } from 'type-fest';

const favoritesSectionData = {
  config: {
    title: 'My favorites',
    slug: 'favorites',
    icon: 'fa6-solid:star',
    visible: true,
  },
  books: {
    title: 'Books I read',
    data: [
      {
        image: import('@/assets/favorites/books/book-1.jpeg'),
        title: 'The Pragmatic Programmer: From Journeyman to Master',
        author: 'Andy Hunt, Dave Thomas',
        url: 'https://www.goodreads.com/book/show/4099.The_Pragmatic_Programmer',
      },
      {
        image: import('@/assets/favorites/books/book-2.jpg'),
        title: 'Domain-Driven Design: Tackling Complexity in the Heart of Software',
        author: 'Eric Evans',
        url: 'https://www.goodreads.com/book/show/179133.Domain_Driven_Design',
      },
      {
        image: import('@/assets/favorites/books/book-3.jpeg'),
        title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
        author: 'Robert C. Martin',
        url: 'https://www.goodreads.com/book/show/3735293-clean-code',
      },
      {
        image: import('@/assets/favorites/books/book-4.jpeg'),
        title: 'The Clean Coder: A Code of Conduct for Professional Programmers',
        author: 'Robert C. Martin',
        url: 'https://www.goodreads.com/book/show/10284614-the-clean-coder',
      },
      {
        image: import('@/assets/head-first-java.jpg'),
        title: 'Head First Java',
        author: 'Kathy Sierra, Bert Bates',
        url: 'https://www.goodreads.com/book/show/231262.Head_First_Java',
      },
      {
        image: import('@/assets/head-first-javascript.jpg'),
        title: 'Head First Java',
        author: "O'Reilly Media",
        url: 'https://www.goodreads.com/book/show/6307394-head-first-javascript-code-magnets',
      },
      {
        image: import('@/assets/head-first-python.jpg'),
        title: 'Head First Python',
        author: 'Paul Barry',
        url: 'https://www.goodreads.com/book/show/8933914-head-first-python',
      },
      {
        image: import('@/assets/head-first-jsp.jpg'),
        title: 'Head First Servlets & JSP',
        author: 'Bryan Basham , Kathy Sierra , Bert Bates',
        url: 'https://www.goodreads.com/book/show/9052992-head-first-servlets-and-jsp',
      },
    ],
  },
  people: {
    title: 'People I learn from',
    data: [
      {
        image: import('@/assets/Maximilian Schwarzmüller.webp'),
        name: 'Maximilian Schwarzmüller',
        url: 'https://academind.com//',
      },
      {
        image: import('@/assets/james spurin.jpg'),
        name: 'James Spurin',
        url: 'https://diveinto.com/p/home',
      },
      {
        image: import('@/assets/tom philips.webp'),
        name: 'Eric Evans',
        url: 'https://webdeveducation.com/',
      },
      {
        image: import('@/assets/favorites/people/person-4.jpeg'),
        name: 'Martin Fowler',
        url: 'https://martinfowler.com/',
      },
      {
        image: import('@/assets/favorites/people/person-5.jpg'),
        name: 'Robert C. Martin',
        url: 'http://cleancoder.com/',
      },
      {
        image: import('@/assets/favorites/people/person-6.jpeg'),
        name: 'Adam Dymitruk',
        url: 'https://eventmodeling.org/',
      },
    ],
  },
  videos: {
    title: 'Videos I watched',
    data: [
      {
        image: import('@/assets/favorites/videos/video-1.jpeg'),
        title: 'Building Resilient Frontend Architecture • Monica Lent • GOTO 2019',
        url: 'https://youtu.be/TqfbAXCCVwE',
      },
      {
        image: import('@/assets/favorites/videos/video-2.jpeg'),
        title: 'Scaling Yourself • Scott Hanselman • GOTO 2012',
        url: 'https://youtu.be/FS1mnISoG7U',
      },
      {
        image: import('@/assets/favorites/videos/video-3.jpeg'),
        title: "Why Isn't Functional Programming the Norm? - Richard Feldman",
        url: 'https://youtu.be/QyJZzq0v7Z4',
      },
    ],
  },
  medias: {
    title: 'Media I follow',
    data: [
      {
        image: import('@/assets/freeCodeCamp.org.jpg'),
        title: 'freeCodeCamp.org',
        type: 'YouTube channel',
        url: 'https://www.youtube.com/@freecodecamp',
      },
      {
        image: import('@/assets/maximilian-schwarzmueller.jpg'),
        title: 'maximilian-schwarzmueller',
        type: 'YouTube channel',
        url: 'https://www.youtube.com/@maximilian-schwarzmueller',
      },
      {
        image: import('@/assets/favorites/media/media-1.jpeg'),
        title: 'Fireship.io',
        type: 'YouTube channel',
        url: 'https://www.youtube.com/c/Fireship',
      },
      {
        image: import('@/assets/favorites/media/media-2.jpeg'),
        title: 'Healthy Software Developer',
        type: 'YouTube channel',
        url: 'https://www.youtube.com/channel/UCfe_znKY1ukrqlGActlFmaQ',
      },
      {
        image: import('@/assets/favorites/media/media-3.png'),
        title: 'Bytes',
        type: 'Newsletter',
        url: 'https://bytes.dev/',
      },
      {
        image: import('@/assets/favorites/media/media-4.png'),
        title: 'TypeScript Weekly',
        type: 'Newsletter',
        url: 'https://typescript-weekly.com/',
      },
      {
        image: import('@/assets/favorites/media/media-5.jpeg'),
        title: 'Front End Happy Hour',
        type: 'Podcast',
        url: 'https://www.frontendhappyhour.com/',
      },
      {
        image: import('@/assets/favorites/media/media-6.webp'),
        title: '.cult by Honeypot',
        type: 'Blog',
        url: 'https://cult.honeypot.io/',
      },
    ],
  },
} as const satisfies ReadonlyDeep<FavoritesSection>;

export default favoritesSectionData;
