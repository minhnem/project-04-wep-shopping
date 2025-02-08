import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <Link href={'/auth/signup'}>signup</Link>
    </div>
  )
}
