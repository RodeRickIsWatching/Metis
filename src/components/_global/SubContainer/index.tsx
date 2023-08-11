import './index.scss';

const SubContainer = ({ className = '', children }: { className?: any; children?: any }) => {
  return <div className={`sub-container flex-1 flex ${className}`}>{children}</div>;
};

export default SubContainer;
