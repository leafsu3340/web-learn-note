export default [
  {
    url: "/api-dev/users",
    method: "get",
    reponse: req => {
      return {
        code: 0,
        data: [{ name: "tom" }]
      }
    }
  }
];