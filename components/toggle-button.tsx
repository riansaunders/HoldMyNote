import { styled } from "@material-ui/core";
import { ToggleButton as MUIToggleButton } from "@material-ui/lab";

export const ToggleButton = styled(MUIToggleButton)({
  borderRadius: 90,
  border: "none",
  ["&:selected"]: {
    borderRadius: 3,
  },
});

export default ToggleButton;
