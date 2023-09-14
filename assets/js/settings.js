const WEBSITE_SETTINGS = {
  WEBSITE_NAME: "CoatesCarpentry",
  WEBSITE_ID: 0,
  UNSET_WEBSITE_ID: 99,
  BACKEND_SERVICES_BASE_PATH: "https://localhost:44311/",
  BACKEND_SERVICES_JS_PATH: "assets/js/websites/services/modules/",
};

function postLoadScript(file, isModule, appendToHead) {
  const scriptElement = document.createElement("script");
  scriptElement.src = `${WEBSITE_SETTINGS.BACKEND_SERVICES_BASE_PATH}${WEBSITE_SETTINGS.BACKEND_SERVICES_JS_PATH}${file}`;
  console.log("bb1", scriptElement.src);
  if (isModule) {
    scriptElement.type = "module";
  }
  if (appendToHead) {
    document.head.appendChild(scriptElement);
  } else {
    document.body.appendChild(scriptElement);
  }
}
