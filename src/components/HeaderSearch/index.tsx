import { useEffect, useRef, useState } from "react";
import styles from "./HeaderSearch.module.css";
import { SearchIcon } from "../../assets/icons/SearchIcon";
import clsx from "clsx";
import { useForm } from "../../common/hooks/useForm";

interface HeaderSearchProps {
  placeholder?: string;
}

export const HeaderSearch = ({
  placeholder = "Поиск...",
}: HeaderSearchProps) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const initialValues = {
    headerSearch: "",
  };

  const { values, handleChange, handleBlur } = useForm(initialValues);

  const handleSeachOpen = () => {
    setIsSearchOpen(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        if (values.headerSearch === "") {
          setIsSearchOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [values.headerSearch]);

  return (
    <div
      className={clsx(styles.searchContainer, isSearchOpen && styles.open)}
      onClick={handleSeachOpen}
      ref={containerRef}
    >
      <SearchIcon className={styles.searchIcon} />
      <input
        type="text"
        name="headerSearch"
        id="headerSearch"
        value={values.headerSearch}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        className={styles.searchInput}
        ref={inputRef}
      />
    </div>
  );
};
