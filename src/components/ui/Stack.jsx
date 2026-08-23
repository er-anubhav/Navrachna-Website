import { useMotionValue, useTransform, animate, motion } from 'motion/react';
import { useState, useEffect } from 'react';
import './Stack.css';

function CardRotate({ children, onSendToBack, sensitivity, disableDrag = false, zIndex, isTop, isMobile }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Disable 3D perspective transforms on mobile for smooth performance
  const rotateX = useTransform(y, [-100, 100], isMobile ? [0, 0] : [5, -5]);
  const rotateY = useTransform(x, [-100, 100], isMobile ? [0, 0] : [-5, 5]);

  function handleDragEnd(_, info) {
    if (Math.abs(info.offset.x) > sensitivity || Math.abs(info.offset.y) > sensitivity) {
      onSendToBack();
    }
    animate(x, 0, { type: 'spring', stiffness: 350, damping: 28 });
    animate(y, 0, { type: 'spring', stiffness: 350, damping: 28 });
  }

  if (disableDrag) {
    return (
      <motion.div className="card-rotate-disabled" style={{ x: 0, y: 0, zIndex }}>
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className="card-rotate"
      style={{ x, y, rotateX, rotateY, zIndex }}
      drag={isTop ? true : false}
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragElastic={0.5}
      whileTap={isTop ? { cursor: 'grabbing' } : {}}
      onDragEnd={handleDragEnd}
    >
      {children}
    </motion.div>
  );
}

export default function Stack({
  sensitivity = 140,
  cards = [],
  animationConfig = { stiffness: 240, damping: 24 },
  sendToBackOnClick = true,
  autoplay = true,
  autoplayDelay = 3500,
  pauseOnHover = true,
  mobileClickOnly = false,
  mobileBreakpoint = 768
}) {
  const [isMobile, setIsMobile] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < mobileBreakpoint);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [mobileBreakpoint]);

  const shouldDisableDrag = mobileClickOnly && isMobile;
  const shouldEnableClick = sendToBackOnClick || shouldDisableDrag;

  const [stack, setStack] = useState(() => {
    if (cards.length) {
      return cards.map((content, index) => ({ id: index + 1, content }));
    }
    return [];
  });

  useEffect(() => {
    if (cards.length) {
      setStack(prev => {
        if (prev.length !== cards.length) {
          return cards.map((content, index) => ({ id: index + 1, content }));
        }
        return prev;
      });
    }
  }, [cards]);

  const sendToBack = (id) => {
    setStack(prev => {
      if (prev.length < 2) return prev;
      const newStack = [...prev];
      const index = newStack.findIndex(card => card.id === id);
      if (index === -1) return prev;
      const [card] = newStack.splice(index, 1);
      newStack.unshift(card);
      return newStack;
    });
  };

  useEffect(() => {
    if (autoplay && stack.length > 1 && !isPaused) {
      const interval = setInterval(() => {
        setStack(prev => {
          if (prev.length < 2) return prev;
          const newStack = [...prev];
          const topCard = newStack.pop();
          newStack.unshift(topCard);
          return newStack;
        });
      }, autoplayDelay);

      return () => clearInterval(interval);
    }
  }, [autoplay, autoplayDelay, stack.length, isPaused]);

  const maxVisibleCards = 4;
  const visibleCards = stack.slice(Math.max(0, stack.length - maxVisibleCards));

  return (
    <div
      className="stack-container"
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
      onTouchStart={() => pauseOnHover && setIsPaused(true)}
      onTouchEnd={() => pauseOnHover && setIsPaused(false)}
    >
      {visibleCards.map((card, visibleIndex) => {
        const fullIndex = stack.length - visibleCards.length + visibleIndex;
        const isTop = fullIndex === stack.length - 1;
        const depth = stack.length - 1 - fullIndex;
        
        const sideMultiplier = card.id % 2 === 0 ? 1 : -1;
        const tiltAngle = isTop 
          ? 0 
          : sideMultiplier * (4 + depth * 3.5 + ((card.id * 5) % 4));
        
        const offsetX = isTop 
          ? 0 
          : sideMultiplier * (depth * 9);

        return (
          <CardRotate
            key={card.id}
            onSendToBack={() => sendToBack(card.id)}
            sensitivity={sensitivity}
            disableDrag={shouldDisableDrag || !isTop}
            zIndex={fullIndex + 1}
            isTop={isTop}
            isMobile={isMobile}
          >
            <motion.div
              className="card"
              onClick={() => shouldEnableClick && sendToBack(card.id)}
              animate={{
                rotateZ: tiltAngle,
                scale: 1 - depth * 0.045,
                x: offsetX,
                y: depth * 7,
                opacity: 1 - depth * 0.07
              }}
              initial={false}
              transition={{
                type: 'spring',
                stiffness: animationConfig.stiffness,
                damping: animationConfig.damping
              }}
            >
              {card.content}
            </motion.div>
          </CardRotate>
        );
      })}
    </div>
  );
}
