import { useLayoutEffect, useState } from "react";
// import React from 'react'

const useWindowPosition = (id) => {

    const [animation, setAnimation] = useState(false)
    
    useLayoutEffect(() => {
        function updatePosition() {
            const offetSetHeight = window.document.getElementById(id).offsetHeight;
            
            // console.log('window Page Offset: ' , window.pageYOffset, offetSetHeight)
            
            if (window.pageYOffset > offetSetHeight * 0.7 ) {
                setAnimation(true);
            }
        }
        window.addEventListener('scroll', updatePosition);
        updatePosition();

    
      return () => {
        window.removeEventListener('scroll'. updatePosition);
      };
    }, [id]);
    
  return animation
}

export default useWindowPosition