const getParams = query => {
  if (!query) {
    return {};
  }

  return (/^[?#]/.test(query) ? query.slice(1) : query)
    .split('&')
    .reduce((params, param) => {
      let [key, value] = param.split('=');
      params[key] = value ? decodeURIComponent(value.replace(/\+/g, ' ')) : '';
      return params;
    }, {});
};

export const getToken = (): string => {
  let token: string = localStorage.getItem('token');
  if (token) {
    return token;
  }

  token = getParams(document.location.search).access_token;
  if (token) {
    localStorage.setItem('token', token);

    // Refresh so that it looses the token
    window.location.href = window.location.origin;
  }

  return token;
}
