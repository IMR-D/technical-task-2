export function sortByProperty(array, property) {
  return array.slice().sort((a, b) => {
    const valueA =
      typeof a[property] === "string" ? a[property].toLowerCase() : a[property];
    const valueB =
      typeof b[property] === "string" ? b[property].toLowerCase() : b[property];

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
  return array.slice().sort((a, b) => {
    if (
      !Object.prototype.hasOwnProperty.call(a, "points") ||
      !Object.prototype.hasOwnProperty.call(b, "points")
    ) {
      return 0;
    }
    if (
      !Object.prototype.hasOwnProperty.call(a, "last_name") ||
      !Object.prototype.hasOwnProperty.call(b, "last_name")
    ) {
      return 0;
    }

    if (a.points !== b.points) {
      return b.points - a.points;
    }

    const lastNameA = a.last_name.toLowerCase();
    const lastNameB = b.last_name.toLowerCase();

    if (lastNameA < lastNameB) {
      return -1;
    }
    if (lastNameA > lastNameB) {
      return 1;
    }

    return 0;
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
