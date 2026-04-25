import style from "./style.module.scss";

interface SkillItem {
  key: number;
  label: string;
}

interface SkillsCardProps {
  items: SkillItem[];
  label: string;
}

const SkillsCard = ({ items, label }: SkillsCardProps) => {
  return (
    <div className={style.container}>
      <h2>{label}</h2>
      <div className={style.content}>
        {items.map(({ key, label }) => {
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
