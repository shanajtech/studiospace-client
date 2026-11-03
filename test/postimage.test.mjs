import test from 'node:test';
import assert from 'node:assert/strict';
import { parsePostImageResult } from '../src/lib/postimage.ts';

test('extracts and deduplicates uploaded PostImage hotlinks from encoded BBCode',()=>{
  const image='https://i.postimg.cc/abcd1234/studio.jpg';
  const other='https://i.postimg.cc/efgh5678/second.png';
  assert.deepEqual(parsePostImageResult(encodeURIComponent(`[url=https://postimages.org/][img]${image}[/img][/url]\n[img]${image}[/img]\n[img]${other}[/img]`)),[image,other]);
});
test('rejects arbitrary hosts, executable markup and credential-bearing URLs',()=>{
  assert.deepEqual(parsePostImageResult(encodeURIComponent('[img]https://evil.example/photo.jpg[/img]<script>alert(1)</script>[img]https://i.postimg.cc@evil.example/photo.jpg[/img]')),[]);
});
test('rejects malformed encoding and oversized responses',()=>{
  assert.throws(()=>parsePostImageResult('%broken'));
  assert.throws(()=>parsePostImageResult('x'.repeat(100001)));
});

