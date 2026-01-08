import Image from 'next/image';
import logo from './logo.png';

type LogoProps = {
  className?: string;
  alt?: string;
  width?: number;
  height?: number;
  priority?: boolean;
};

export function Logo({
  className,
  alt = 'BillBully logo',
  width = 32,
  height = 32,
  priority = false,
}: LogoProps) {
  return (
    <Image
      src={logo}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
    />
  );
}
