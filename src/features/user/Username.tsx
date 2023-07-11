import { useAppSelector } from "../../store";

export const Username = () => {
  const { username } = useAppSelector((state) => state.user);

  if (!username) return null;
  return <p className="hidden text-sm font-semibold md:block">{username}</p>;
};
