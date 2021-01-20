let authAcademyHeader = function() {
  let header = {
    apikey:JSON.parse(localStorage.getItem("academy_token")),
    "Content-Type": "application/json",
  };
  return header;
};
export { authAcademyHeader };
