import { StudioForm } from '@/components/studio-form';export default async function Page({params}:{params:Promise<{id:string}>}){const{id}=await params;return <StudioForm id={id}/>;}
