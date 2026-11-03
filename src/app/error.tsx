'use client';
export default function ErrorPage({reset}:{reset:()=>void}){return <section className="empty-state page-shell"><h1>Let’s give that another take.</h1><p>We couldn’t load this page. Please try again.</p><button className="button" onClick={reset}>Try again</button></section>;}
