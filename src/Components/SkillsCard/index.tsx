import style from "./style.module.scss";
const SkillsCard = ({ items, label }: any): any => {
  return (
    <div className={style.container}>
      <h2>{label}</h2>
      <div className={style.content}>
        {items.map(({ key, label }: any) => {
          return (
            <div className={style.item} key={key}>
              {label}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SkillsCard;
