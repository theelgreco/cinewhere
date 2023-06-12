import clsx from "clsx";
import styles from "@/styles/Popup.module.css";
import { useState } from "react";

export default function Popup({
  menuName,
  selectedMenu,
  setSelectedMenu,
  setMenuParent,
  menuParent,
  setMenuElements,
  ChildComponent,
  childProps,
  setMenuOpen,
  menuOpen
}) {

  function handleOpenMenu(e, str, menuName) {
    e.stopPropagation();
    let parent;

    str === "parent" ? (parent = e.target) : (parent = e.target.parentElement);

    if (menuParent === parent) {
      setMenuParent(null);
      setSelectedMenu("");
      setMenuElements([]);
      setMenuOpen(false);
    } else {
      setSelectedMenu(menuName);
      setMenuParent(parent);
      setMenuOpen(true);
    }
  }

  return (
    <div
      className={styles.priceBtn}
      onClick={(e) => {
        handleOpenMenu(e, "parent", menuName);
      }}>
      <p
        onClick={(e) => {
          handleOpenMenu(e, "child", menuName);
        }}>
        {menuName}
      </p>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={clsx(styles.flex_col + " " + styles.price, {
          [styles.hidden]: selectedMenu !== menuName,
        })}>
        <ChildComponent {...childProps} menuOpen={menuOpen} />
      </div>
    </div>
  );
}
