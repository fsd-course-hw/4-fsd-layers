import { ROUTER_PATHS } from "@/shared/constants/routes";
import clsx from "clsx";
import { NavLink } from "react-router-dom";

export function NavLinks() {
  const linkClassName = ({ isActive }: { isActive?: boolean }) =>
    clsx(isActive && "underline");
  return (
    <div className="text-lg flex gap-5">
      <NavLink to={ROUTER_PATHS.USERS} className={linkClassName}>
        Пользователи
      </NavLink>
      <NavLink to={ROUTER_PATHS.BOARDS} className={linkClassName}>
        Доски
      </NavLink>
      <NavLink to={ROUTER_PATHS.TASKS} className={linkClassName}>
        Мои задачи
      </NavLink>
    </div>
  );
}
