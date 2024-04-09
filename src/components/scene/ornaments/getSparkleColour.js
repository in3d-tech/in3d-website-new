import {
  AI,
  CUSTOMIZATION,
  INDUSTRY,
  MEDICINE,
  MICROSOFT,
  MILITARY,
  SECURITY,
} from "../../../components/common/modelData";

export const getSparkleColour = (section) => {
  const sparklesColour = {
    [INDUSTRY]: "#0DA888", //"#CF9FFF",
    [MEDICINE]: "#3DE9D9",
    [MICROSOFT]: "#CF9FFF",
    [SECURITY]: "#995812",
    [AI]: "#3DE7E9",
    [MILITARY]: "#467B3F",
    [CUSTOMIZATION]: "#F0CF5E",
  };

  return sparklesColour[section] || "#CF9FFF";
};
