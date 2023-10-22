export function success(data, message) {
  return {
    code: 0,
    result: data,
    message,
  };
}
export function successPage(data, count, message) {
  return {
    code: 0,
    result: { data, total: count },
    message,
  };
}

export function error(message) {
  return {
    code: -1,
    message,
  };
}
export function wrapperResponse(p, msg) {
  return p
    .then((data) => success(data, msg))
    .catch((err) => error(err.message));
}
export function wrapperCountResponse(dataPromise, countPromise, msg) {
  return Promise.all([dataPromise, countPromise])
    .then((res) => {
      const [data, count] = res;
      return successPage(data, count, msg);
    })
    .catch((err) => error(err.message));
}
