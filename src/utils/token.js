export const setToken = (token) => {
  localStorage.setItem("TOKEN", token);
};

export const getToken = () => {
  localStorage.getItem("TOKEN");
};

export const removeToken = () => {
  localStorage.removeItem("TOKEN");
}

export const setName = (name) => {
  localStorage.setItem("NAME", name);
};

export const getName = () => {
  localStorage.getItem("NAME");
};

export const removeName = () => {
  localStorage.removeItem("NAME");
}