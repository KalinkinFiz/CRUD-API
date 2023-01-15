export const isValidUser = (newUser: any): boolean => {
  const requiredFields = ['username', 'age', 'hobbies'].sort();
  const userFields = Object.keys(newUser).sort();

  if (JSON.stringify(requiredFields) !== JSON.stringify(userFields)) {
    return false;
  }

  if (typeof newUser.username !== 'string') return false;

  if (typeof newUser.age !== 'number') return false;

  if (!Array.isArray(newUser.hobbies)) return false;

  const { hobbies } = newUser;

  if (hobbies.length) {
    let isString = true;

    hobbies.forEach((hobbie: unknown) => {
      if (typeof hobbie !== 'string') isString = false;
    });
    if (!isString) return false;
  }

  return true;
};
