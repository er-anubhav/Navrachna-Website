import { motion, useMotionValue, useTransform, animate } from 'motion/react';
import { useState, useEffect } from 'react';
import './Stack.css';

function CardRotate({ children, onSendToBack, sensitivity, disableDrag = false, zIndex, isTop }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [6, -6]);
  const rotateY = useTransform(x, [-100, 100], [-6, 6]);

  function handleDragEnd(_, info) {
    if (Math.abs(info.offset.x) > sensitivity || Math.abs(info.offset.y) > sensitivity) {
      onSendToBack();
    }
    animate(x, 0, { type: 'spring', stiffness: 300, damping: 25 });
    animate(y, 0, { type: 'spring', stiffness: 300, damping: 25 });
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
      dragElastic={0.6}
      whileTap={isTop ? { cursor: 'grabbing' } : {}}
      onDragEnd={handleDragEnd}
    >
      {children}
    </motion.div>
  );
}

export default function Stack({
  randomRotation = false,
  sensitivity = 150,
  cards = [],
  animationConfig = { stiffness: 220, damping: 22 },
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

  return (
    <div
      className="stack-container"
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
      onTouchStart={() => pauseOnHover && setIsPaused(true)}
      onTouchEnd={() => pauseOnHover && setIsPaused(false)}
    >
      {stack.map((card, index) => {
        const isTop = index === stack.length - 1;
        const depth = stack.length - 1 - index;
        
        // Distinct, eye-catching tilt angle and side offset for back cards
        const sideMultiplier = card.id % 2 === 0 ? 1 : -1;
        const tiltAngle = isTop 
          ? 0 
          : sideMultiplier * (4 + depth * 4 + ((card.id * 7) % 5));
        
        const offsetX = isTop 
          ? 0 
          : sideMultiplier * (depth * 10);

        return (
          <CardRotate
            key={card.id}
            onSendToBack={() => sendToBack(card.id)}
            sensitivity={sensitivity}
            disableDrag={shouldDisableDrag || !isTop}
            zIndex={index + 1}
            isTop={isTop}
          >
            <motion.div
              className="card"
              onClick={() => shouldEnableClick && sendToBack(card.id)}
              animate={{
                rotateZ: tiltAngle,
                scale: 1 - depth * 0.05,
                x: offsetX,
                y: depth * 8,
                opacity: depth > 3 ? 0 : 1 - depth * 0.08
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
