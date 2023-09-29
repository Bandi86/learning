import Post from '@/components/Post';
import prisma from '@/lib/prisma';
import Link from 'next/link';

async function getPosts() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    include: { author: { select: { name: true } } },
  });
  return posts;
}

export default async function Home() {
  const posts = await getPosts();
  

  return (
    <>
    <Link href={"/add-post"}>Add Post</Link>
      {posts.map((post) => {
        return (
          <Post
            key={post.id}
            id={post.id}
            title={post.title}
            content={post.content}
            authorName={
              post.author ? Object.values(post.author).join(', ') : ''
            }
          />
        );
      })}
    </>
  );
}
