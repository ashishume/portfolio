import style from "./style.module.scss";

const Spinner = () => {
  return (
    <div className={style.loaderContainer}>
      <div className={style.loader}></div>
    </div>
  );
};

export default Spinner;
