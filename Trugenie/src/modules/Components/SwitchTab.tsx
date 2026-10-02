export interface ButtonTabType {
  id: string;
  value: string;
}
export interface SwitchTabProps {
  ButtonTab: ButtonTabType[];
  width: string;
  setActiveTab: (v: string) => void;
  activeTab: string;
}
const SwitchTab = (props: SwitchTabProps) => {
  const { ButtonTab, width = "260px", setActiveTab, activeTab } = props;
  return (
    <div className='d-flex flex-wrap justify-content-center'>
      {ButtonTab.map((v: ButtonTabType, index: number) => (
        <span
          key={index}
          style={{
            cursor: "pointer",
            width,
            borderRadius: "8px",
          }}
          className={`${activeTab === v.id ? "tab-btn-active-blue tab-change" : "heading-bg-color main-color"} pb-2 pt-2 m-2 text-center font-bold`}
          onClick={() => setActiveTab(v.id)}>
          {v.value}
        </span>
      ))}
    </div>
  );
};

export default SwitchTab;
