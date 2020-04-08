/**
 * For syntactically clean access to theme from props inside styled-component tagged templates.
 *
 * Before:
 *
 * styled.div`
 *   background: ${props => props.theme.palette.gray20};
 * `;
 *
 * After:
 *
 * styled.div`
 *   background: ${theme.palette.gray20};
 * `;
 */

const palette = new Proxy(
  {},
  {
    get(target, name) {
      return (props) => props.theme.palette[name];
    },
  },
);

const swatches = new Proxy(
  {},
  {
    get(target, name) {
      return (props) => props.theme.swatches[name];
    },
  },
);

export default new Proxy(
  {},
  {
    get(target, name) {
      switch (name) {
        case 'palette':
          return palette;
        case 'swatches':
          return swatches;
        default:
          return (props) => props.theme[name];
      }
    },
  },
);
