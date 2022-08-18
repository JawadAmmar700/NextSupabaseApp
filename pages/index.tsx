import Head from "next/head"
import Posts from "../components/posts"
import { supabase } from "../utils/db"
import { GetStaticProps } from "next"
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react"
import { useEffect, useRef, useState } from "react"
import { User } from "@supabase/supabase-js"

type renderList = {
  post: string
  id: string
  username: string
}

export const getStaticProps: GetStaticProps = async ctx => {
  const { data: posts, error } = await supabase.from("posts").select("*")

  console.log(ctx)

  if (error) {
    throw new Error(error.message)
  }

  return {
    props: { posts },
    revalidate: 10,
  }
}

const Home = ({ posts }: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const inputRef = useRef<HTMLInputElement>(null)
  const [payload, setPayload] = useState<any>(posts)

  useEffect(() => {
    supabase
      .from("posts")
      .on("*", async payload => {
        const { data: posts, error } = await supabase.from("posts").select("*")
        setPayload(posts)
      })
      .subscribe()
  }, [])

  const upload = async () => {
    const user: User | null = supabase.auth.user()

    let { data, status } = await supabase
      .from("profiles")
      .select(`username, website`)
      .eq("id", user?.id)
      .single()

    if (!data?.username) {
      return alert("Please create a username by heading to profile page")
    }

    const { error } = await supabase.from("posts").insert({
      post: inputRef.current?.value,
      username: data?.username,
      userId: user?.id,
    })
    if (error) {
      throw new Error(error.message)
    }
    onClose()
  }

  return (
    <div className="flex justify-center items-center flex-col space-y-5 ">
      <Head>
        <title>Supabase+Nextjs</title>
        <link rel="icon" href="/supabase-logo.png" />
      </Head>
      <div className="flex items-center justify-between w-full px-4">
        <h1 className="text-4xl text-white">Supabase-Posts</h1>

        <Button colorScheme="green" mr={3} onClick={onOpen}>
          new post
        </Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add new post</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Input placeholder="post content" ref={inputRef} />
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant="ghost" onClick={upload}>
                upload
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>

      <div className="flex flex-wrap space-x-2 justify-center items-center w-4/5 overflow-y-scroll h-[300px]">
        {payload?.map((post: renderList) => (
          <Posts key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}

export default Home
