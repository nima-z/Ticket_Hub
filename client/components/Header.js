import Link from "next/link";
//=======================================================

export default function Header({ currentUser }) {
  return (
    <header>
      <nav className="navbar navbar-light bg-light">
        <Link href="/">Home</Link>
        <div className="d-flex justify-content-end">
          {currentUser ? (
            <Link href="/auth/signout">Sign out</Link>
          ) : (
            <Link href="/auth">Sign in</Link>
          )}
        </div>
      </nav>
    </header>
  );
}
