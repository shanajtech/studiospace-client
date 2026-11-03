import { Suspense } from 'react';import { Explore } from '@/components/explore';import { Skeletons } from '@/components/ui';
export const metadata={title:'Explore studios'};
export default function Page(){return <Suspense fallback={<div className="page-shell section"><Skeletons/></div>}><Explore/></Suspense>;}
