const BasicJustifyBetweenCard = ({ data }: { data: any }) => {
  return data.map((i: any) => (
    <div key={i.label} className="flex flex-row items-center justify-between">
      <span className="f-16 sub-color">{i.label}</span>
      <span className="f-16 main-color-0-85">{i.value}</span>
    </div>
  ));
};
export default BasicJustifyBetweenCard;
