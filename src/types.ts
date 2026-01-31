export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  category: 'to-be-parents' | 'new-parents' | 'toddler-parents';
  date: string;
  readTime: string;
  content?: string;
}

export interface AmazonProduct {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: string;
  affiliateLink: string;
  category: 'to-be-parents' | 'new-parents' | 'toddler-parents';
  rating: number;
}

export interface Category {
  id: 'to-be-parents' | 'new-parents' | 'toddler-parents';
  name: string;
  description: string;
  icon: string;
  color: string;
  imageUrl: string;
}
