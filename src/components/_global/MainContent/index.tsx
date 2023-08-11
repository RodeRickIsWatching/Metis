import './index.scss';

const MainContent = ({ title, children }: { title: string; children: any }) => {
  return (
    <div className="flex flex-col">
      <div className="main-content-title">{title}</div>
      <div className="main-content">{children}</div>
    </div>
  );
};

export default MainContent;
