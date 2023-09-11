const WEBSITE_SETTINGS = {
  WEBSITE_NAME: "CoatesCarpentry",
  WEBSITE_ID: 0,
  UNSET_WEBSITE_ID: 99,
  BACKEND_SERVICES_BASE_PATH: "https://localhost:44311/",
  BACKEND_SERVICES_JS_PATH: "assets/js/websites/services/modules/",
};

function postLoadScript(file, isModule) {
  const scriptElement = document.createElement("script");
  scriptElement.src = `${WEBSITE_SETTINGS.BACKEND_SERVICES_BASE_PATH}${WEBSITE_SETTINGS.BACKEND_SERVICES_JS_PATH}${file}`;
  if (isModule) {
    scriptElement.type = "module";
  }
  document.body.appendChild(scriptElement);
}
