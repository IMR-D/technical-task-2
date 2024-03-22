export function sortByProperty(array, property) {
  return array.toSorted((a, b) => {
    if (!a[property] || !b[property]) return 0;

    const valueA = String(a[property]).toLowerCase();
    const valueB = String(b[property]).toLowerCase();

    if (valueA < valueB) {
      return -1;
    }
    if (valueA > valueB) {
      return 1;
    }

    return 0;
  });
}
export function sortByPointsAndLastName(array) {
  return array.toSorted((a, b) => {
    const hasPoints = "points" in a && "points" in b;
    const hasLastName = "last_name" in a && "last_name" in b;

    if (!hasPoints || !hasLastName) {
      return 0;
    }

    if (a.points !== b.points) {
      return b.points - a.points;
    }

    const lastNameA = String(a.last_name).toLowerCase();
    const lastNameB = String(b.last_name).toLowerCase();

    return lastNameA.localeCompare(lastNameB);
  });
}

export function filterData(array, filter) {
  if (!filter.trim()) {
    return array;
  }
  const regex = new RegExp(filter.trim(), "i");
  return array.filter((client) => {
    return regex.test(client.last_name) || regex.test(client.first_name);
  });
}
