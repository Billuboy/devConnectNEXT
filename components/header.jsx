import React from 'react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

export default function Header() {
  const { status } = useSession();

  const UnAuthOptions = () => <Link href="/auth">Coninue to DevChat</Link>;

  const AuthOptions = () => (
    <>
      <button
        onClick={async (e) => {
          e.preventDefault();
          await signOut();
        }}
      >
        Logout
      </button>
    </>
  );

  const renderHeader = () => (
    <div>
      <Link href="/">
        <div>
          Dev<span>Chat</span>
        </div>
      </Link>
      {status === 'loading' ? (
        'Loading...'
      ) : status === 'authenticated' ? (
        <AuthOptions />
      ) : (
        <UnAuthOptions />
      )}
    </div>
  );

  return renderHeader();
}
