import { useEffect, useRef, useState } from "react";
import styles from "./Search.module.css";
import { SearchIcon } from "../../../assets/icons/SearchIcon";
import clsx from "clsx";

interface SearchProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

export const Search = ({
  placeholder = "Поиск...",
  value,
  onChange,
}: SearchProps) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSeachOpen = () => {
    setIsSearchOpen(true);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        if (value === "") setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [value]);

  return (
    <div
      className={clsx(styles.searchContainer, isSearchOpen && styles.open)}
      onClick={handleSeachOpen}
      ref={containerRef}
    >
      <SearchIcon className={styles.searchIcon} />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={styles.searchInput}
        ref={inputRef}
      />
    </div>
  );
};
