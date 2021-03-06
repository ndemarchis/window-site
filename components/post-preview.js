import Avatar from '../components/avatar'
import Date from '../components/date'
import CoverImage from './cover-image'
import Link from 'next/link'
import {imageBuilder} from '../lib/sanity'
import { Rnd } from 'react-rnd'
import { useState } from 'react'

const PostPreview = ({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}) => {

  const [posState, setPosState] = useState({
    x: 0,
    y: 0,
    width: 300,
    height: 300,
  })
  const [disp, setDisp] = useState(true)
  const [op, setOp] = useState(1)

  const close = () => {
    setDisp(false)
  }

  return (
    <Rnd
      className={`shadow-small border-8 border-black p-2 overflow-clip ${!disp && 'hidden !important'} transition-opacity`}
      size={{ width: posState.width,  height: posState.height }}
      position={{ x: posState.x, y: posState.y }}
      onDragStop={(e, d) => { setPosState({ x: d.x, y: d.y }) }}
      onResize={(e, direction, ref, delta, position) => {
        setPosState({
          width: ref.offsetWidth,
          height: ref.offsetHeight,
          ...position,
        });
      }}
    >
      <div 
        className='absolute p-10 w-10 h-10 -top-10 -right-10 text-center bg-black rounded-full cursor-pointer'
        onClick={() => { setDisp(false) }}
      >
        <div className='absolute top-1/2 left-1/4 text-white text-xl overflow-visible font-black'>
          &times;
        </div>
      </div>
      <div className="mb-5">
        <CoverImage slug={slug} title={title} imageObject={coverImage} url={imageBuilder(coverImage).url()} />
      </div>
      <h3 className="text-3xl mb-3 leading-snug">
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          <a className="hover:underline">{title}</a>
        </Link>
      </h3>
      <div className="text-lg mb-4">
        <Date dateString={date} />
      </div>
      <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
      <Avatar name={author?.name} picture={author?.picture} />
    </Rnd>
  )
}

export default PostPreview