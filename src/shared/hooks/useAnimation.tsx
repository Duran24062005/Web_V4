import { animate, splitText, stagger } from "animejs";
import { useEffect } from "react";

export const useAnimationUpDown = (title: string) => {
   useEffect(()=>{
       const splitH1 = splitText(title, {
           lines: true
       });
   
       splitH1.addEffect(({lines}) =>
         animate(lines, {
           y: ['50%', '0%'],
           duration: 1020,
           ease: "out(10)",
           delay: stagger(50),
           loop: true,
           alternate: true,
         })
       );
     }, [title]);
}
