import Link from "next/link"

const Layout = ({ children }: any) => {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen py-2 bg-black">
      <div className="flex items-center justify-between w-4/5">
        <h1 className="text-2xl font-bold text-blue-500">
          <Link href="/">Next.js+Supabase</Link>
        </h1>
        <p className="text-sky-500 text-sm scale-100 hover:scale-110">
          <Link href="/profile">view profile</Link>
        </p>
      </div>

      <div>{children}</div>

      <footer className="flex items-center justify-center w-full h-24 text-white">
        <a
          className="flex items-center justify-center"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by
          <img src="/supabase.png" alt="Supabase Logo" className="h-4 ml-2" />
        </a>
      </footer>
    </div>
  )
}

export default Layout
