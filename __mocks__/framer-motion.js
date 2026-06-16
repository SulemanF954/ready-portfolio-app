const React = require('react');

const motion = new Proxy({}, {
  get: (_target, prop) => {
    return React.forwardRef(({ children, ...props }, ref) => {
      const filteredProps = {};
      for (const key of Object.keys(props)) {
        if (
          !key.startsWith('while') &&
          !key.startsWith('animate') &&
          !key.startsWith('initial') &&
          !key.startsWith('exit') &&
          !key.startsWith('transition') &&
          !key.startsWith('variants') &&
          !key.startsWith('viewport') &&
          key !== 'drag' &&
          key !== 'dragConstraints' &&
          key !== 'layout'
        ) {
          filteredProps[key] = props[key];
        }
      }
      return React.createElement(prop, { ...filteredProps, ref }, children);
    });
  },
});

const AnimatePresence = ({ children }) => React.createElement(React.Fragment, null, children);

const useScroll = () => ({ scrollYProgress: { get: () => 0 } });
const useTransform = () => 0;
const useInView = () => true;
const useAnimation = () => ({ start: jest.fn(), stop: jest.fn() });

module.exports = {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useInView,
  useAnimation,
};
