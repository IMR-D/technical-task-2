export function getfullName(user) {
  const { first_name = "", last_name = "" } = user;
  return `${first_name} ${last_name}`;
}
