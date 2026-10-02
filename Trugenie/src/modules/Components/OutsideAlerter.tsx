import React, { useRef, useEffect } from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideAlerter(ref: React.RefObject<HTMLDivElement>, setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>) {
    useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

/**
 * Component that alerts if you click outside of it
 */
export default function OutsideAlerter(props: { setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>, children: React.ReactNode }) {
    const wrapperRef = useRef<HTMLDivElement>(null);
  useOutsideAlerter(wrapperRef, props.setShowDropdown);

  return <div ref={wrapperRef}>{props.children}</div>;
}
