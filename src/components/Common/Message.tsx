interface MessageProps {
    text: string;
    type: 'error' | 'success';
  }
  
  const Message = ({ text, type }: MessageProps) => {
    const colors = {
      error: 'text-red-500',
      success: 'text-green-500',
    };
  
    return <p className={`${colors[type]} mb-4`}>{text}</p>;
  };
  
  export default Message;
  