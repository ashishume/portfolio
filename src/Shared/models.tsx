export interface INavbar {
  label: string;
  route: string;
  active?: boolean;
}
export interface ISocialIcons {
  label: string;
  SvgElement: JSX.Element;
  uri: string;
}

export interface IProjectCard {
  title: string;
  key: number;
  description: string;
  uri: string;
  image: string;
  techStack: string;
}

export interface ISkill {
  key: number;
  label: string;
}

export interface ISkills {
  Databases: ISkill[];
  FrontendTech: ISkill[];
  StateManagement: ISkill[];
  Tools: ISkill[];
  Languages: ISkill[];
}
