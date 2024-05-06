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
    [INDUSTRY]: "#0DA888", // rgb(13,168,136) //"#CF9FFF",
    [MEDICINE]: "#3DE9D9", // rgb(61,220,233)
    [MICROSOFT]: "#CF9FFF", // rgb(207,159,255)
    [SECURITY]: "#995812", // rgb(153,88,18)
    [AI]: "#3DE7E9", // rgb(61,217,233)
    [MILITARY]: "#467B3F", // rgb(80,123,63)
    [CUSTOMIZATION]: "#F0CF5E", // rgb(240,183,94)
  };

  return sparklesColour[section] || "#CF9FFF";
};
