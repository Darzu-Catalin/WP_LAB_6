export const DEFAULT_STYLES = {
  backgroundColor: '#ffffff',
  color: '#000000',
  borderColor: '#cccccc',
  borderWidth: '1',
  borderStyle: 'solid',
  borderRadius: '4',
  fontFamily: 'inherit',
  fontSize: '14',
  fontWeight: '400',
  textAlign: 'left',
  paddingTop: '8',
  paddingRight: '16',
  paddingBottom: '8',
  paddingLeft: '16',
  marginTop: '0',
  marginRight: '0',
  marginBottom: '0',
  marginLeft: '0',
  width: 'auto',
  height: 'auto',
  widthUnit: 'px',
  heightUnit: 'px',
  boxShadow: 'none',
  opacity: '1',
};

export const COMPONENT_TYPES = [
  { type: 'button', label: 'Button', icon: '🔘' },
  { type: 'input', label: 'Text Input', icon: '📝' },
  { type: 'textarea', label: 'Text Area', icon: '📄' },
  { type: 'card', label: 'Card', icon: '🃏' },
  { type: 'heading', label: 'Heading', icon: '🔤' },
  { type: 'paragraph', label: 'Paragraph', icon: '📰' },
  { type: 'image', label: 'Image', icon: '🖼️' },
  { type: 'divider', label: 'Divider', icon: '➖' },
];

export function stylesToCSS(styles) {
  const border = styles.borderWidth && styles.borderStyle !== 'none'
    ? `${styles.borderWidth}px ${styles.borderStyle} ${styles.borderColor}`
    : styles.borderStyle === 'none' ? 'none' : undefined;

  const widthVal = styles.width === 'auto' ? 'auto' : `${styles.width}${styles.widthUnit || 'px'}`;
  const heightVal = styles.height === 'auto' ? 'auto' : `${styles.height}${styles.heightUnit || 'px'}`;

  return {
    backgroundColor: styles.backgroundColor,
    color: styles.color,
    border,
    borderRadius: `${styles.borderRadius}px`,
    fontFamily: styles.fontFamily,
    fontSize: `${styles.fontSize}px`,
    fontWeight: styles.fontWeight,
    textAlign: styles.textAlign,
    padding: `${styles.paddingTop}px ${styles.paddingRight}px ${styles.paddingBottom}px ${styles.paddingLeft}px`,
    margin: `${styles.marginTop}px ${styles.marginRight}px ${styles.marginBottom}px ${styles.marginLeft}px`,
    width: widthVal,
    height: heightVal,
    boxShadow: styles.boxShadow === 'none' ? 'none' : styles.boxShadow,
    opacity: styles.opacity,
  };
}

export function generateId() {
  return `comp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
