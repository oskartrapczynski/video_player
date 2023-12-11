const isValidated = (obj: Object) => {
  try {
    Object.values(obj).forEach((item) => {
      if (item.error) throw new Error();
    });
    return true;
  } catch {
    return false;
  }
};

export default isValidated;
