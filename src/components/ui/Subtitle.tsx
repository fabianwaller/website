type SubtitleProps = {
  children: React.ReactNode;
};

const Subtitle: React.FC<SubtitleProps> = (props) => {
  return (
    <span className="block text-sm font-medium uppercase text-text-light">
      {props.children}
    </span>
  );
};

export default Subtitle;
