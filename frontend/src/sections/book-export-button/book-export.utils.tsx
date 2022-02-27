import { Tooltip } from "antd";
import { cloneElement, ReactElement, ReactNode } from "react";

export const buttonsWithTooltip = ([leftButton, rightButton]: ReactNode[]) => [
    <Tooltip title="Default: Everything to CSV" key="leftButton">
      {leftButton}
    </Tooltip>,
    cloneElement(rightButton as ReactElement),
  ]