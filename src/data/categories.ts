import type { Category } from '../types';

export const categories: Category[] = [
  {
    id: 'to-be-parents',
    name: 'Expecting Parents',
    description: 'Preparation, prenatal care, and getting ready for your new arrival',
    icon: 'heart-pulse',
    color: '#FF6B9D',
    imageUrl: '/expecting-parents.png'
  },
  {
    id: 'new-parents',
    name: 'New Parents',
    description: 'Essential guidance for the first year of your baby\'s life',
    icon: 'baby',
    color: '#4ECDC4',
    imageUrl: '/new-parents.png'
  },
  {
    id: 'toddler-parents',
    name: 'Toddlers',
    description: 'Development, activities, and parenting toddlers aged 1-3',
    icon: 'smile',
    color: '#FFB03B',
    imageUrl: '/toddler-stage.png'
  }
];
