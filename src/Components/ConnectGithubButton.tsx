import { LinkIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import React, { useContext } from 'react';
import UserContext from './contexts/authContext';

function ConnectGithubButton({ className }: { className?: string }) {
  const user = useContext(UserContext);

  if (user.isAuthenticated) {
    return null;
  }

  return (
    <Link
      href={`/login`}
      className={`ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 ${className}`}
    >
      Connect <LinkIcon className="ml-2 size-5 text-white" aria-hidden="true" />
    </Link>
  );
}

export default ConnectGithubButton;
