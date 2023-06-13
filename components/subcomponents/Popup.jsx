import clsx from "clsx";
import styles from "@/styles/Popup.module.css";
import { useState, useRef } from "react";

export default function Popup({
  menuName,
  selectedMenu,
  setSelectedMenu,
  setMenuParent,
  menuParent,
  setMenuElements,
  ChildComponent,
  childProps,
  childRef,
}) {
  function handleOpenMenu(e, str, menuName) {
    e.stopPropagation();
    let parent;

    str === "parent" ? (parent = e.target) : (parent = e.target.parentElement);

    if (menuParent === parent) {
      setMenuParent(null);
      setSelectedMenu("");
      setMenuElements([]);
    } else {
      setSelectedMenu(menuName);
      setMenuParent(parent);
    }
  }

  return (
    <div
      className={clsx(styles.priceBtn)}
      onClick={(e) => {
        handleOpenMenu(e, "parent", menuName);
      }}>
      <p
        className={clsx(styles.label, {
          [styles.selected]: selectedMenu === menuName,
        })}
        onClick={(e) => {
          handleOpenMenu(e, "child", menuName);
        }}>
        {menuName}
      </p>
      <div
        ref={childRef}
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={clsx(
          styles.flex_col +
            " " +
            styles.price +
            " " +
            styles[menuName.split(" ").join("")],
          {
            [styles.hidden]: selectedMenu !== menuName,
          }
        )}>
        <ChildComponent {...childProps} />
      </div>
    </div>
  );
}
