import { Post, allPosts } from "@/.contentlayer/generated";
import { getCategoryInfo } from "@/helpers/category";
import { fillKeywords } from "@/helpers/keywords";
import { Metadata } from "next";
import Link from "next/link";

const categoryGroupedPosts = allPosts
  .reduce<
    {
      category: string;
      posts: Post[];
    }[]
  >((acc, item) => {
    const existingItem = acc.find((entry) => entry.category === item.category);

    if (existingItem) {
      existingItem.posts.push(item);
    } else {
      acc.push({ category: item.category, posts: [item] });
    }

    return acc;
  }, [])
  .sort((a, b) => b.posts.length - a.posts.length);

export const metadata: Metadata = {
  title: "主观世界档案馆",
  description: "独立博客「主观世界」的档案馆",
  authors: {
    name: "Nooc",
    url: "https://nooc.ink",
  },
  openGraph: {
    title: "档案馆 - 主观世界",
    description: "「主观世界」的档案馆",
    images: "/opengraph-image.png",
  },
  twitter: {
    title: "档案馆 - 主观世界",
    description: "「主观世界」的档案馆",
    site: "@noobnooc",
    card: "summary_large_image",
    images: "/twitter-image.png",
  },
  keywords: fillKeywords(["档案", "归档", "档案馆", "分类"]),
};

export default function Home() {
  return (
    <div className="prose dark:prose-invert py-6">
      <article>
        <h1 className="mb-2">档案馆</h1>
        <p className="text-md m-0">主观世界的档案馆</p>
        <hr className="my-6" />
        <h3 className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 inline mr-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z"
            />
          </svg>
          分类
        </h3>
        <ul>
          {categoryGroupedPosts.map(({ category, posts }) => (
            <li key={category}>
              <Link href={`/category/${category}`}>
                {getCategoryInfo(category).displayName}
              </Link>
              ：{posts.length} 篇
            </li>
          ))}
        </ul>
        <h3 className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 mr-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z"
            />
          </svg>
          统计
        </h3>
        <p>
          共计 {allPosts.length} 篇文章，
          {allPosts.reduce(
            (total, current) => total + countWords(current.body.raw),
            0
          )}
          &nbsp;字。
        </p>
        <h3 id="recent-books" className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 mr-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
            />
          </svg>
          最近看的书
        </h3>
        <p>这里会记录一些我最近看过，并且觉得还不错的书籍。</p>
        <ul>
          <li>
            《夜晚的潜水艇》•
            如果你也喜欢博尔赫斯，那么这本短篇小说集一定不容错过。如果你不喜欢博尔赫斯，那么看完这本小说集你会喜欢上他的。
          </li>
          <li>
            《Make Something Wonderful》•
            这本书集合了很多乔布斯生前的公开照片、电子邮件和演讲等信息。
          </li>
        </ul>
        <h3 id="recent-films" className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 mr-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0118 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0118 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 016 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h1.5m14.25 0h1.5"
            />
          </svg>
          最近看的剧
        </h3>
        <p>这里会记录一些我最近看过，并且觉得还不错的电影和电视剧。</p>
        <ul>
          <li>《漫长的季节》• 近几年看过最喜欢的国产剧。</li>
          <li>《深海》• 童心未泯的我，真的是喜欢这种花花绿绿的画风。</li>
        </ul>
        <h3 id="music" className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 mr-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z"
            />
          </svg>
          喜欢的音乐
        </h3>
        <ul>
          <li>
            John Lennon •
            最喜欢他的《Imagine》，希望有一天这个世界真能像他描述的那样。
          </li>
          <li>万能青年旅店 / 好乐团 • 不知道怎么形容。</li>
          <li>
            Humbert Humbert / KOKIA / Rimi Natsukawa •
            来自日本的选手，从高中听到了现在。甚至还买过他们的实体唱片。
          </li>
          <li>
            DEPAPEPE / 久石让 / 姬神 •
            都是来自日本的纯乐器音乐选手，都非常喜欢。
          </li>
          <li>茄子蛋 / 美秀集团 / 草东没有派对 • 他们说他们是摇滚。</li>
          <li>
            Sufjan Stevens / Fleurie / Billie Eilish / Sophie Zelmani •
            英文歌手不太能记住名字，这是一些印象比较深的。
          </li>
          <li>
            莫文蔚 / 陈绮贞 / 王若琳 •
            其实我是不太喜欢情歌的，但她们的声音是真的好听。
          </li>
          <li>中岛美雪 / 邓丽君 / 伍佰 • 老歌偶尔听听也很是喜欢。</li>
        </ul>
        <h3 className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 mr-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
            />
          </svg>
          推荐
        </h3>
        <p>
          如果你想看看其他和本站类似的独立博客，这里推荐一些我偶尔会看，并且觉得还不错的：
        </p>
        <ul>
          <li>
            <a href="https://firewood.news">积薪</a> •
            这不是一个独立博客，而是一个独立博客收集网站。我很喜欢它的页面设计，在上面也能发现非常多优质的博客。
          </li>
          <li>
            <a href="https://rercel.com">Rercel</a> • 不知道这个名字是不是在碰瓷
            Vercel，好在他的内容是不错的啦。作者主要写一些法律和哲学相关的话题，偶尔也涉及计算机技术。
          </li>
        </ul>
      </article>
    </div>
  );
}

function countWords(text: string) {
  // 使用正则表达式匹配英文单词和 CJK 文字
  const wordRegex =
    /[a-zA-Z]+|\p{Script=Han}|\p{Script=Katakana}|\p{Script=Hiragana}|\p{Script=Hangul}/gu;
  const matches = text.match(wordRegex);

  // 统计匹配到的单词数量
  const wordCount = matches ? matches.length : 0;

  return wordCount;
}
