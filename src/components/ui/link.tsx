import { cn } from '@/lib/utils';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';


export type LinkProps = {
  className?: string;
  children: React.ReactNode;
  target?: string;
} & NextLinkProps;

export const Link = ({ className, children, href, ...props }: LinkProps) => {
  return (
    <NextLink
      href={href}
      className={cn('text-slate-600 hover:text-slate-900', className)}
      {...props}
    >
      {children}
    </NextLink>
  );
};