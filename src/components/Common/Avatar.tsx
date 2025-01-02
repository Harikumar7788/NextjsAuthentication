interface AvatarProps {
    src: string;
    alt?: string;
    size?: 'small' | 'medium' | 'large';
  }
  
  const Avatar = ({ src, alt = 'User Avatar', size = 'medium' }: AvatarProps) => {
    const sizes = {
      small: 'w-8 h-8',
      medium: 'w-10 h-10',
      large: 'w-16 h-16',
    };
  
    return (
      <img
        src={src}
        alt={alt}
        className={`${sizes[size]} rounded-full`}
      />
    );
  };
  
  export default Avatar;
  