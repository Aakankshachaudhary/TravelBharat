import { useEffect } from "react";

const DEFAULT_DESCRIPTION =
  "Discover Indian states, destinations, culture and practical travel information with TravelBharat.";

function upsertMeta(name, content, attribute = "name") {
  if (!content) return;
  let element = document.head.querySelector(`meta[${attribute}="${name}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, name);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function PageMeta({ title, description = DEFAULT_DESCRIPTION }) {
  useEffect(() => {
    document.title = title ? `${title} | TravelBharat` : "TravelBharat | Explore India, State by State";
    upsertMeta("description", description);
    upsertMeta("og:title", document.title, "property");
    upsertMeta("og:description", description, "property");
    upsertMeta("og:type", "website", "property");
  }, [title, description]);

  return null;
}

export default PageMeta;
