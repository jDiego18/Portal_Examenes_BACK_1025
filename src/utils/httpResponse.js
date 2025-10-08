export const ok = (res, data) => {
  res.status(200).json({
    status: 200,
    data
  });
};

export const created = (res, data) => {
  res.status(201).json({
    status: 201,
    data
  });
};

export const noContent = (res) => {
  res.status(204).send();
};

export const badRequest = (res, message) => {
  res.status(400).json({
    status: 400,
    message
  });
};

export const notFound = (res, message) => {
  res.status(404).json({
    status: 404,
    message
  });
};