import '../styles/Skeleton.css';

const Skeleton = ({ width, height }: { width: string; height: string }) => {
  return <div className="skeleton" style={{ width, height }} />;
};

export default Skeleton;