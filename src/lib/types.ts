export type User = { id: string; name: string; email: string; image?: string | null };
export type Review = { name: string; text: string; rating: number };
export type Studio = { _id: string; title: string; category: string; hourlyRate: number; deposit: number; capacity: number; location: string; images: string[]; amenities: string[]; overview: string; ownerEmail: string; ownerName: string; ownerImage?: string; rating: number; reviews: Review[]; availability?: { start: string; end: string }[] };
export type Booking = { _id: string; studioId: string; studioTitle: string; image: string; location: string; start: string; end: string; guests: number; status: 'Pending'|'Confirmed'|'Completed'|'Cancelled'; total: number; deposit: number; userName: string; userEmail: string; note: string };
export const categories = ['Photo Studio', 'Film Stage', 'Podcast Lounge', 'Music Suite', 'Workshop'];
export const money = (n:number) => new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',minimumFractionDigits:0,maximumFractionDigits:2}).format(n);

