import { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return <main className="min-w-full min-h-screen flex items-center justify-center px-10 py-10">{children}</main>;
}
