const WEBSITE_SETTINGS = {
  WEBSITE_NAME: "CoatesCarpentry",
  WEBSITE_ID: "CoatesCarpentry",
  UNSET_WEBSITE_ID: "Unset",
  BACKEND_SERVICES_BASE_PATH:
    "https://tomantillwebdevservices.azurewebsites.net/",
  BACKEND_SERVICES_JS_PATH: "assets/js/websites/",
};

function postLoadScript(file, isModule, appendToHead, callback) {
  const scriptElement = document.createElement("script");
  scriptElement.src = `${WEBSITE_SETTINGS.BACKEND_SERVICES_BASE_PATH}${
    WEBSITE_SETTINGS.BACKEND_SERVICES_JS_PATH
  }${isModule ? `services/modules/` : ``}${file}`;
  if (isModule) {
    scriptElement.type = "module";
  }

  if (callback != null) {
    scriptElement.onload = () => {
      if (typeof callback === "function") {
        callback();
      }
    };
  }

  if (appendToHead) {
    document.head.appendChild(scriptElement);
  } else {
    document.body.appendChild(scriptElement);
  }
}
