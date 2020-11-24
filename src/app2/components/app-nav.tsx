import * as React from "react";
import {
  CommandBar,
  ICommandBarItemProps
} from "office-ui-fabric-react/lib/CommandBar";
import { IButtonProps } from "office-ui-fabric-react/lib/Button";
import { withRouter, useHistory } from "react-router-dom";

const overflowProps: IButtonProps = { ariaLabel: "More commands" };

const TopNav: React.FC = () => {
  let history = useHistory();
  const go = (path: string) => {
    if (path !== history.location.pathname) history.push(path);
  };

  const _items: ICommandBarItemProps[] = [
    {
      key: "home",
      text: "Home",
      iconProps: { iconName: "Home" },
      onClick: () => go("/")
    },
    {
      key: "newItem",
      text: "Examples",
      cacheKey: "myCacheKey", // changing this key will invalidate this item's cache
      iconProps: { iconName: "Add" },
      subMenuProps: {
        items: [
          {
            key: "emailMessage",
            text: "Counter",
            iconProps: { iconName: "Mail" },
            onClick: () => go("/counter")
          },
          {
            key: "calendarEvent",
            text: "List",
            iconProps: { iconName: "Calendar" },
            onClick: () => go("/list")
          }
        ]
      }
    },
    {
      key: "upload",
      text: "Upload",
      iconProps: { iconName: "Upload" },
      href: "https://developer.microsoft.com/en-us/fluentui"
    },
    {
      key: "share",
      text: "Share",
      iconProps: { iconName: "Share" },
      onClick: () => console.log("Share")
    },
    {
      key: "download",
      text: "Download",
      iconProps: { iconName: "Download" },
      onClick: () => console.log("Download")
    }
  ];

  return (
    <div>
      <CommandBar
        items={_items}
        overflowItems={_overflowItems}
        overflowButtonProps={overflowProps}
        farItems={_farItems}
        ariaLabel="Use left and right arrow keys to navigate between commands"
      />
    </div>
  );
};

const _overflowItems: ICommandBarItemProps[] = [
  {
    key: "move",
    text: "Move to...",
    onClick: () => console.log("Move to"),
    iconProps: { iconName: "MoveToFolder" }
  },
  {
    key: "copy",
    text: "Copy to...",
    onClick: () => console.log("Copy to"),
    iconProps: { iconName: "Copy" }
  },
  {
    key: "rename",
    text: "Rename...",
    onClick: () => console.log("Rename"),
    iconProps: { iconName: "Edit" }
  }
];

const _farItems: ICommandBarItemProps[] = [
  {
    key: "tile",
    text: "Grid view",
    // This needs an ariaLabel since it's icon-only
    ariaLabel: "Grid view",
    iconOnly: true,
    iconProps: { iconName: "Tiles" },
    onClick: () => console.log("Tiles")
  },
  {
    key: "info",
    text: "Info",
    // This needs an ariaLabel since it's icon-only
    ariaLabel: "Info",
    iconOnly: true,
    iconProps: { iconName: "Info" },
    onClick: () => console.log("Info")
  }
];

export default withRouter(TopNav);
