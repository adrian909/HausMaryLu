import { Link } from 'react-router-dom'
import Icon from './Icon'
import styles from './Button.module.css'

/**
 * One button, three shapes. Renders a <Link> for internal routes, an <a> for
 * external ones (`href`) and a <button> otherwise.
 */
export default function Button({
  variant = 'primary',
  size,
  to,
  href,
  icon,
  children,
  className = '',
  ...rest
}) {
  const classes = [styles.button, styles[variant], size === 'large' && styles.large, className]
    .filter(Boolean)
    .join(' ')

  const content = (
    <>
      {children}
      {icon && <Icon name={icon} size={17} />}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {content}
      </Link>
    )
  }

  if (href) {
    const isExternal = href.startsWith('http')
    return (
      <a
        href={href}
        className={classes}
        {...(isExternal && { target: '_blank', rel: 'noopener noreferrer' })}
        {...rest}
      >
        {content}
      </a>
    )
  }

  return (
    <button type="button" className={classes} {...rest}>
      {content}
    </button>
  )
}
