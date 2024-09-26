module.exports = {
  users: [
    {
      user_id: "1",
      username: "johndoe",
      password: "password1",
      first_name: "John",
      middle_name: "Some",
      last_name: "Doe",
    },
    {
      user_id: "2",
      username: "janedoe",
      password: "password2",
      first_name: "Jane",
      middle_name: "Any",
      last_name: "Doe",
    },
    {
      user_id: "3",
      username: "mikejohnson",
      password: "password3",
      first_name: "Mike",
      middle_name: "Middle",
      last_name: "Johnson",
    },
  ],
  roles: [
    {
      role_id: "1",
      role_name: "student",
      role_description: "something about student",
    },
    {
      role_id: "2",
      role_name: "teacher",
      role_description: "something about teacher",
    },
    {
      role_id: "3",
      role_name: "admin",
      role_description: "something about admin",
    },
  ],
  user_roles: [
    {
      user_id: "1",
      role_id: "1",
    },
    {
      user_id: "2",
      role_id: "2",
    },
    {
      user_id: "3",
      role_id: "3",
    },
  ],
};
