import Head from "next/head"
import { supabase } from "../utils/db"

const Posts = ({ post }: any) => {
  const deletePost = async (id: number) => {
    const userId = supabase.auth.user()?.id
    if (userId !== post.userId) {
      return alert("sorry you are not allowed to delete this post")
    }
    await supabase.from("posts").delete().eq("id", id)
  }

  return (
    <div className="text-white">
      <Head>
        <title>posts</title>
        <link rel="icon" href="/supabase-logo.png" />
      </Head>
      <div className="flex flex-col justify-evenly items-center space-y-5  p-5 border-2 border-white hover:border-blue-600 rounded cursor-pointer mt-4 mb-4 ">
        <p>{post.post}</p>
        <div className="flex items-center justify-center space-x-3">
          <p className="font-bold text-sm text-sky-600">~{post.username}</p>
          <button
            onClick={() => deletePost(post.id)}
            className="font-semibold text-sky-600 scale-100 hover:scale-110"
          >
            ❌
          </button>
        </div>
      </div>
    </div>
  )
}

export default Posts
