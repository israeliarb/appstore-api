import Route from "@ioc:Adonis/Core/Route";

// Login para os tipos de user

Route.post("/login", "AuthController.login");
Route.post("logout", "AuthController.logout");

Route.post("/client/register", "ClientsController.store");

Route.get("/cities", "CitiesController.index");
Route.get("/cities/:id/institutes", "CitiesController.Institutes");

Route.group(() => {
  Route.get("auth/me", "AuthController.me");

  Route.resource("/addresses", "AddressesController").only([
    "store",
    "index",
    "update",
    "destroy",
  ]);

  Route.put("/client/update", "ClientsController.update");
}).middleware("auth");

Route.get("/", async () => {
  return {
    appstore: "api",
  };
});
