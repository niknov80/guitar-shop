import { JSX } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../constants/const.ts';

type LogoProps = {
  position?: string;
  width?: number;
  height?: number;
  src?: string;
  alt?: string;
};

function Logo({ position, width, height, src, alt }: LogoProps): JSX.Element {
  return (
    <Link className={`${position}__logo logo`} to={AppRoute.Index}>
      <img
        className="logo__img"
        width={width}
        height={height}
        src={src}
        alt={alt}
      />
    </Link>
  );
}

export default Logo;
