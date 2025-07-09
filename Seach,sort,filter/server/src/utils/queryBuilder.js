
const buildQuery = (query) => {
  const { search = "", role = "", sort = "name", order = "asc" } = query;

  const filter = {};
  if (search) {
    filter.name = { $regex: search, $options: "i" }; // case-insensitive name search
  }
  if (role) {
    filter.role = role;
  }

  const sortBy = {};
  if (sort) {
    sortBy[sort] = order === "desc" ? -1 : 1;
  }

  return { filter, sortBy };
};

module.exports = { buildQuery };
